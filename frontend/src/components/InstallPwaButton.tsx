import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Check, X, Shield } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallPwaButton: React.FC<{ variant?: 'navbar' | 'login' | 'banner' }> = ({ variant = 'login' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // If prompt isn't directly triggered (like iOS or already saved)
      setShowInstructions(true);
    }
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {variant === 'navbar' && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 bg-gradient-to-r from-police-gold-500 to-police-gold-600 hover:from-police-gold-400 hover:to-police-gold-500 text-police-navy-950 font-black px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs shadow transition-all active:scale-95"
          title="मोबाइल ऐप इंस्टॉल करें"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">मोबाइल ऐप इंस्टॉल करें</span>
          <span className="sm:hidden">ऐप</span>
        </button>
      )}

      {variant === 'login' && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-police-gold-400 hover:text-police-gold-300 border border-police-gold-500/30 px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Smartphone className="w-4 h-4 text-police-gold-400 animate-pulse" />
            <span>मोबाइल ऐप (APK/PWA) अपने फोन में इंस्टॉल करें</span>
            <Download className="w-3.5 h-3.5 ml-0.5 opacity-80" />
          </button>
        </div>
      )}

      {/* Guide Dialog when direct prompt isn't supported (e.g. iOS Safari) */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-police-navy-700 text-white rounded-3xl max-w-sm w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-police-gold-500/20 border border-police-gold-500/40 flex items-center justify-center text-police-gold-400 mx-auto mb-3">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-center text-white mb-1">
              मोबाइल में ऐप कैसे इंस्टॉल करें?
            </h3>
            <p className="text-xs text-slate-300 text-center mb-4">
              यह ऐप बिना प्ले-स्टोर के सीधे आपके फोन की होम स्क्रीन पर छत्तीसगढ़ पुलिस आइकन के साथ इंस्टॉल हो जाएगा:
            </p>

            <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-police-gold-500 text-police-navy-950 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <div>
                  <strong className="text-police-gold-300">Android (Chrome/Edge):</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    ऊपर दाईं ओर 3-बिंदु (⋮) मेनू दबाएं और <strong>"Install app"</strong> या <strong>"Add to Home screen"</strong> चुनें।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-police-gold-500 text-police-navy-950 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <div>
                  <strong className="text-police-gold-300">iPhone (Safari):</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    नीचे शेयर (Share <span className="font-mono">⎋</span>) बटन दबाएं और <strong>"Add to Home Screen"</strong> चुनें।
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full mt-4 bg-police-gold-500 hover:bg-police-gold-400 text-police-navy-950 font-black py-2 rounded-xl text-xs transition-colors"
            >
              समझ गया
            </button>
          </div>
        </div>
      )}
    </>
  );
};
