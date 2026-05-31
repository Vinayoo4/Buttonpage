import React, { useState, useEffect } from 'react';
import { Moon, Sun, Clock, Trash2, Save, Bell } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { clearAllData } from '../store';
import { Settings as SettingsType } from '../types';

const Settings = () => {
  const { darkMode, toggleDarkMode, currentUser } = useAppContext();
  const [settings, setSettings] = useState<SettingsType>({
      darkMode: darkMode,
      dailyReminderTime: '08:00',
      preferredDuration: 5
  });
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
      const saved = localStorage.getItem(`settings_${currentUser?.id}`);
      if (saved) {
          setSettings(JSON.parse(saved));
      } else {
          setSettings(prev => ({ ...prev, darkMode }));
      }
  }, [currentUser, darkMode]);

  const handleSave = () => {
      localStorage.setItem(`settings_${currentUser?.id}`, JSON.stringify(settings));
      setSaveMessage('Settings saved successfully');
      setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
      if (window.confirm('Are you sure you want to reset ALL progress, streaks, and course data? This cannot be undone.')) {
          clearAllData();
          window.location.href = '/';
      }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className={`p-8 rounded-2xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="space-y-8">

              {/* Theme Toggle */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-indigo-50 text-indigo-600'}`}>
                          {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                      </div>
                      <div>
                          <h3 className="font-bold text-lg">Appearance</h3>
                          <p className="text-sm opacity-70">Toggle between light and dark mode</p>
                      </div>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-indigo-500' : 'bg-gray-300'}`}
                  >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
              </div>

              {/* Reminders */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-indigo-50 text-indigo-600'}`}>
                          <Bell size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg">Daily Reminder</h3>
                          <p className="text-sm opacity-70">When should we remind you to practice?</p>
                      </div>
                  </div>
                  <input
                      type="time"
                      value={settings.dailyReminderTime}
                      onChange={e => setSettings({...settings, dailyReminderTime: e.target.value})}
                      className={`p-2 rounded border outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
                  />
              </div>

              {/* Duration Preference */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-indigo-50 text-indigo-600'}`}>
                          <Clock size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg">Preferred Duration</h3>
                          <p className="text-sm opacity-70">Filter for shorter or longer practices</p>
                      </div>
                  </div>
                  <select
                      value={settings.preferredDuration}
                      onChange={e => setSettings({...settings, preferredDuration: parseInt(e.target.value)})}
                      className={`p-2 rounded border outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
                  >
                      <option value={5}>5 minutes</option>
                      <option value={10}>10 minutes</option>
                      <option value={15}>15+ minutes</option>
                  </select>
              </div>

              {/* Reset Data */}
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-red-50 text-red-600 dark:bg-red-900/30">
                          <Trash2 size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg text-red-600 dark:text-red-400">Reset Progress</h3>
                          <p className="text-sm opacity-70">Clear all local storage data</p>
                      </div>
                  </div>
                  <button
                      onClick={handleReset}
                      className="px-4 py-2 border border-red-500 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                      Reset Data
                  </button>
              </div>

          </div>

          <div className="mt-8 flex items-center justify-between">
              <span className="text-green-500 font-medium">{saveMessage}</span>
              <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                  <Save size={20} /> Save Preferences
              </button>
          </div>
      </div>
    </div>
  );
};

export default Settings;
