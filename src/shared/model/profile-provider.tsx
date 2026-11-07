"use client";

import { createContext, type ReactNode, useContext, useMemo, useSyncExternalStore } from "react";
import { type WorkoutProfile, parseStoredProfile, profileStorageEvent, profileStorageKey, saveStoredProfile } from "@/shared/lib/profile/profile-storage";

type ProfileContextValue = {
  profile: WorkoutProfile | null;
  ready: boolean;
  saveProfile: (profile: WorkoutProfile) => void;
};

const ProfileContext = createContext<ProfileContextValue>({ profile: null, ready: false, saveProfile: () => undefined });
const serverSnapshot = "__profile-loading__";

function subscribe(callback: () => void) {
  window.addEventListener(profileStorageEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(profileStorageEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(profileStorageKey) ?? "";
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
  const ready = snapshot !== serverSnapshot;
  const profile = useMemo(() => ready ? parseStoredProfile(snapshot) : null, [ready, snapshot]);

  const value = useMemo(() => ({
    profile,
    ready,
    saveProfile(nextProfile: WorkoutProfile) {
      saveStoredProfile(nextProfile);
    },
  }), [profile, ready]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  return useContext(ProfileContext);
}
