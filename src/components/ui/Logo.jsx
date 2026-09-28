import { memo } from 'react';

const hexPath = 'M32 4 57 16.6v30.8L32 60 7 47.4V16.6L32 4Z';

export const BrandMark = memo(function BrandMark({
  size = 44,
  tone = 'gold',
  className = '',
  id = 'bpm',
}) {
  const isGold = tone === 'gold';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3bc56" />
          <stop offset="1" stopColor="#b87b08" />
        </linearGradient>
      </defs>
      <path d={hexPath} fill="none" stroke={`url(#${id}-g)`} strokeWidth="2.4" />
      <path
        d="M20 45V21.5h11.6c4.3 0 7 2.5 7 6.4 0 3.7-2.4 5.8-5.9 6.3L39.5 45h-5l-5.4-9H24.7V45H20Zm4-12.3H31c2.4 0 3.8-1.5 3.8-3.4s-1.4-3.3-3.7-3.3h-7v6.7Z"
        fill={isGold ? `url(#${id}-g)` : 'var(--clr-gold)'}
      />
    </svg>
  );
});

export default function Logo({
  logo,
  tone = 'light',
  size = 46,
  align = 'left',
  className = '',
  id = 'bp-logo',
}) {
  const show = logo && logo.image;
  const lockupName = (show && logo.name) || 'BHARAT PRIME';
  const lockupSub = (show && logo.sub) || 'ENTERPRISES';
  return (
    <span className={`logo ${tone === 'light' ? 'logo--light' : 'logo--dark'} ${align === 'center' ? 'logo--center' : ''} ${className}`.trim()}>
      <span className="logo__mark">
        {show ? (
          <img
            src={logo.image}
            alt="Bharat Prime Enterprises logo"
            loading="lazy"
            width={size}
            height={size}
          />
        ) : (
          <BrandMark size={size} tone={tone} id={id} />
        )}
      </span>
      <span className="logo__text">
        <span className="logo__name">{lockupName}</span>
        <span className="logo__sub">{lockupSub}</span>
      </span>
    </span>
  );
}