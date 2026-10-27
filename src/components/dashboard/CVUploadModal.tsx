import React, { useState, useEffect, useRef } from 'react';
import type { CVDocument } from '../../types';
import { BrutalCard } from '../BrutalCard';
import { BrutalButton } from '../BrutalButton';
import { X, Upload, FileText, CheckCircle, Link as LinkIcon, Star, AlertCircle } from 'lucide-react';
import { SAMPLE_PDF_DATA_URI } from '../../data/cvs';

interface CVUploadModalProps {
  cv?: CVDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (cv: CVDocument) => Promise<void>;
}

export const CVUploadModal: React.FC<CVUploadModalProps> = ({
  cv,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<CVDocument>({
    id: '',
    title: '',
    targetRole: '',
    fileName: '',
    fileUrl: '',
    fileSize: '',
    uploadedAt: '',
    isDefault: false,
    language: 'English',
    description: '',
  });

  const [uploadMethod, setUploadMethod] = useState<'file' | 'link'>('file');
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cv) {
      setFormData(cv);
      setUploadMethod(cv.fileUrl.startsWith('http') ? 'link' : 'file');
    } else {
      setFormData({
        id: `cv-${Date.now()}`,
        title: '',
        targetRole: 'Software Engineer',
        fileName: '',
        fileUrl: '',
        fileSize: '',
        uploadedAt: new Date().toISOString().split('T')[0],
        isDefault: false,
        language: 'English',
        description: '',
      });
      setFileSelected(null);
    }
    setError('');
  }, [cv, isOpen]);

  if (!isOpen) return null;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleProcessFile = (file: File) => {
    if (!file) return;

    // Optional check: Warn if file is larger than 8MB
    if (file.size > 8 * 1024 * 1024) {
      setError('File size exceeds 8MB. For larger documents, consider using an external link.');
      return;
    }

    setFileSelected(file);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        fileUrl: result,
        title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      }));
    };
    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please provide a descriptive title for this CV.');
      return;
    }

    let finalUrl = formData.fileUrl;
    if (!finalUrl) {
      if (cv && cv.fileUrl) {
        finalUrl = cv.fileUrl;
      } else {
        // Fallback sample PDF if none uploaded
        finalUrl = SAMPLE_PDF_DATA_URI;
      }
    }

    setSaving(true);
    try {
      await onSave({
        ...formData,
        id: formData.id || `cv-${Date.now()}`,
        fileUrl: finalUrl,
        fileName: formData.fileName || 'Sorm_Sophat_CV.pdf',
        fileSize: formData.fileSize || '150 KB',
        uploadedAt: formData.uploadedAt || new Date().toISOString().split('T')[0],
      });
      onClose();
    } catch (err) {
      console.error('Error saving CV:', err);
      setError('Failed to save CV. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <BrutalCard variant="white" shadow="xl" borderThick className="overflow-hidden">
          {/* Header */}
          <div className="bg-[#B7F34A] border-b-[3px] border-[#111111] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 border-2 border-[#111111] bg-white shadow-[2px_2px_0px_#111111]">
                <FileText className="w-5 h-5 text-[#111111]" />
              </span>
              <span id="cv-modal-title" className="font-mono text-sm font-black uppercase text-[#111111]">
                {cv ? `EDIT CV // ${cv.title}` : 'UPLOAD MULTI-CV FOR HR'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 border-2 border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 border-2 border-[#111111] bg-[#FF6B9D] text-[#111111] font-mono text-xs font-bold flex items-center gap-2 shadow-[2px_2px_0px_#111111]">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Upload Method Tabs */}
            <div className="flex gap-2 border-b-2 border-[#111111] pb-3">
              <button
                type="button"
                onClick={() => setUploadMethod('file')}
                className={`px-3 py-1.5 border-2 border-[#111111] font-mono text-xs font-bold uppercase cursor-pointer transition-all ${
                  uploadMethod === 'file'
                    ? 'bg-[#111111] text-white shadow-[2px_2px_0px_#111111]'
                    : 'bg-white text-[#111111] hover:bg-[#F5F0E8]'
                }`}
              >
                Upload File (PDF / DOC)
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('link')}
                className={`px-3 py-1.5 border-2 border-[#111111] font-mono text-xs font-bold uppercase cursor-pointer transition-all ${
                  uploadMethod === 'link'
                    ? 'bg-[#111111] text-white shadow-[2px_2px_0px_#111111]'
                    : 'bg-white text-[#111111] hover:bg-[#F5F0E8]'
                }`}
              >
                External Link / URL
              </button>
            </div>

            {/* File Drag and Drop Box */}
            {uploadMethod === 'file' ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-3 border-dashed p-6 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? 'border-[#4D7CFE] bg-[#4D7CFE]/10'
                    : 'border-[#111111] bg-[#F5F0E8] hover:bg-white'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleProcessFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 border-2 border-[#111111] bg-[#FFD84D] shadow-[2px_2px_0px_#111111]">
                    <Upload className="w-6 h-6 text-[#111111]" />
                  </div>
                  <p className="font-mono text-xs font-black uppercase text-[#111111]">
                    {fileSelected
                      ? `Selected: ${fileSelected.name} (${formatFileSize(fileSelected.size)})`
                      : formData.fileName
                      ? `Existing: ${formData.fileName} (${formData.fileSize || 'Standard'})`
                      : 'DRAG & DROP YOUR CV HERE OR CLICK TO BROWSE'}
                  </p>
                  <p className="font-mono text-[11px] text-gray-600">
                    Supports PDF, DOC, DOCX up to 8MB. Embeds automatically.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  External File / Cloud Storage URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="p-2.5 border-2 border-[#111111] bg-[#F5F0E8]">
                    <LinkIcon className="w-4 h-4 text-[#111111]" />
                  </div>
                  <input
                    type="url"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/... or https://domain.com/cv.pdf"
                    className="flex-1 border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.fileName}
                    onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                    placeholder="File name (e.g. Resume_Backend.pdf)"
                    className="border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                  />
                  <input
                    type="text"
                    value={formData.fileSize || ''}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="File size (e.g. 210 KB)"
                    className="border-2 border-[#111111] p-2 font-mono text-xs bg-white"
                  />
                </div>
              </div>
            )}

            {/* CV Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  CV Display Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Software Engineer (Backend Focus)"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Target Role / Domain
                </label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  placeholder="e.g. Backend Engineer / API Specialist"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Language
                </label>
                <select
                  value={formData.language || 'English'}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white font-bold"
                >
                  <option value="English">English</option>
                  <option value="Khmer">Khmer</option>
                  <option value="English & Khmer">English & Khmer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs font-black uppercase mb-1">
                  Upload / Version Date
                </label>
                <input
                  type="text"
                  value={formData.uploadedAt}
                  onChange={(e) => setFormData({ ...formData, uploadedAt: e.target.value })}
                  placeholder="e.g. 2025-02-15 or Present"
                  className="w-full border-2 border-[#111111] p-2.5 font-mono text-xs bg-white"
                />
              </div>
            </div>

            {/* Note for HR / Recruiter */}
            <div>
              <label className="block font-mono text-xs font-black uppercase mb-1">
                Summary for HR / Recruiters
              </label>
              <textarea
                rows={2}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What distinguishes this CV? (e.g. Highlighted LOLC Bank internship, Spring Boot, Kafka, and enterprise backend systems)..."
                className="w-full border-2 border-[#111111] p-2.5 font-sans text-xs bg-white"
              />
            </div>

            {/* Checkbox: Recommended / Default */}
            <div className="p-3 border-2 border-[#111111] bg-[#FFD84D]/30 flex items-center gap-3">
              <input
                type="checkbox"
                id="isDefaultCV"
                checked={formData.isDefault || false}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-4 h-4 border-2 border-[#111111] cursor-pointer"
              />
              <label
                htmlFor="isDefaultCV"
                className="font-mono text-xs font-black uppercase text-[#111111] cursor-pointer flex items-center gap-1.5"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Set as Recommended / Default CV (Recruiters see this first)</span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t-2 border-[#111111] flex justify-end gap-3">
              <BrutalButton
                variant="white"
                size="md"
                type="button"
                onClick={onClose}
                disabled={saving}
              >
                CANCEL
              </BrutalButton>
              <BrutalButton
                variant="green"
                size="md"
                type="submit"
                disabled={saving}
                icon={<CheckCircle className="w-4 h-4" />}
                iconPosition="left"
              >
                {saving ? 'SAVING CV...' : cv ? 'UPDATE CV' : 'UPLOAD CV'}
              </BrutalButton>
            </div>
          </form>
        </BrutalCard>
      </div>
    </div>
  );
};
