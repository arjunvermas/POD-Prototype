import React, { useEffect, useState } from 'react';
import { Check, ChevronRight, Palette } from 'lucide-react';

const backgroundOptions = [
  { id: 'mist', name: 'Mist', value: '#f9fafb', accent: '#0d9488', group: 'Soft' },
  { id: 'lavender', name: 'Lavender', value: '#f4f0ff', accent: '#7c3aed', group: 'Soft' },
  { id: 'sage', name: 'Sage', value: '#eef7f1', accent: '#15803d', group: 'Soft' },
  { id: 'sky', name: 'Sky', value: '#eef6ff', accent: '#2563eb', group: 'Soft' },
  { id: 'rose', name: 'Rose', value: '#fff1f5', accent: '#e11d48', group: 'Soft' },
  { id: 'sand', name: 'Sand', value: '#fff7ed', accent: '#ea580c', group: 'Soft' },
  { id: 'slate', name: 'Slate', value: '#eef2f7', accent: '#475569', group: 'Soft' },
  { id: 'mint', name: 'Mint', value: '#ecfdf5', accent: '#059669', group: 'Soft' },
  { id: 'black-neon', name: 'Black Glow', value: '#050509', accent: '#22d3ee', glow: 'rgba(34, 211, 238, 0.55)', group: 'Neon' },
  { id: 'gray-neon', name: 'Gray Neon', value: '#111827', accent: '#a3e635', glow: 'rgba(163, 230, 53, 0.5)', group: 'Neon' },
  { id: 'blue-neon', name: 'Blue Neon', value: '#020617', accent: '#38bdf8', glow: 'rgba(56, 189, 248, 0.55)', group: 'Neon' },
  { id: 'violet-night', name: 'Violet Night', value: '#10051f', accent: '#c084fc', glow: 'rgba(192, 132, 252, 0.5)', group: 'Neon' },
  { id: 'cyber-teal', name: 'Cyber Teal', value: '#031b1b', accent: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.5)', group: 'Neon' },
  { id: 'hotline', name: 'Hotline', value: '#19030d', accent: '#fb7185', glow: 'rgba(251, 113, 133, 0.52)', group: 'Neon' }
];

const STORAGE_KEY = 'bookmytrip-background-theme';

const ThemeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (typeof window === 'undefined') return backgroundOptions[0];
    const savedThemeId = window.localStorage.getItem(STORAGE_KEY);
    return backgroundOptions.find(option => option.id === savedThemeId) || backgroundOptions[0];
  });

  useEffect(() => {
    const isNeon = selectedTheme.group === 'Neon';

    document.documentElement.style.setProperty('--app-bg', selectedTheme.value);
    document.documentElement.style.setProperty('--app-theme-accent', selectedTheme.accent);
    document.documentElement.style.setProperty('--app-theme-glow', selectedTheme.glow || 'rgba(13, 148, 136, 0.2)');
    document.documentElement.style.setProperty('--app-surface', isNeon ? 'rgba(15, 23, 42, 0.86)' : `color-mix(in srgb, ${selectedTheme.value} 28%, white)`);
    document.documentElement.style.setProperty('--app-surface-strong', isNeon ? 'rgba(2, 6, 23, 0.9)' : `color-mix(in srgb, ${selectedTheme.value} 44%, white)`);
    document.documentElement.style.setProperty('--app-surface-soft', isNeon ? 'rgba(255, 255, 255, 0.08)' : `color-mix(in srgb, ${selectedTheme.value} 68%, white)`);
    document.documentElement.style.setProperty('--app-text', isNeon ? '#f8fafc' : '#1f2937');
    document.documentElement.style.setProperty('--app-muted', isNeon ? '#cbd5e1' : '#64748b');
    document.documentElement.style.setProperty('--app-border', isNeon ? 'rgba(148, 163, 184, 0.24)' : `color-mix(in srgb, ${selectedTheme.accent} 18%, #e5e7eb)`);
    document.documentElement.dataset.appThemeTone = isNeon ? 'dark' : 'light';
    document.body.style.backgroundColor = selectedTheme.value;
    window.localStorage.setItem(STORAGE_KEY, selectedTheme.id);
  }, [selectedTheme]);

  return (
    <aside
      className={`fixed right-0 top-24 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-3.5rem)]'
      }`}
      aria-label="Background preferences"
    >
      <div className="flex items-start">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 flex h-14 w-14 items-center justify-center rounded-l-2xl border border-r-0 border-gray-100 bg-white text-primary shadow-xl transition hover:bg-primary hover:text-white"
          aria-label={isOpen ? 'Close background sidebar' : 'Open background sidebar'}
        >
          {isOpen ? <ChevronRight className="h-5 w-5" /> : <Palette className="h-5 w-5" />}
        </button>

        <div className="max-h-[calc(100vh-7rem)] w-72 overflow-y-auto rounded-l-3xl border border-gray-100 bg-white p-5 shadow-2xl">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">Background</h2>
              <p className="mt-1 text-sm font-medium text-gray-500">Choose a page colour.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Collapse sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {['Soft', 'Neon'].map(group => (
            <div key={group} className="mb-5 last:mb-0">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">{group} themes</h3>
                {group === 'Neon' && <span className="rounded-full bg-gray-950 px-2 py-1 text-[10px] font-black text-cyan-300">Glow</span>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {backgroundOptions.filter(option => option.group === group).map(option => {
                  const isSelected = selectedTheme.id === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedTheme(option)}
                      className={`rounded-2xl border p-3 text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-gray-100 hover:border-primary/40 hover:bg-gray-50'
                      }`}
                    >
                      <span
                        className="mb-3 flex h-12 w-full items-center justify-center rounded-xl border border-black/5"
                        style={{
                          backgroundColor: option.value,
                          boxShadow: option.glow ? `0 0 18px ${option.glow}, inset 0 0 16px ${option.glow}` : undefined
                        }}
                      >
                        {isSelected && (
                          <span
                            className="flex h-6 w-6 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: option.accent }}
                          >
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </span>
                      <span className="block text-sm font-black text-gray-800">{option.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setSelectedTheme(backgroundOptions[0])}
            className="mt-5 w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm font-black text-gray-600 transition hover:border-primary hover:text-primary"
          >
            Reset to default
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ThemeSidebar;
