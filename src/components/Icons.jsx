const base = { className: 'icon', width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const IconSpeaker = () => (
  <svg {...base}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="M15.5 9c1.2 1.6 1.2 4.4 0 6M18.5 6.5c2.4 3 2.4 8 0 11" />
  </svg>
);

export const IconStar = ({ filled }) => (
  <svg {...base} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z" />
  </svg>
);

export const IconDownload = () => (
  <svg {...base}>
    <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5" />
    <path d="M5 19.5h14" />
  </svg>
);

export const IconShare = () => (
  <svg {...base}>
    <path d="M12 15V4M8 7.5L12 3.5l4 4" />
    <path d="M7 11H5.5v9h13v-9H17" />
  </svg>
);

export const IconSun = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
  </svg>
);

export const IconCards = () => (
  <svg {...base}>
    <rect x="4" y="6.5" width="11" height="14" rx="1.2" />
    <path d="M8.5 3.5h9.3c.7 0 1.2.5 1.2 1.2v12.3" />
  </svg>
);

export const IconBook = () => (
  <svg {...base}>
    <path d="M12 6.5C10 5 7 4.5 3.5 5v13.5C7 18 10 18.5 12 20c2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" />
    <path d="M12 6.5V20" />
  </svg>
);

export const IconSearch = () => (
  <svg {...base}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="M15 15l5 5" />
  </svg>
);

export const IconFlame = () => (
  <svg {...base} width={15} height={15}>
    <path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.4 2.6-5 3.4-8.4 2.2 1.4 3 3.4 3 5.2.9-.6 1.6-1.8 1.7-3.2 2.2 1.8 3.9 4.2 3.9 6.6C18 18.6 15.6 21 12 21z" />
  </svg>
);

export const IconArrow = () => (
  <svg {...base} width={16} height={16}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconBack = () => (
  <svg {...base} width={16} height={16}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconSound = ({ off }) => (
  <svg {...base} width={16} height={16}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    {off ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M15.5 9c1.2 1.6 1.2 4.4 0 6M18.5 6.5c2.4 3 2.4 8 0 11" />}
  </svg>
);

export const IconQuill = () => (
  <svg {...base}>
    <path d="M20 4c-6.5.6-11 4.6-12.6 11.4L6 20" />
    <path d="M20 4c-.3 5.8-3.4 9.8-9.6 11.2" />
    <path d="M9.6 11.6c2.2-.4 4.3-.2 6.2.6" />
  </svg>
);

export const IconShuffle = () => (
  <svg {...base} width={16} height={16}>
    <path d="M3 7h3.5c4.5 0 6.5 10 11 10H21M3 17h3.5c1.6 0 2.8-1.2 3.8-2.8M13.7 9.8C14.7 8.2 15.9 7 17.5 7H21" />
    <path d="M18.5 4.5L21 7l-2.5 2.5M18.5 14.5L21 17l-2.5 2.5" />
  </svg>
);

export const IconChevron = ({ dir = 'right' }) => (
  <svg {...base} width={18} height={18}>
    <path d={dir === 'right' ? 'M9.5 5.5l6.5 6.5-6.5 6.5' : 'M14.5 5.5L8 12l6.5 6.5'} />
  </svg>
);
