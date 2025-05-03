import { Locale } from '@/types'
import 'server-only'
 
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  me: () => import('@/dictionaries/me.json').then((module) => module.default),
  sq: () => import('@/dictionaries/sq.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]()