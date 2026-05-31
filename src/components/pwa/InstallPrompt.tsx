import React, { useEffect, useState } from 'react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (!deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50 flex items-center justify-between">
      <div className="text-sm text-gray-700">Install MindCourse for a better experience</div>
      <button
        onClick={handleInstallClick}
        className="ml-4 px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
      >
        Add to Home Screen
      </button>
    </div>
  );
}
