import Button from '../components/Button.jsx';
import { cta } from '../data/config.js';

export default function CTA() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__panel" data-reveal>
          <div className="cta__glow" aria-hidden="true" />
          <h2 className="cta__title" id="cta-title">
            {cta.title}
          </h2>
          <p className="cta__text">{cta.text}</p>
          <Button href="#contact" icon="arrowRight">
            {cta.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
