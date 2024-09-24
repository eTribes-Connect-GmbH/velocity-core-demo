import { IntlShape, createIntl } from '@formatjs/intl';
import { FastifyRequest } from 'fastify';
import { flatten } from 'flat';
import { useRequest } from '~/context';
import * as de from './de.json';
import * as en from './en.json';
import { defaultRichTextElements, getRichTextElementRenderer } from './richTextElements';

export const availableLocales = ['en', 'de'] as const;

export type Locale = (typeof availableLocales)[number];

export type LocaleAlternates = Record<Locale, string>;

export type Money = { centAmount: number; currencyCode: string };

export const getRequestedLocale = (request: FastifyRequest): Locale => {
  const requestedLocale = request.headers['accept-language']?.substring(0, 2) ?? 'en';
  return (
    (availableLocales as unknown as (string | undefined)[]).includes(requestedLocale) ? requestedLocale : 'en'
  ) as Locale;
};

export const getLocaleAlternates = (request: FastifyRequest) => {
  const { pathname } = new URL(request.url, `${request.protocol}://${request.hostname}`);
  return Object.fromEntries(
    availableLocales.map(eachLocale => [eachLocale, `/${eachLocale}${pathname.substring(3)}`])
  ) as LocaleAlternates;
};

const messages: Record<Locale, Record<string, any>> = { en, de };

type I18n = {
  locale: Locale;
  addLocalePrefix: (path: string) => string;
  t: (
    id: string,
    values?: Record<string, string | number | boolean | Date | ((chunk: string) => JSX.Element)>
  ) => string;
  formatMoney: (money: Money) => string;
} & Omit<IntlShape, 'locale' | 'formatMessage' | '$t'>;

const createI18n = (locale: Locale): I18n => {
  const {
    formatMessage,
    $t,
    locale: _locale,
    ...intl
  } = createIntl({
    locale,
    messages: flatten(messages[locale]),
    defaultRichTextElements,
    onWarn: false as any
  });
  return {
    ...intl,
    locale,
    addLocalePrefix: (path: string) => `/${locale}${path === '/' ? '' : path}`,
    t: (id, values) =>
      formatMessage(
        { id },
        values &&
          Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
              key,
              typeof value === 'function' ? (getRichTextElementRenderer(value) as any) : value
            ])
          )
      ),
    formatMoney: money => intl.formatNumber(money.centAmount / 100, { style: 'currency', currency: money.currencyCode })
  };
};

const i18ns = Object.fromEntries(availableLocales.map(locale => [locale, createI18n(locale)])) as Record<Locale, I18n>;

const useI18n = () => {
  const request = useRequest<{ Params: { locale?: Locale } }>();
  return i18ns[request.params.locale ?? getRequestedLocale(request)];
};

export default useI18n;
