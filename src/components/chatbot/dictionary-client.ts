'use client';

export async function getClientDictionary(locale: 'en' | 'ar') {
  try {
    const dictionary = await import(`@/components/internationalization/${locale}.json`);
    return dictionary.default;
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error);
    const dictionary = await import('@/components/internationalization/ar.json');
    return dictionary.default;
  }
}
