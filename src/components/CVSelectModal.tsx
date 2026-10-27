import React, { useState } from 'react';
import type { CVDocument } from '../types';
import { BrutalCard } from './BrutalCard';
import {
  FileText,
  Download,
  Eye,
  Star,
  CheckCircle,
  X,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface CVSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvs: CVDocument[];
}

export const CVSelectModal: React.FC<CVSelectModalProps> = ({
  isOpen,
  onClose,
  cvs,
}) => {
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = (cv: CVDocument) => {
    // Trigger real browser download
    const link = document.createElement('a');
    link.href = cv.fileUrl;
    link.download = cv.fileName || `${cv.title.replace(/\s+/g, '_')}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccessId(cv.id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 3000);
  };

  const handlePreview = (cv: CVDocument) => {
    if (cv.fileUrl.startsWith('data:application/pdf')) {
      // Open data URI in new tab or window
      const win = window.open();
      if (win) {
        win.document.write(
          `<iframe src="${cv.fileUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
        );
      } else {
        window.open(cv.fileUrl, '_blank');
      }
    } else {
      window.open(cv.fileUrl, '_blank');
    }
  };

  // Sort: default CV first, then by uploadedAt descending
  const sortedCvs = [...cvs].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;
    return (b.uploadedAt || '').localeCompare(a.uploadedAt || '');
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-select-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <BrutalCard variant="white" shadow="xl" borderThick className="overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#FFD84D] border-b-[3px] border-[#111111] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 border-2 border-[#111111] bg-white shadow-[2px_2px_0px_#111111]">
                <FileText className="w-6 h-6 text-[#111111]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    id="cv-select-title"
                    className="text-xl sm:text-2xl font-black uppercase text-[#111111] tracking-tight"
                  >
                    SELECT CURRICULUM VITAE
                  </h3>
                  <span className="hidden sm:inline-block border border-[#111111] bg-[#B7F34A] px-2 py-0.5 font-mono text-[11px] font-black uppercase">
                    HR & RECRUITERS
                  </span>
                </div>
                <p className="font-mono text-xs text-[#111111]/80 font-bold mt-0.5">
                  Choose the specialized resume version matching your company's role.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 border-2 border-[#111111] bg-white hover:bg-[#111111] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#111111]"
              aria-label="Close CV Selection"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CVs List */}
          <div className="p-6 space-y-4 bg-[#F5F0E8]">
            {sortedCvs.length === 0 ? (
              <div className="p-8 text-center bg-white border-2 border-[#111111] font-mono text-sm">
                No CV documents uploaded yet. Please check back soon or contact me directly.
              </div>
            ) : (
              sortedCvs.map((cv) => {
                const isDownloaded = downloadSuccessId === cv.id;

                return (
                  <div
                    key={cv.id}
                    className={`border-3 border-[#111111] p-5 transition-all bg-white ${
                      cv.isDefault
                        ? 'shadow-[5px_5px_0px_#111111] ring-2 ring-[#FFD84D]'
                        : 'shadow-[3px_3px_0px_#111111]'
                    }`}
                  >
                    {/* Top Row: Title, Role, and Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-[#111111]/15 mb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="text-lg sm:text-xl font-black uppercase text-[#111111]">
                            {cv.title}
                          </h4>
                          {cv.isDefault && (
                            <span className="inline-flex items-center gap-1 border-2 border-[#111111] bg-[#FFD84D] px-2 py-0.5 font-mono text-[10px] font-black uppercase shadow-[1px_1px_0px_#111111]">
                              <Star className="w-3 h-3 text-[#111111] fill-[#111111]" />
                              RECOMMENDED / PRIMARY
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-gray-700">
                          <span className="font-bold text-[#4D7CFE] flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5" />
                            {cv.targetRole}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Updated: {cv.uploadedAt || 'Current'}
                          </span>
                        </div>
                      </div>

                      {/* File Info Pills */}
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="border border-[#111111] bg-[#F5F0E8] px-2 py-0.5 font-mono text-xs font-bold">
                          {cv.language || 'English'}
                        </span>
                        <span className="border border-[#111111] bg-[#B7F34A] px-2 py-0.5 font-mono text-xs font-black">
                          {cv.fileSize || 'PDF'}
                        </span>
                      </div>
                    </div>

                    {/* Description for HR */}
                    {cv.description && (
                      <p className="font-sans text-xs md:text-sm text-[#111111]/85 font-medium leading-relaxed mb-4">
                        {cv.description}
                      </p>
                    )}

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#111111]/15">
                      <div className="font-mono text-[11px] text-gray-600 truncate max-w-xs">
                        File: <span className="font-bold text-black">{cv.fileName}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePreview(cv)}
                          className="px-3 py-1.5 border-2 border-[#111111] bg-white hover:bg-[#F5F0E8] font-mono text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_#111111] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownload(cv)}
                          className={`px-4 py-1.5 border-2 border-[#111111] font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#111111] flex items-center gap-1.5 cursor-pointer ${
                            isDownloaded
                              ? 'bg-[#B7F34A] text-[#111111]'
                              : 'bg-[#FFD84D] hover:bg-[#111111] hover:text-white'
                          }`}
                        >
                          {isDownloaded ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Downloaded!</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Download CV</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Bottom Note for Recruiters */}
            <div className="border-2 border-[#111111] bg-[#FFD84D]/25 p-4 shadow-[2px_2px_0px_#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#111111]" />
                <span className="font-mono text-xs font-bold text-[#111111]">
                  Need customized credentials or direct technical interview scheduling?
                </span>
              </div>
              <a
                href="#contact"
                onClick={onClose}
                className="font-mono text-xs font-black uppercase bg-[#111111] text-white px-3 py-1.5 border-2 border-[#111111] hover:bg-[#FFD84D] hover:text-[#111111] transition-colors inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>Direct Contact</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </BrutalCard>
      </div>
    </div>
  );
};
