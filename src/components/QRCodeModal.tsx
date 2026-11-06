import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Download, Share2 } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  handle: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  handle
}) => {
  const [copied, setCopied] = useState(false);
  const profileUrl = `${window.location.origin}/${handle}`;

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = profileUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        prompt('Salin link:', profileUrl);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">QR Code Etalase</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          
          <div className="p-4 bg-white rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700">
            {/* Simulated high quality QR code representation using SVG */}
            <div className="w-48 h-48 bg-slate-900 rounded-xl p-3 flex flex-col justify-between text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-violet-600/30"></div>
              <div className="flex justify-between relative z-10">
                <div className="w-10 h-10 border-4 border-white rounded-lg flex items-center justify-center font-bold text-xs">LV</div>
                <div className="w-10 h-10 border-4 border-white rounded-lg flex items-center justify-center font-bold text-xs">ID</div>
              </div>
              <div className="text-center relative z-10">
                <p className="text-xs font-mono tracking-widest text-indigo-200">SCAN ME</p>
                <p className="text-[10px] text-slate-300 truncate mt-0.5">@{handle}</p>
              </div>
              <div className="flex justify-between relative z-10">
                <div className="w-10 h-10 border-4 border-white rounded-lg flex items-center justify-center font-bold text-xs">OK</div>
                <div className="w-10 h-10 border-4 border-white rounded-lg flex items-center justify-center font-bold text-xs">QR</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Bagikan QR code ini ke media sosial, kartu nama, atau merchandise Anda agar audiens mudah mengakses link Anda.
          </p>

          <div className="w-full flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate flex-1 px-2 text-left">
              {profileUrl}
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-1 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
