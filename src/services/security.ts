/**
 * Security and Authentication Utilities
 * Provides cryptographic hashing (SHA-256 with salt), secure session lifecycle,
 * brute-force rate-limiting, and cleanup of legacy plaintext storage.
 */

const PASSCODE_SALT = 'sophat_portfolio_secure_salt_2026_v2';
const SESSION_STORAGE_KEY = 'neo_admin_secure_session';
const RATE_LIMIT_KEY = 'neo_admin_rate_limit';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_LIFETIME_MS = 4 * 60 * 60 * 1000; // 4 hours

export interface AdminSession {
  token: string;
  expiresAt: number;
}

interface RateLimitData {
  attempts: number;
  lockedUntil: number | null;
}

/**
 * Computes a salted SHA-256 cryptographic hash of a candidate passcode.
 * Never stores or transmits plaintext passcodes.
 */
export const hashPasscode = async (passcode: string): Promise<string> => {
  const trimmed = passcode.trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(`${PASSCODE_SALT}::${trimmed}::${PASSCODE_SALT}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Remove legacy unencrypted passcodes from localStorage immediately.
 */
export const purgeInsecureStorage = (): void => {
  try {
    localStorage.removeItem('neo_admin_passcode');
    localStorage.removeItem('neo_admin_auth');
  } catch {
    // Ignore storage errors
  }
};

/**
 * Creates an expiring admin session in sessionStorage.
 */
export const createAdminSession = (): void => {
  const session: AdminSession = {
    token: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    expiresAt: Date.now() + SESSION_LIFETIME_MS,
  };
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    // Also save in localStorage for convenience if tab is refreshed, but with expiry check
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage errors
  }
};

/**
 * Validates whether the current admin session is valid and not expired.
 */
export const isSessionValid = (): boolean => {
  purgeInsecureStorage();

  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY) || localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return false;

    const session: AdminSession = JSON.parse(raw);
    if (!session || !session.token || !session.expiresAt) {
      clearAdminSession();
      return false;
    }

    if (Date.now() > session.expiresAt) {
      clearAdminSession();
      return false;
    }

    return true;
  } catch {
    clearAdminSession();
    return false;
  }
};

/**
 * Clears the admin session (logout).
 */
export const clearAdminSession = (): void => {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem('neo_admin_auth');
  } catch {
    // Ignore
  }
};

/**
 * Brute-force rate limiting: Checks if the user is currently locked out.
 */
export const checkRateLimit = (): { isLocked: boolean; remainingSeconds: number } => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { isLocked: false, remainingSeconds: 0 };

    const data: RateLimitData = JSON.parse(raw);
    if (data.lockedUntil && Date.now() < data.lockedUntil) {
      const remainingSeconds = Math.ceil((data.lockedUntil - Date.now()) / 1000);
      return { isLocked: true, remainingSeconds };
    }

    // Lockout expired, reset
    if (data.lockedUntil && Date.now() >= data.lockedUntil) {
      localStorage.removeItem(RATE_LIMIT_KEY);
    }

    return { isLocked: false, remainingSeconds: 0 };
  } catch {
    return { isLocked: false, remainingSeconds: 0 };
  }
};

/**
 * Records a failed passcode attempt. Locks out if attempts >= 5.
 */
export const recordFailedAttempt = (): { isLocked: boolean; remainingSeconds: number; attemptsLeft: number } => {
  try {
    let data: RateLimitData = { attempts: 0, lockedUntil: null };
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        // ignore
      }
    }

    data.attempts += 1;

    if (data.attempts >= MAX_FAILED_ATTEMPTS) {
      data.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
      return { isLocked: true, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000), attemptsLeft: 0 };
    }

    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
    return {
      isLocked: false,
      remainingSeconds: 0,
      attemptsLeft: MAX_FAILED_ATTEMPTS - data.attempts,
    };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: 3 };
  }
};

/**
 * Resets the rate limiter upon successful login.
 */
export const resetRateLimit = (): void => {
  try {
    localStorage.removeItem(RATE_LIMIT_KEY);
  } catch {
    // ignore
  }
};

