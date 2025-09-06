import {NextResponse} from 'next/server';

export const revalidate = 0;

function getSafeReturnPath(value: string | null, base: string): string {
  if (!value) return '/';
  try {

    const url = new URL(value, base);
    return url.pathname + (url.search || '') + (url.hash || '');
  } catch {
    return '/';
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const returnParam = url.searchParams.get('return');
  const returnPath = getSafeReturnPath(returnParam, url.origin);

  const redirectUrl = new URL(returnPath, url.origin);
  const res = NextResponse.redirect(redirectUrl);


  res.cookies.set('risk_ack', '1', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30 * 6 // ~6 months
  });

  return res;
}
