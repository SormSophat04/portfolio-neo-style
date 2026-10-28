import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN;
const GMAIL_USER = process.env.GMAIL_USER || 'sophatsorm2023@gmail.com';
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

const callTelegram = async (method: string, body: Record<string, unknown>) => {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
};

const generateApproveEmail = ({ name, subject }: { name: string; subject?: string }) => `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F5F0E8; padding: 24px; color: #111;">
  <div style="background-color: #FFF; border: 3px solid #111; max-width: 600px; margin: 0 auto; padding: 32px; box-shadow: 6px 6px 0px #111;">
    <div style="display: inline-block; background-color: #B7F34A; border: 2px solid #111; padding: 4px 10px; font-weight: bold; font-family: monospace; font-size: 11px; margin-bottom: 20px;">
      OPPORTUNITY ACCEPTED // SORM SOPHAT
    </div>
    <h2 style="text-transform: uppercase; margin-top: 0;">Let's Connect & Build Together</h2>
    <p>Dear <strong>${name}</strong>,</p>
    <p>Thank you for reaching out through my portfolio regarding <strong>${subject || 'Software Engineering Inquiry'}</strong>.</p>
    <p>I have reviewed your message and I would be delighted to connect with you regarding this opportunity.</p>
    <div style="background-color: #FFD84D; border: 2px solid #111; padding: 14px; margin: 18px 0; font-family: monospace; font-weight: bold;">
      ⚡ STATUS: Ready for Interview / Introductory Call
    </div>
    <p>Please feel free to suggest dates and times for a call, or connect with me directly on Telegram:</p>
    <p>
      👉 <a href="https://t.me/sormsophat04" style="color: #4D7CFE; font-weight: bold;">Telegram: @sormsophat04</a><br/>
      👉 <a href="https://www.linkedin.com/in/sorm-sophat-6b70a03ba" style="color: #4D7CFE; font-weight: bold;">LinkedIn Profile</a>
    </p>
    <p style="margin-top: 24px; font-size: 13px; color: #555;">
      Warm regards,<br/><strong>Sorm Sophat</strong><br/>Software Engineer<br/>
      <a href="mailto:${GMAIL_USER}" style="color: #111;">${GMAIL_USER}</a>
    </p>
  </div>
</body>
</html>
`;

const generateRejectEmail = ({ name, subject }: { name: string; subject?: string }) => `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F5F0E8; padding: 24px; color: #111;">
  <div style="background-color: #FFF; border: 3px solid #111; max-width: 600px; margin: 0 auto; padding: 32px; box-shadow: 6px 6px 0px #111;">
    <div style="display: inline-block; background-color: #FFD84D; border: 2px solid #111; padding: 4px 10px; font-weight: bold; font-family: monospace; font-size: 11px; margin-bottom: 20px;">
      PORTFOLIO INQUIRY // SORM SOPHAT
    </div>
    <h2 style="text-transform: uppercase; margin-top: 0;">Thank You for Reaching Out</h2>
    <p>Dear <strong>${name}</strong>,</p>
    <p>Thank you very much for reviewing my portfolio and reaching out regarding <strong>${subject || 'software engineering opportunities'}</strong>.</p>
    <p>After careful consideration, I am unable to proceed with this opportunity at this time.</p>
    <p>I sincerely appreciate your time and wish you and your organization all the best with your recruitment goals.</p>
    <p style="margin-top: 24px; font-size: 13px; color: #555;">
      Best regards,<br/><strong>Sorm Sophat</strong><br/>Software Engineer<br/>
      <a href="mailto:${GMAIL_USER}" style="color: #111;">${GMAIL_USER}</a>
    </p>
  </div>
</body>
</html>
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(200).send('Telegram webhook endpoint ready.');
  }

  const { callback_query } = req.body || {};

  if (!callback_query) {
    return res.status(200).json({ ok: true, message: 'No callback query' });
  }

  const { id, data, message } = callback_query;
  const [action, transmissionId] = (data || '').split(':');

  if (!action || !transmissionId) {
    await callTelegram('answerCallbackQuery', { callback_query_id: id, text: 'Invalid action.' });
    return res.status(200).json({ ok: true });
  }

  await callTelegram('answerCallbackQuery', {
    callback_query_id: id,
    text: `⏳ Processing ${action.toUpperCase()} action...`,
  });

  try {
    let transmissionData = null;
    const docSnap = await getDoc(doc(db, 'transmissions', transmissionId));
    if (docSnap.exists()) {
      transmissionData = docSnap.data();
    }

    if (!transmissionData) {
      await callTelegram('answerCallbackQuery', {
        callback_query_id: id,
        text: '❌ Transmission record not found in database.',
        show_alert: true,
      });
      return res.status(200).json({ ok: false });
    }

    const { name, email, subject } = transmissionData as { name: string; email: string; subject?: string };
    const isApprove = action.toLowerCase() === 'approve';

    // Send email via Gmail SMTP
    await transporter.sendMail({
      from: `"Sorm Sophat" <${GMAIL_USER}>`,
      to: email,
      subject: isApprove
        ? `Regarding your inquiry: Opportunity Accepted – Sorm Sophat`
        : `Regarding your inquiry: Update – Sorm Sophat`,
      html: isApprove
        ? generateApproveEmail({ name, subject })
        : generateRejectEmail({ name, subject }),
    });

    // Update Firestore record
    await updateDoc(doc(db, 'transmissions', transmissionId), {
      status: isApprove ? 'approved' : 'rejected',
      respondedAt: new Date().toISOString(),
    });

    // Update Telegram message to show confirmation and remove buttons
    const currentText = message?.text || '';
    const statusBanner = isApprove
      ? `\n━━━━━━━━━━━━━━━━━━━━\n✅ <b>[STATUS: APPROVED // EMAIL SENT]</b>\n📧 Acceptance email delivered to: <code>${email}</code>\n🕒 Dispatched at: ${new Date().toLocaleTimeString()}`
      : `\n━━━━━━━━━━━━━━━━━━━━\n❌ <b>[STATUS: REJECTED // DECLINE EMAIL SENT]</b>\n📧 Decline email delivered to: <code>${email}</code>\n🕒 Dispatched at: ${new Date().toLocaleTimeString()}`;

    await callTelegram('editMessageText', {
      chat_id: message.chat.id,
      message_id: message.message_id,
      text: currentText + statusBanner,
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: [] },
    });

    return res.status(200).json({ ok: true, status: 'dispatched' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Webhook error:', errorMsg);

    await callTelegram('answerCallbackQuery', {
      callback_query_id: id,
      text: `❌ Error: ${errorMsg}`,
      show_alert: true,
    });

    return res.status(500).json({ error: errorMsg });
  }
}

