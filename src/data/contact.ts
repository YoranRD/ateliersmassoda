export const CONTACT_EMAIL = 'contact@ateliersmassoda.fr';

const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
const uuidPattern = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

if (accessKey && !uuidPattern.test(accessKey)) {
  throw new Error('PUBLIC_WEB3FORMS_ACCESS_KEY doit contenir la clé Web3Forms au format UUID.');
}

export const WEB3FORMS_ACCESS_KEY = accessKey || null;
