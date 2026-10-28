export interface ContactTransmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const sendTelegramTransmission = async (
  transmission: ContactTransmission
): Promise<{ success: boolean; error?: string }> => {
  const botToken =
    import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
    localStorage.getItem('neo_telegram_bot_token');
  const chatId =
    import.meta.env.VITE_TELEGRAM_CHAT_ID ||
    localStorage.getItem('neo_telegram_chat_id');

  if (!botToken || !chatId) {
    console.error('Telegram bot token or Chat ID is not configured.');
    return {
      success: false,
      error: 'Telegram Bot Token or Chat ID is missing. Check your environment configuration.',
    };
  }

  const { name, email, subject, message } = transmission;
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const formattedMessage = [
    `🚨 <b>[NEW TRANSMISSION LOGGED]</b> 🚨`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Name:</b> ${escapeHtml(name)}`,
    `📧 <b>Email:</b> <code>${escapeHtml(email)}</code>`,
    `📌 <b>Subject:</b> ${escapeHtml(subject?.trim() || 'General Inquiry / Collaboration')}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `💬 <b>Message Content:</b>`,
    `<i>${escapeHtml(message)}</i>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🕒 <b>Timestamp:</b> ${escapeHtml(timestamp)}`,
    `⚡ <i>Delivered via Sophat Portfolio Neo-Terminal</i>`,
  ].join('\n');

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      const errorMsg = result.description || `HTTP ${response.status}: Failed to deliver`;
      console.error('Telegram API error:', errorMsg);
      return { success: false, error: errorMsg };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Telegram network error:', errorMsg);
    return { success: false, error: errorMsg };
  }
};

