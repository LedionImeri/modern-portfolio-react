import { useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { contactMode, sendContactMessage, validateContact } from '../utils/contact.js';
import { trackEvent } from '../utils/analytics.js';

const EMPTY = { name: '', email: '', message: '', company: '' }; // `company` = honeypot

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  { name: 'message', label: 'Message', textarea: true, placeholder: 'Tell me about the opportunity or project…' },
];

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // idle | sending | success | error
  const formRef = useRef(null);
  const isMailto = contactMode === 'mailto';

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validateContact(next));
  };

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validateContact(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.company) return; // bot
    const errs = validateContact(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) {
      formRef.current?.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      setStatus({ state: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }
    setStatus({ state: 'sending', message: isMailto ? 'Opening your email app…' : 'Sending your message…' });
    try {
      await sendContactMessage({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() });
      trackEvent('contact_submit', { mode: contactMode });
      if (isMailto) {
        setStatus({
          state: 'success',
          message: 'Your email app should open with the message ready — just press send. If nothing opened, write to the address on the left.',
        });
      } else {
        setStatus({ state: 'success', message: 'Thank you! Your message has been sent — I’ll get back to you soon.' });
        setValues(EMPTY);
        setTouched({});
      }
    } catch {
      setStatus({ state: 'error', message: 'Something went wrong while sending. Please try again or email me directly.' });
    }
  };

  const showError = (name) => touched[name] && errors[name];

  return (
    <form ref={formRef} className="form card" onSubmit={onSubmit} noValidate data-reveal aria-describedby="form-note">
      {FIELDS.map((f) => {
        const id = `contact-${f.name}`;
        const err = showError(f.name);
        const common = {
          id,
          name: f.name,
          value: values[f.name],
          onChange,
          onBlur,
          required: true,
          placeholder: f.placeholder,
          'aria-invalid': err ? 'true' : 'false',
          'aria-describedby': err ? `${id}-error` : undefined,
          className: 'field__control',
        };
        return (
          <div className={`field ${err ? 'has-error' : ''} ${f.textarea ? 'field--full' : ''}`} key={f.name}>
            <label htmlFor={id} className="field__label">
              {f.label} <span aria-hidden="true">*</span>
            </label>
            {f.textarea ? (
              <textarea rows={5} maxLength={3000} {...common} />
            ) : (
              <input type={f.type} autoComplete={f.autoComplete} {...common} />
            )}
            {/* Space is always reserved so errors never shift the layout */}
            <p className="field__error" id={`${id}-error`}>
              {err && (
                <>
                  <Icon name="alert" size={14} /> {err}
                </>
              )}
            </p>
          </div>
        );
      })}

      {/* Honeypot — hidden from people and assistive tech */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
      </div>

      <div className="form__footer field--full">
        <p className="form__note" id="form-note">
          {isMailto
            ? 'Submitting opens your email app with this message pre-filled.'
            : 'Your details are used only to reply to your message.'}
        </p>
        <button type="submit" className="btn btn--primary" disabled={status.state === 'sending'}>
          <span className="btn__label">{status.state === 'sending' ? 'Sending…' : isMailto ? 'Send via Email' : 'Send Message'}</span>
          <Icon name="send" size={18} className="btn__icon btn__icon--end" />
        </button>
      </div>

      <p className={`form__status form__status--${status.state} field--full`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
