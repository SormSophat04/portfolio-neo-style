import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BrutalCard } from '../BrutalCard';
import { BrutalButton } from '../BrutalButton';
import { KeyRound, ShieldCheck, Check, AlertCircle, Eye, EyeOff, Flame } from 'lucide-react';

export const ChangePasscodeCard: React.FC = () => {
  const { isFirebaseConnected, updatePasscode, verifyPasscode } = usePortfolio();

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Verify current passcode
    if (!verifyPasscode(currentPass)) {
      setStatusMessage({
        type: 'error',
        text: 'The current passcode you entered is incorrect.',
      });
      return;
    }

    // Validate new passcode
    if (newPass.length < 4) {
      setStatusMessage({
        type: 'error',
        text: 'New passcode must be at least 4 characters long.',
      });
      return;
    }

    if (newPass !== confirmPass) {
      setStatusMessage({
        type: 'error',
        text: 'The new passcode and confirmation do not match.',
      });
      return;
    }

    setSaving(true);
    try {
      await updatePasscode(newPass);
      setStatusMessage({
        type: 'success',
        text: isFirebaseConnected
          ? 'Passcode has been updated and securely stored in Firebase Firestore (settings/admin)!'
          : 'Passcode updated in local cache (will sync to Firestore when connected).',
      });
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Failed to update passcode: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <BrutalCard variant="white" shadow="lg" borderThick className="overflow-hidden">
      {/* Header */}
      <div className="bg-[#111111] text-[#F5F0E8] p-4 border-b-[3px] border-[#111111] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#FFD84D]" />
          <span className="font-bold uppercase tracking-wider">
            SECURITY // CHANGE LOGIN PASSCODE
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-[#FFD84D]">STORED IN FIREBASE</span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-6 space-y-1">
          <h4 className="text-xl sm:text-2xl font-black uppercase text-[#111111]">
            UPDATE ADMIN LOGIN PASSCODE
          </h4>
          <p className="font-mono text-xs text-[#111111]/75 font-semibold">
            Change the passcode required to access your CMS Dashboard. Updates are immediately saved to Firebase Firestore (<code className="bg-[#F5F0E8] px-1 py-0.5 border border-[#111111]">settings/admin</code>).
          </p>
        </div>

        {statusMessage && (
          <div
            className={`p-3.5 mb-6 border-2 border-[#111111] font-mono text-xs font-bold flex items-center gap-2.5 shadow-[2px_2px_0px_#111111] ${
              statusMessage.type === 'success'
                ? 'bg-[#B7F34A] text-[#111111]'
                : 'bg-[#FF6B9D] text-[#111111]'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-[#111111] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#111111] shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
          {/* Current Passcode */}
          <div>
            <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
              CURRENT PASSCODE *
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter your existing passcode"
                className="w-full border-2 border-[#111111] p-2.5 pr-10 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#111111]"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                tabIndex={-1}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Passcode */}
          <div>
            <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
              NEW PASSCODE *
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new passcode (min. 4 characters)"
                className="w-full border-2 border-[#111111] p-2.5 pr-10 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#111111]"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Passcode */}
          <div>
            <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
              CONFIRM NEW PASSCODE *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Repeat new passcode"
                className="w-full border-2 border-[#111111] p-2.5 pr-10 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#111111]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <BrutalButton
              variant="yellow"
              size="md"
              type="submit"
              disabled={saving}
              icon={<ShieldCheck className="w-4 h-4" />}
              iconPosition="right"
            >
              {saving ? 'UPDATING IN FIREBASE...' : 'SAVE NEW PASSCODE TO FIREBASE'}
            </BrutalButton>
          </div>
        </form>
      </div>
    </BrutalCard>
  );
};
