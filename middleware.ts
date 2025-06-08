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
  return 'me';
}
const pageMaper = (currentPage:string, currentLocale:string)=>{
  if(currentPage === 'about-us' || currentPage === 'o-nas' || currentPage === 'o-nama' || currentPage === 'rreth-nesh'){
    return currentLocale === 'en' ? 'about-us' : currentLocale === 'me' ? 'o-nama' : currentLocale === 'sq' ? 'rreth-nesh' : 'o-nas'
  }
  if(currentPage === 'products' || currentPage === 'produkty' || currentPage === 'proizvodi' || currentPage === 'produktet'){
    return currentLocale === 'en' ? 'products' : currentLocale === 'me' ? 'proizvodi' : currentLocale === 'sq' ? 'produktet' : 'produkty'
  }
  if(currentPage === 'partners' || currentPage === 'partnery' || currentPage === 'partneri' || currentPage === 'partneret'){
    return currentLocale === 'en' ? 'partners' : currentLocale === 'me' ? 'partneri' : currentLocale === 'sq' ? 'partneret' : 'partnery'
  }
  if(currentPage === 'contacts' || currentPage === 'kontakty' || currentPage === 'kontakti' || currentPage === 'kontaktet'){
    return currentLocale === 'en' ? 'contacts' : currentLocale === 'me' ? 'kontakti' : currentLocale === 'sq' ? 'kontaktet' : 'kontakty'
  }
  if(currentPage === 'contact' || currentPage === 'kontakt' || currentPage === 'kontakt' || currentPage === 'kontakt'){
    return currentLocale === 'en' ? 'contact' : currentLocale === 'me' ? 'kontakt' : currentLocale === 'sq' ? 'kontakt' : 'kontakt'
  }
  
}
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale){
    //If the user is on a page variation go to the appropriate page
    const pathParts = pathname.split('/');
    console.log(pathParts, 'PARTS')
    const lang = pathParts[1];
    // const lang = 'me'
    const page = pathParts[2];
    const singleProduct = pathParts[3];

    const mappedPage = pageMaper(page, lang);
    if(mappedPage && mappedPage !== page){
      request.nextUrl.pathname = `/${lang}${page ? `/${mappedPage}` : ''}` + (singleProduct ? `/${singleProduct}` : '');
      return NextResponse.redirect(request.nextUrl);
    }
    return NextResponse.next();
  };

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|public|img|logos|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};