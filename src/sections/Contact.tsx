import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { BrutalCard } from '../components/BrutalCard';
import { BrutalButton } from '../components/BrutalButton';
import {
  Mail,
  Send,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TelegramIcon } from '../components/Icons';
import { sendTelegramTransmission } from '../services/telegram';
import { saveTransmissionDoc } from '../services/firebase';

export const Contact: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmittedName, setLastSubmittedName] = useState('');
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    try {
      // 1. Save transmission to Firestore to get the unique transmission ID
      const transmissionId = await saveTransmissionDoc(payload);

      // 2. Dispatch transmission with interactive Approve/Reject buttons to Telegram
      const telegramResult = await sendTelegramTransmission(payload, transmissionId);

      if (!telegramResult.success) {
        setSubmitError(
          telegramResult.error ||
            'Unable to dispatch message to Telegram. Please check your network or reach out via email directly.'
        );
        setIsSubmitting(false);
        return;
      }

      setLastSubmittedName(payload.name);
      setLastSubmittedEmail(payload.email);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSubmitError(`Transmission error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 border-t-[3px] border-[#111111] bg-[#F5F0E8]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="07"
          title="GET IN TOUCH"
          subtitle="Direct channels for professional inquiries, software engineering roles, and backend collaboration."
          accentColor="yellow"
        />

        {/* Big Bold Neo-Brutalist CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <BrutalCard variant="yellow" shadow="xl" borderThick className="p-8 md:p-12 text-center overflow-hidden">
            <div className="inline-flex items-center gap-2 border-2 border-[#111111] bg-white px-3 py-1 font-mono text-xs font-black uppercase mb-4 shadow-[2px_2px_0px_#111111]">
              <Sparkles className="w-4 h-4 text-[#111111]" />
              <span>OPPORTUNITY PIPELINE OPEN</span>
            </div>

            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#111111] leading-none mb-4">
              LET'S BUILD SOMETHING.
            </h3>

            <p className="font-mono text-sm sm:text-base md:text-lg text-[#111111]/85 max-w-2xl mx-auto font-bold leading-relaxed">
              Available for Software Engineering roles, Backend/API development, and distributed systems architecture projects.
            </p>
          </BrutalCard>
        </motion.div>

        {/* Contact Methods & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-xs font-black uppercase tracking-wider text-[#111111]/70 mb-2">
              [ DIRECT CONTACT CHANNELS ]
            </div>

            {/* Email Card (Placeholder clearly stated) */}
            <BrutalCard variant="white" shadow="md" className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 border-2 border-[#111111] bg-[#FFD84D] shrink-0 shadow-[2px_2px_0px_#111111]">
                    <Mail className="w-5 h-5 text-[#111111]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-gray-500">
                      EMAIL ADDRESS
                    </span>
                    <p className="font-mono text-sm md:text-base font-bold text-[#111111] break-all">
                      sophatsorm2023@gmail.com
                    </p>
                    {/* <span className="font-mono text-[10px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 border border-amber-300 inline-block mt-1">
                      [Placeholder - Replace with your email]
                    </span> */}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('sophatsorm2023@gmail.com', 'email')}
                  className="p-2 border-2 border-[#111111] bg-white hover:bg-[#FFD84D] transition-colors shadow-[2px_2px_0px_#111111] cursor-pointer"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedItem === 'email' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#111111]" />
                  )}
                </button>
              </div>
            </BrutalCard>

            {/* Telegram Direct Channel Card */}
            <BrutalCard variant="white" shadow="md" className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 border-2 border-[#111111] bg-[#229ED9] text-white shrink-0 shadow-[2px_2px_0px_#111111]">
                    <TelegramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-gray-500">
                      TELEGRAM DIRECT
                    </span>
                    <p className="font-mono text-sm md:text-base font-bold text-[#111111]">
                      @sormsophat04
                    </p>
                    <a
                      href="https://t.me/sormsophat04"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs font-bold text-[#229ED9] hover:underline inline-block mt-1"
                    >
                      Open Chat in Telegram →
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('https://t.me/sormsophat04', 'telegram')}
                  className="p-2 border-2 border-[#111111] bg-white hover:bg-[#FFD84D] transition-colors shadow-[2px_2px_0px_#111111] cursor-pointer"
                  title="Copy Telegram link"
                  aria-label="Copy Telegram link"
                >
                  {copiedItem === 'telegram' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#111111]" />
                  )}
                </button>
              </div>
            </BrutalCard>

            {/* GitHub Card */}
            <BrutalCard variant="white" shadow="md" className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 border-2 border-[#111111] bg-[#4D7CFE] text-white shrink-0 shadow-[2px_2px_0px_#111111]">
                    <GitHubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-gray-500">
                      GITHUB PROFILE
                    </span>
                    <p className="font-mono text-sm md:text-base font-bold text-[#111111]">
                      github.com/SormSophat04
                    </p>
                    <a
                      href="https://github.com/SormSophat04"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs font-bold text-[#4D7CFE] hover:underline inline-block mt-1"
                    >
                      Visit Repository Page →
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('https://github.com/SormSophat04', 'github')}
                  className="p-2 border-2 border-[#111111] bg-white hover:bg-[#FFD84D] transition-colors shadow-[2px_2px_0px_#111111] cursor-pointer"
                  title="Copy GitHub link"
                  aria-label="Copy GitHub URL"
                >
                  {copiedItem === 'github' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#111111]" />
                  )}
                </button>
              </div>
            </BrutalCard>

            {/* LinkedIn Card (Placeholder clearly stated) */}
            <BrutalCard variant="white" shadow="md" className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 border-2 border-[#111111] bg-[#B7F34A] shrink-0 shadow-[2px_2px_0px_#111111]">
                    <LinkedInIcon className="w-5 h-5 text-[#111111]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-gray-500">
                      LINKEDIN NETWORK
                    </span>
                    <p className="font-mono text-sm md:text-base font-bold text-[#111111] break-all">
                      https://www.linkedin.com/in/sorm-sophat-6b70a03ba
                    </p>
                    <a
                      href="https://www.linkedin.com/in/sorm-sophat-6b70a03ba"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs font-bold text-[#4D7CFE] hover:underline inline-block mt-1"
                    >
                      Visit LinkedIn Profile →
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('https://www.linkedin.com/in/sorm-sophat-6b70a03ba', 'linkedin')}
                  className="p-2 border-2 border-[#111111] bg-white hover:bg-[#FFD84D] transition-colors shadow-[2px_2px_0px_#111111] cursor-pointer"
                  title="Copy LinkedIn link"
                  aria-label="Copy LinkedIn URL"
                >
                  {copiedItem === 'linkedin' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#111111]" />
                  )}
                </button>
              </div>
            </BrutalCard>
          </div>

          {/* Quick Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <BrutalCard variant="white" shadow="lg" borderThick className="overflow-hidden">
              <div className="bg-[#111111] text-[#F5F0E8] p-4 border-b-[3px] border-[#111111] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#FFD84D]" />
                  <span className="font-bold uppercase">SEND TRANSMISSION</span>
                </div>
                {isSubmitting ? (
                  <span className="text-[#FFD84D] font-bold flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> DISPATCHING...
                  </span>
                ) : (
                  <span className="text-[#B7F34A] font-bold">READY</span>
                )}
              </div>

              <div className="p-6 md:p-8">
                {formSubmitted ? (
                  <div className="border-[3px] border-[#111111] bg-[#B7F34A] p-6 text-center space-y-3 shadow-[4px_4px_0px_#111111]">
                    <div className="inline-block p-2 border-2 border-[#111111] bg-white">
                      <Check className="w-6 h-6 text-[#111111]" />
                    </div>
                    <h4 className="font-mono text-lg font-black uppercase text-[#111111]">
                      TRANSMISSION RECEIVED & DISPATCHED!
                    </h4>
                    <p className="font-mono text-xs md:text-sm text-[#111111] font-semibold max-w-md mx-auto">
                      Thank you, {lastSubmittedName}. Your transmission has been sent directly to Sophat's Telegram channel. I will respond to {lastSubmittedEmail} promptly.
                    </p>
                    <div className="pt-2">
                      <BrutalButton
                        variant="black"
                        size="sm"
                        onClick={() => {
                          setFormSubmitted(false);
                          setSubmitError(null);
                        }}
                      >
                        SEND ANOTHER MESSAGE
                      </BrutalButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {submitError && (
                      <div className="border-2 border-[#111111] bg-[#FF4D4D] text-white p-3 font-mono text-xs font-bold flex items-start gap-2.5 shadow-[3px_3px_0px_#111111]">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-yellow-300" />
                        <div>
                          <span className="block uppercase font-black tracking-wide">
                            TRANSMISSION FAILED
                          </span>
                          <span className="font-normal opacity-95">{submitError}</span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="sender-name"
                          className="block font-mono text-xs font-black uppercase tracking-wider text-[#111111] mb-1.5"
                        >
                          YOUR NAME *
                        </label>
                        <input
                          id="sender-name"
                          type="text"
                          required
                          disabled={isSubmitting}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full border-2 border-[#111111] p-3 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-[2px_2px_0px_#111111] disabled:opacity-60"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="sender-email"
                          className="block font-mono text-xs font-black uppercase tracking-wider text-[#111111] mb-1.5"
                        >
                          YOUR EMAIL *
                        </label>
                        <input
                          id="sender-email"
                          type="email"
                          required
                          disabled={isSubmitting}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@example.com"
                          className="w-full border-2 border-[#111111] p-3 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-[2px_2px_0px_#111111] disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="sender-subject"
                        className="block font-mono text-xs font-black uppercase tracking-wider text-[#111111] mb-1.5"
                      >
                        SUBJECT
                      </label>
                      <input
                        id="sender-subject"
                        type="text"
                        disabled={isSubmitting}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Software Engineering Inquiry / Project Collaboration"
                        className="w-full border-2 border-[#111111] p-3 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-[2px_2px_0px_#111111] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sender-message"
                        className="block font-mono text-xs font-black uppercase tracking-wider text-[#111111] mb-1.5"
                      >
                        MESSAGE *
                      </label>
                      <textarea
                        id="sender-message"
                        required
                        disabled={isSubmitting}
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hello Sophat, I would like to discuss..."
                        className="w-full border-2 border-[#111111] p-3 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-[2px_2px_0px_#111111] disabled:opacity-60"
                      />
                    </div>

                    <div className="pt-2">
                      <BrutalButton
                        variant="green"
                        size="md"
                        type="submit"
                        disabled={isSubmitting}
                        icon={
                          isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )
                        }
                        iconPosition="right"
                        className="w-full sm:w-auto"
                      >
                        {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                      </BrutalButton>
                    </div>
                  </form>
                )}
              </div>
            </BrutalCard>
          </div>
        </div>
      </div>
    </section>
  );
};
