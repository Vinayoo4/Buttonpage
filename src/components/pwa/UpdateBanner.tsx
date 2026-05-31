import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function UpdateBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-indigo-600 text-white p-3 text-center z-50 flex justify-center items-center">
      <span className="mr-4">Update available.</span>
      <button
        onClick={() => updateServiceWorker(true)}
        className="px-4 py-1 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-100"
      >
        Refresh
      </button>
      <button
        onClick={() => setNeedRefresh(false)}
        className="ml-2 p-1 hover:text-gray-200"
      >
        Dismiss
      </button>
    </div>
  );
}
