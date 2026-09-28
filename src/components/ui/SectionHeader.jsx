import Reveal from './Reveal';

export default function SectionHeader({ eyebrow, title, subheading, icon, center = false }) {
  return (
    <Reveal variant="clip" className={`section-header ${center ? 'section-header--center' : ''}`.trim()}>
      {eyebrow ? <span className={`eyebrow ${center ? 'eyebrow--center' : ''}`.trim()}>{eyebrow}</span> : null}
      {title ? <h2 className="section-header__title">{title}</h2> : null}
      {subheading ? <p className="section-header__sub">{subheading}</p> : null}
    </Reveal>
  );
}