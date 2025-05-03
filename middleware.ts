import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Define supported locales
const locales = ['me', 'en', 'sq', 'ru'];

// Get the preferred locale from request
function getLocale(request: NextRequest): string {
  // Get language preferences from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  
  if (acceptLanguage) {
    // Try to match browser preferences with our supported locales
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => {
        const langCode = lang.substring(0, 2).toLowerCase();
        return locales.some(locale => locale.startsWith(langCode));
      });
      
    if (preferredLocale) {
      const langCode = preferredLocale.substring(0, 2).toLowerCase();
      return locales.find(locale => locale.startsWith(langCode)) || 'en';
    }
  }
  
  // Default to English if no match
  return 'en';
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|public|img|logos).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};