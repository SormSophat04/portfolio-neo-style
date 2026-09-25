import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BrutalCard } from '../BrutalCard';
import { BrutalButton } from '../BrutalButton';
import {
  Flame,
  CheckCircle2,
  AlertTriangle,
  Database,
  Save,
  Trash2,
  UploadCloud,
  HelpCircle,
} from 'lucide-react';
import type { FirebaseConfig } from '../../services/firebase';

export const FirebaseSettingsTab: React.FC = () => {
  const {
    isFirebaseConnected,
    firebaseConfig,
    saveConfig,
    removeConfig,
    seedFirestore,
  } = usePortfolio();

  const [formData, setFormData] = useState<FirebaseConfig>({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  });

  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (firebaseConfig) {
      setFormData(firebaseConfig);
    }
  }, [firebaseConfig]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.apiKey || !formData.projectId) {
      alert('Please provide at least the Firebase API Key and Project ID.');
      return;
    }
    saveConfig(formData);
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedStatus(null);
    try {
      const res = await seedFirestore();
      setSeedStatus(res.message);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSeedStatus(`Error: ${msg}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Connection Status Banner */}
      <BrutalCard
        variant={isFirebaseConnected ? 'green' : 'yellow'}
        shadow="md"
        borderThick
        className="p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 border-2 border-[#111111] bg-white shadow-[2px_2px_0px_#111111]">
              <Flame className="w-6 h-6 text-[#111111]" />
            </div>
            <div>
              <span className="font-mono text-xs font-black uppercase tracking-wider text-[#111111]">
                CLOUD PERSISTENCE STATUS
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-[#111111]">
                {isFirebaseConnected
                  ? 'LIVE FIRESTORE DATABASE CONNECTED'
                  : 'LOCAL STORAGE MODE (READY TO CONNECT)'}
              </h3>
              <p className="font-mono text-xs text-[#111111]/85 font-semibold mt-1">
                {isFirebaseConnected
                  ? `Syncing changes directly to Cloud Firestore Project: "${firebaseConfig?.projectId}"`
                  : 'Operating with client-side cache and default state. Plug in your Firebase credentials below to enable live cloud sync.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {isFirebaseConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#111111] bg-white font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#111111]">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                ONLINE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#111111] bg-white font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#111111]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                LOCAL DEMO
              </span>
            )}
          </div>
        </div>
      </BrutalCard>

      {/* One-Click Seed Action (When Connected) */}
      {isFirebaseConnected && (
        <BrutalCard variant="white" shadow="md" borderThick className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-mono text-sm font-black uppercase text-[#111111] flex items-center gap-2">
                <Database className="w-4 h-4 text-[#4D7CFE]" />
                ONE-CLICK SEED TO FIRESTORE
              </h4>
              <p className="font-mono text-xs text-[#111111]/80 mt-1 max-w-xl font-medium">
                Upload your default portfolio dataset (4 projects, 5 skill categories, and LOLC internship experience) directly into your empty Firestore collections.
              </p>
            </div>
            <BrutalButton
              variant="yellow"
              size="sm"
              onClick={handleSeed}
              disabled={seeding}
              icon={<UploadCloud className="w-4 h-4" />}
              iconPosition="left"
            >
              {seeding ? 'SEEDING DATABASE...' : 'SEED DATA TO FIRESTORE'}
            </BrutalButton>
          </div>

          {seedStatus && (
            <div className="mt-4 p-3 border-2 border-[#111111] bg-[#F5F0E8] font-mono text-xs font-bold text-[#111111]">
              &gt; {seedStatus}
            </div>
          )}
        </BrutalCard>
      )}

      {/* Firebase Credentials Configuration Form */}
      <BrutalCard variant="white" shadow="lg" borderThick className="p-6 md:p-8">
        <div className="border-b-2 border-[#111111] pb-4 mb-6 flex items-center justify-between">
          <div>
            <h4 className="font-mono text-base font-black uppercase text-[#111111]">
              FIREBASE PROJECT CONFIGURATION
            </h4>
            <p className="font-mono text-xs text-[#111111]/70 font-semibold mt-0.5">
              Enter your Firebase Web App configuration keys. Values are securely retained in your environment / browser.
            </p>
          </div>
          <span className="font-mono text-xs bg-[#FFD84D] px-2 py-0.5 border border-[#111111] font-bold">
            FIRESTORE
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                API KEY (apiKey) *
              </label>
              <input
                type="text"
                required
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                PROJECT ID (projectId) *
              </label>
              <input
                type="text"
                required
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                placeholder="sorm-sophat-portfolio"
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                AUTH DOMAIN (authDomain)
              </label>
              <input
                type="text"
                value={formData.authDomain}
                onChange={(e) => setFormData({ ...formData, authDomain: e.target.value })}
                placeholder="sorm-sophat-portfolio.firebaseapp.com"
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                STORAGE BUCKET (storageBucket)
              </label>
              <input
                type="text"
                value={formData.storageBucket}
                onChange={(e) => setFormData({ ...formData, storageBucket: e.target.value })}
                placeholder="sorm-sophat-portfolio.appspot.com"
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                MESSAGING SENDER ID
              </label>
              <input
                type="text"
                value={formData.messagingSenderId}
                onChange={(e) => setFormData({ ...formData, messagingSenderId: e.target.value })}
                placeholder="1029384756..."
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                APP ID (appId)
              </label>
              <input
                type="text"
                value={formData.appId}
                onChange={(e) => setFormData({ ...formData, appId: e.target.value })}
                placeholder="1:1029384756:web:..."
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-black uppercase text-[#111111] mb-1">
                MEASUREMENT ID (measurementId)
              </label>
              <input
                type="text"
                value={formData.measurementId || ''}
                onChange={(e) => setFormData({ ...formData, measurementId: e.target.value })}
                placeholder="G-N68602JHMX"
                className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-[#F5F0E8] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t-2 border-[#111111] flex flex-wrap items-center justify-between gap-3">
            {firebaseConfig && (
              <BrutalButton
                variant="white"
                size="sm"
                type="button"
                onClick={removeConfig}
                icon={<Trash2 className="w-4 h-4 text-red-600" />}
                iconPosition="left"
              >
                RESET TO LOCAL CACHE
              </BrutalButton>
            )}

            <BrutalButton
              variant="yellow"
              size="md"
              type="submit"
              icon={<Save className="w-4 h-4" />}
              iconPosition="right"
              className="ml-auto"
            >
              SAVE CONFIG & CONNECT FIRESTORE
            </BrutalButton>
          </div>
        </form>
      </BrutalCard>

      {/* Guide Card */}
      <BrutalCard variant="cream" shadow="sm" className="p-6 border-2">
        <div className="flex items-start gap-3">
          <div className="p-2 border border-[#111111] bg-[#4D7CFE] text-white shrink-0 shadow-[2px_2px_0px_#111111]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h5 className="font-mono text-xs md:text-sm font-black uppercase text-[#111111]">
              QUICK FIREBASE FIRESTORE SETUP GUIDE:
            </h5>
            <ol className="list-decimal list-inside font-mono text-xs text-[#111111]/85 space-y-1">
              <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="underline font-bold text-[#4D7CFE]">console.firebase.google.com</a> and create a project.</li>
              <li>Navigate to <strong>Build &gt; Firestore Database</strong> and click <strong>Create database</strong> (choose Start in test mode or production).</li>
              <li>In Project Settings, add a <strong>Web App (&lt;/&gt;)</strong> to obtain your Firebase Config object.</li>
              <li>Paste the configuration parameters above or in your local <code className="bg-white px-1 border border-[#111111]">.env</code> file.</li>
              <li>Click <strong>Seed Data To Firestore</strong> to immediately migrate your existing portfolio records to the cloud.</li>
            </ol>
          </div>
        </div>
      </BrutalCard>
    </div>
  );
};
