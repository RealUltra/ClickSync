type IconProps = {
  className?: string;
};

export function IconSpark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.8 14 8l5.2 2-5.2 2-2 5.2-2-5.2-5.2-2L10 8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.3 12.1a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm6 0a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z"
        fill="currentColor"
      />
      <path
        d="M3.7 18.3c.2-2.4 2.4-4.2 5.6-4.2s5.4 1.8 5.6 4.2v.9H3.7Zm12.1.9c.1-1.8 1.6-3.2 4-3.2.2 0 .4 0 .5.1v3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m9.6 16.2-3.8-3.8-1.4 1.4 5.2 5.2L20 8.6l-1.4-1.4z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconEdit({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m4 16.9 4.1 3.1 11-11.1L15 4.8zM3 21l4.8-1.3L4.3 17zM16.1 3.7l4.2 4.2 1-1a1.6 1.6 0 0 0 0-2.3L19.5 2.8a1.6 1.6 0 0 0-2.3 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ width: "24px", height: "24px", display: "block" }}
    >
      <path d="M2 1.5v13l11.5-6.5z" fill="currentColor" />
    </svg>
  );
}
