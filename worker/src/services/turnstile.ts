import type { TurnstileVerifyResponse } from '../types';

export async function verifyTurnstile(token: string, secretKey: string): Promise<boolean> {
  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  const outcome: TurnstileVerifyResponse = await result.json();
  return outcome.success;
}

export function verifyAccessCode(code: string, expectedCode: string): boolean {
  if (!expectedCode) return false;
  return code === expectedCode;
}