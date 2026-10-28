/**
 * Telegram Response Bot & Email Dispatcher
 * Listens for "Approve" and "Reject" inline button taps in Telegram,
 * retrieves the transmission details from Firestore,
 * and automatically sends a customized email to the HR via Gmail SMTP.
 */

import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

// 1. Load Environment Variables from .env
const envPath = path.resolve(process.cwd(), '.env');
const env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, ...v] = trimmed.split('=');
      if (k && v.length) {
        env[k.trim()] = v.join('=').trim();
      }
    }
  });
}

const BOT_TOKEN = env.VITE_TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN;
const GMAIL_USER = env.GMAIL_USER || process.env.GMAIL_USER || 'sophatsorm2023@gmail.com';
const GMAIL_PASS = (env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

if (!BOT_TOKEN) {
  console.error('❌ ERROR: VITE_TELEGRAM_BOT_TOKEN is missing in .env');
  process.exit(1);
}

// 2. Initialize Firebase
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Setup Nodemailer Transporter
const createTransporter = () => {
  if (!GMAIL_PASS || GMAIL_PASS === 'your_gmail_app_password_here') {
    console.warn(
      '⚠️ WARNING: GMAIL_APP_PASSWORD is not configured in .env. Email dispatch will fail until provided.'
    );
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });
};

const transporter = createTransporter();

