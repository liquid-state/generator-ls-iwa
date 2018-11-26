import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';

import resources from './locales/index';

export default () => i18next
  .use(LngDetector)
  .init({
    detection: {
      order: ['querystring', 'navigator'],
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    ns: ['common'],
    defaultNS: 'common',
    resources,
  },
  // eslint-disable-next-line no-unused-vars
  (err, t) => {
    // If moment is in use we should
    // ensure moment is configured for the correct locale
    // moment.locale(i18next.language);
  });
