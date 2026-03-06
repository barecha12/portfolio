import { SITE_META } from '../config/site';

const LAST_SUBMIT_AT_KEY = 'contact-last-submit-at';
const RATE_LIMIT_MS = 60_000;
const REQUEST_TIMEOUT_MS = 12_000;

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

type ContactSuccess = {
  ok: true;
  channel: 'endpoint' | 'mailto';
};

type ContactFailureReason = 'rate_limited' | 'config' | 'validation' | 'network' | 'server';

type ContactFailure = {
  ok: false;
  reason: ContactFailureReason;
  message: string;
  retryInMs?: number;
};

export type ContactResult = ContactSuccess | ContactFailure;

function getRemainingCooldown(): number {
  const previous = Number(localStorage.getItem(LAST_SUBMIT_AT_KEY) || 0);
  if (!Number.isFinite(previous) || previous <= 0) return 0;
  const elapsed = Date.now() - previous;
  return elapsed >= RATE_LIMIT_MS ? 0 : RATE_LIMIT_MS - elapsed;
}

function setSubmissionTimestamp() {
  localStorage.setItem(LAST_SUBMIT_AT_KEY, String(Date.now()));
}

function buildMailtoLink(payload: ContactPayload) {
  const subject = encodeURIComponent(`Portfolio Inquiry from ${payload.name}`);
  const body = encodeURIComponent(`${payload.message}\n\nFrom: ${payload.name}\nEmail: ${payload.email}`);
  return `mailto:${SITE_META.email}?subject=${subject}&body=${body}`;
}

function isWeb3FormsEndpoint(endpoint: string): boolean {
  try {
    return new URL(endpoint).hostname.includes('web3forms.com');
  } catch {
    return false;
  }
}

export async function submitContactForm(payload: ContactPayload): Promise<ContactResult> {
  if (payload.website?.trim()) {
    setSubmissionTimestamp();
    return { ok: true, channel: 'endpoint' };
  }

  if (payload.name.trim().length < 2 || payload.message.trim().length < 20) {
    return {
      ok: false,
      reason: 'validation',
      message: 'Please provide a valid name and a message with at least 20 characters.'
    };
  }

  const cooldown = getRemainingCooldown();
  if (cooldown > 0) {
    return {
      ok: false,
      reason: 'rate_limited',
      message: 'Please wait before sending another message.',
      retryInMs: cooldown
    };
  }

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
  const accessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY as string | undefined;
  const subject = (import.meta.env.VITE_CONTACT_SUBJECT as string | undefined) || 'Portfolio inquiry';

  if (!endpoint) {
    window.location.href = buildMailtoLink(payload);
    setSubmissionTimestamp();
    return { ok: true, channel: 'mailto' };
  }

  const requestPayload: Record<string, string> = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    message: payload.message.trim(),
    subject
  };

  if (accessKey) {
    requestPayload.access_key = accessKey;
  }

  if (isWeb3FormsEndpoint(endpoint) && !accessKey) {
    return {
      ok: false,
      reason: 'config',
      message: 'Missing VITE_CONTACT_ACCESS_KEY for Web3Forms endpoint.'
    };
  }

  const abortController = new AbortController();
  const timeout = window.setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(requestPayload),
      signal: abortController.signal
    });

    const rawBody = await response.text();
    let parsedBody: { success?: boolean; message?: string } | null = null;

    if (rawBody) {
      try {
        parsedBody = JSON.parse(rawBody) as { success?: boolean; message?: string };
      } catch {
        parsedBody = null;
      }
    }

    if (!response.ok || (parsedBody && parsedBody.success === false)) {
      return {
        ok: false,
        reason: 'server',
        message: parsedBody?.message || 'Unable to send message right now. Please try again.'
      };
    }

    setSubmissionTimestamp();
    return { ok: true, channel: 'endpoint' };
  } catch {
    return {
      ok: false,
      reason: 'network',
      message: 'Network error while sending your message. Please try again.'
    };
  } finally {
    window.clearTimeout(timeout);
  }
}
