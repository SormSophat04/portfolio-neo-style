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
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../components/Icons';

export const Contact: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
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
                <span className="text-[#B7F34A] font-bold">READY</span>
              </div>

              <div className="p-6 md:p-8">
                {formSubmitted ? (
                  <div className="border-[3px] border-[#111111] bg-[#B7F34A] p-6 text-center space-y-3 shadow-[4px_4px_0px_#111111]">
                    <div className="inline-block p-2 border-2 border-[#111111] bg-white">
                      <Check className="w-6 h-6 text-[#111111]" />
                    </div>
                    <h4 className="font-mono text-lg font-black uppercase text-[#111111]">
                      TRANSMISSION RECEIVED!
                    </h4>
                    <p className="font-mono text-xs md:text-sm text-[#111111] font-semibold max-w-md mx-auto">
                      Thank you, {formData.name}. Your message has been logged. I will respond to {formData.email} promptly.
                    </p>
                    <div className="pt-2">
                      <BrutalButton
                        variant="black"
                        size="sm"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                      >
                        SEND ANOTHER MESSAGE
                      </BrutalButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full border-2 border-[#111111] p-3 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-[2px_2px_0px_#111111]"
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
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@example.com"
                          className="w-full border-2 border-[#111111] p-3 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-[2px_2px_0px_#111111]"
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
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Software Engineering Inquiry / Project Collaboration"
                        className="w-full border-2 border-[#111111] p-3 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-[2px_2px_0px_#111111]"
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
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hello Sophat, I would like to discuss..."
                        className="w-full border-2 border-[#111111] p-3 font-mono text-xs md:text-sm bg-[#F5F0E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-[2px_2px_0px_#111111]"
                      />
                    </div>

                    <div className="pt-2">
                      <BrutalButton
                        variant="green"
                        size="md"
                        type="submit"
                        icon={<Send className="w-4 h-4" />}
                        iconPosition="right"
                        className="w-full sm:w-auto"
                      >
                        TRANSMIT MESSAGE
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