// 4. Email HTML Templates
const generateApproveEmail = ({ name, subject }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F5F0E8; margin: 0; padding: 24px; color: #111111; }
    .card { background-color: #FFFFFF; border: 3px solid #111111; max-width: 620px; margin: 0 auto; box-shadow: 6px 6px 0px #111111; padding: 32px; }
    .badge { display: inline-block; background-color: #B7F34A; border: 2px solid #111111; padding: 4px 10px; font-weight: 900; font-size: 11px; text-transform: uppercase; font-family: monospace; box-shadow: 2px 2px 0px #111111; margin-bottom: 20px; }
    h2 { font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 0 0 16px 0; letter-spacing: -0.5px; }
    p { font-size: 15px; line-height: 1.6; color: #222222; margin: 0 0 16px 0; }
    .highlight-box { background-color: #FFD84D; border: 2px solid #111111; padding: 16px; margin: 20px 0; box-shadow: 3px 3px 0px #111111; font-family: monospace; font-size: 13px; font-weight: bold; }
    .links-bar { border-top: 2px solid #111111; padding-top: 16px; margin-top: 24px; font-size: 13px; font-family: monospace; font-weight: bold; }
    .links-bar a { color: #4D7CFE; text-decoration: none; margin-right: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">OPPORTUNITY ACCEPTED // SORM SOPHAT</div>
    <h2>Let's Connect & Build Together</h2>
    <p>Dear <strong>${name}</strong>,</p>
    <p>Thank you for reaching out through my portfolio regarding <strong>${subject || 'Software Engineering Inquiry'}</strong>.</p>
    <p>I have reviewed your message and I am very interested in learning more about the role, team challenges, and how my technical background in <strong>Java 21, Spring Boot microservices, Kafka event streaming, and distributed architecture</strong> can add immediate value to your organization.</p>
    
    <div class="highlight-box">
      ⚡ STATUS: Ready for Interview / Introductory Call<br>
      📍 Availability: Flexible for remote or on-site scheduling
    </div>

    <p>Please feel free to suggest times for an introductory discussion or technical interview. You can reply directly to this email or message me instantly on Telegram.</p>

    <div class="links-bar">
      <span>CHANNELS:</span>
      <a href="https://t.me/sormsophat04">▸ Telegram (@sormsophat04)</a>
      <a href="https://www.linkedin.com/in/sorm-sophat-6b70a03ba">▸ LinkedIn</a>
      <a href="https://github.com/SormSophat04">▸ GitHub</a>
    </div>

    <p style="margin-top: 24px; font-size: 13px; color: #555;">
      Warm regards,<br>
      <strong>Sorm Sophat</strong><br>
      Software Engineer<br>
      <a href="mailto:${GMAIL_USER}" style="color: #111;">${GMAIL_USER}</a>
    </p>
  </div>
</body>
</html>
  `;
};

const generateRejectEmail = ({ name, subject }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F5F0E8; margin: 0; padding: 24px; color: #111111; }
    .card { background-color: #FFFFFF; border: 3px solid #111111; max-width: 620px; margin: 0 auto; box-shadow: 6px 6px 0px #111111; padding: 32px; }
    .badge { display: inline-block; background-color: #FFD84D; border: 2px solid #111111; padding: 4px 10px; font-weight: 900; font-size: 11px; text-transform: uppercase; font-family: monospace; box-shadow: 2px 2px 0px #111111; margin-bottom: 20px; }
    h2 { font-size: 22px; font-weight: 900; text-transform: uppercase; margin: 0 0 16px 0; letter-spacing: -0.5px; }
    p { font-size: 15px; line-height: 1.6; color: #222222; margin: 0 0 16px 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">PORTFOLIO INQUIRY // SORM SOPHAT</div>
    <h2>Thank You for Reaching Out</h2>
    <p>Dear <strong>${name}</strong>,</p>
    <p>Thank you very much for taking the time to review my portfolio and for considering me for <strong>${subject || 'your software engineering opportunity'}</strong>.</p>
    <p>After careful consideration of my current commitments and technical focus, I am unable to proceed with this opportunity at this time.</p>
    <p>I sincerely appreciate your interest and wish you and your team continued success with your hiring goals.</p>
    <p style="margin-top: 24px; font-size: 13px; color: #555;">
      Best regards,<br>
      <strong>Sorm Sophat</strong><br>
      Software Engineer<br>
      <a href="mailto:${GMAIL_USER}" style="color: #111;">${GMAIL_USER}</a>
    </p>
  </div>
</body>
</html>
  `;
};

// 5. Telegram API Helpers
const callTelegram = async (method, body) => {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
};

// 6. Handle Telegram Callback Query (Button Press)
const handleCallbackQuery = async (callbackQuery) => {
  const { id, data, message } = callbackQuery;
  const [action, transmissionId] = (data || '').split(':');

  if (!action || !transmissionId) {
    return callTelegram('answerCallbackQuery', {
      callback_query_id: id,
      text: '⚠️ Unrecognized button action.',
    });
  }

  // Acknowledge tap immediately so user sees responsiveness
  await callTelegram('answerCallbackQuery', {
    callback_query_id: id,
    text: `⏳ Processing ${action.toUpperCase()} action...`,
  });

  console.log(`\n⚡ Received Action: [${action.toUpperCase()}] for Transmission ID: ${transmissionId}`);

  // Fetch transmission from Firestore
  let transmissionData = null;
  try {
    const docSnap = await getDoc(doc(db, 'transmissions', transmissionId));
    if (docSnap.exists()) {
      transmissionData = docSnap.data();
    }
  } catch (err) {
    console.error('Firestore fetch error:', err.message);
  }

  if (!transmissionData) {
    // If not found in Firestore (or demo message), check if it's a test
    if (transmissionId === 'demo123') {
      transmissionData = {
        name: 'Sarah Connor',
        email: GMAIL_USER, // sends test email back to self for verification
        subject: 'Senior Backend Engineer Opportunity (Demo)',
      };
    } else {
      return callTelegram('answerCallbackQuery', {
        callback_query_id: id,
        text: '❌ Transmission record not found in database.',
        show_alert: true,
      });
    }
  }

  const { name, email, subject } = transmissionData;

  // Compose and send email
  const isApprove = action.toLowerCase() === 'approve';
  const emailSubject = isApprove
    ? `Regarding your inquiry: Opportunity Accepted – Sorm Sophat`
    : `Regarding your inquiry: Update – Sorm Sophat`;

  const emailHtml = isApprove
    ? generateApproveEmail({ name, subject })
    : generateRejectEmail({ name, subject });

  try {
    console.log(`📧 Sending ${isApprove ? 'APPROVAL' : 'REJECTION'} email to ${email}...`);

    await transporter.sendMail({
      from: `"Sorm Sophat" <${GMAIL_USER}>`,
      to: email,
      subject: emailSubject,
      html: emailHtml,
    });

    console.log(`✅ Email successfully delivered to ${email}!`);

    // Update Firestore status
    if (transmissionId !== 'demo123') {
      try {
        await updateDoc(doc(db, 'transmissions', transmissionId), {
          status: isApprove ? 'approved' : 'rejected',
          respondedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Could not update Firestore document status:', err.message);
      }
    }

    // Update the Telegram message text to lock in status and remove buttons
    const currentText = message.text || '';
    const statusBanner = isApprove
      ? `\n━━━━━━━━━━━━━━━━━━━━\n✅ <b>[STATUS: APPROVED // EMAIL SENT]</b>\n📧 Acceptance email delivered to: <code>${email}</code>\n🕒 Dispatched at: ${new Date().toLocaleTimeString()}`
      : `\n━━━━━━━━━━━━━━━━━━━━\n❌ <b>[STATUS: REJECTED // DECLINE EMAIL SENT]</b>\n📧 Decline email delivered to: <code>${email}</code>\n🕒 Dispatched at: ${new Date().toLocaleTimeString()}`;

    await callTelegram('editMessageText', {
      chat_id: message.chat.id,
      message_id: message.message_id,
      text: currentText + statusBanner,
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: [] }, // Clears buttons so it cannot be double-tapped
    });

    await callTelegram('answerCallbackQuery', {
      callback_query_id: id,
      text: `✅ ${isApprove ? 'Approved' : 'Rejected'}! Email sent to ${email}`,
    });
  } catch (emailErr) {
    console.error('❌ Failed to send email via Gmail SMTP:', emailErr.message);

    await callTelegram('answerCallbackQuery', {
      callback_query_id: id,
      text: `❌ Email error: ${emailErr.message}. Make sure GMAIL_APP_PASSWORD is set in .env.`,
      show_alert: true,
    });
  }
};

// 7. Polling Loop
let offset = 0;
const startPolling = async () => {
  console.log('🤖 Telegram Response Bot is active and listening for Approve / Reject button taps...');
  console.log(`📧 Connected Gmail: ${GMAIL_USER}`);

  while (true) {
    try {
      const res = await callTelegram('getUpdates', {
        offset,
        timeout: 30,
        allowed_updates: ['callback_query', 'message'],
      });

      if (res.ok && Array.isArray(res.result)) {
        for (const update of res.result) {
          offset = update.update_id + 1;
          if (update.callback_query) {
            await handleCallbackQuery(update.callback_query);
          }
        }
      }
    } catch (pollErr) {
      // Network hiccup, wait 3 seconds and retry
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
};

startPolling();

