/**
 * Contact form transport.
 * Choose a provider with VITE_CONTACT_PROVIDER = formspree | emailjs | custom.
 * With no provider configured the form does NOT pretend to send:
 * it opens the visitor's email app with the message pre-filled.
 */
import { personal } from '../data/config.js';

const env = import.meta.env;
const provider = (env.VITE_CONTACT_PROVIDER || '').trim().toLowerCase();

const configured = {
  formspree: () => !!env.VITE_FORMSPREE_ID,
  emailjs: () => !!(env.VITE_EMAILJS_SERVICE_ID && env.VITE_EMAILJS_TEMPLATE_ID && env.VITE_EMAILJS_PUBLIC_KEY),
  custom: () => !!env.VITE_CONTACT_ENDPOINT,
};

/** 'formspree' | 'emailjs' | 'custom' | 'mailto' */
export const contactMode = configured[provider]?.() ? provider : 'mailto';

async function postJson(url, body, headers = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res;
}

const senders = {
  formspree: (d) => postJson(`https://formspree.io/f/${env.VITE_FORMSPREE_ID}`, d),
  emailjs: (d) =>
    postJson('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: env.VITE_EMAILJS_SERVICE_ID,
      template_id: env.VITE_EMAILJS_TEMPLATE_ID,
      user_id: env.VITE_EMAILJS_PUBLIC_KEY,
      template_params: { from_name: d.name, reply_to: d.email, message: d.message },
    }),
  custom: (d) => postJson(env.VITE_CONTACT_ENDPOINT, d),
  mailto: (d) => {
    const subject = encodeURIComponent(`Portfolio contact from ${d.name}`);
    const body = encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    return Promise.resolve();
  },
};

/** Sends the message. Resolves on success, rejects with an Error otherwise. */
export function sendContactMessage(data) {
  return senders[contactMode](data);
}

/** Field validation — returns { field: message } for invalid fields. */
export function validateContact({ name = '', email = '', message = '' }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errors.email = 'Please enter a valid email address.';
  if (message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.';
  else if (message.length > 3000) errors.message = 'Please keep the message under 3000 characters.';
  return errors;
}
