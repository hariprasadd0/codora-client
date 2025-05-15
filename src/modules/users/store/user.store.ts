import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for settings
type Preference = 'MORNING' | 'AFTERNOON' | 'NIGHT';
type SideBarPosition = 'left' | 'right';

interface SettingsState {
  preference: Preference;
  position: SideBarPosition;
  setPreference: (preference: Preference) => void;
  setPosition: (position: SideBarPosition) => void;
}


const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      preference: 'MORNING',
      position: 'left',
      setPreference: (preference) => set({ preference }),
      setPosition: (position) => set({ position }),
    }),
    { name: 'settings-storage' },
  ),
);


export { useSettingsStore };
