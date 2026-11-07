export type WorkoutProfile = {
  name: string;
  phone: string;
  birthDate: string;
  email?: string;
};

export const profileStorageKey = "workout-profile";
export const profileStorageEvent = "workout-profile-change";

export function parseStoredProfile(value: string | null): WorkoutProfile | null {
  try {
    if (!value) return null;
    const profile = JSON.parse(value) as Partial<WorkoutProfile>;
    return profile.name && profile.phone && profile.birthDate ? profile as WorkoutProfile : null;
  } catch {
    return null;
  }
}

export function saveStoredProfile(profile: WorkoutProfile) {
  window.localStorage.setItem(profileStorageKey, JSON.stringify(profile));
  window.dispatchEvent(new Event(profileStorageEvent));
}
