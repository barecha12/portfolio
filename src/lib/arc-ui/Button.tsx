// src/lib/arc-ui/Button.tsx
import React from 'react';
import { useArcTheme } from './theme';
import tokens from './tokens';
import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: {
    fontSize: 13,
    padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px`
  },
  md: {
    fontSize: 15,
    padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`
  },
  lg: {
    fontSize: 16,
    padding: `${tokens.spacing.md}px ${tokens.spacing.lg}px`
  }
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}) => {
  const { theme } = useArcTheme();

  const styles: React.CSSProperties = {
    fontFamily: tokens.font.body,
    borderRadius: tokens.radius.normal,
    border: 'none',
    cursor: rest.disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    ...sizeMap[size]
  };

  const themed = {
    primary: {
      background:
        theme === 'dark'
          ? `linear-gradient(135deg, ${tokens.color.text.accent}, ${tokens.color.text.accent2})`
          : `linear-gradient(135deg, ${tokens.color.text.accent}, ${tokens.color.text.accent2})`,
      color: theme === 'dark' ? '#041025' : '#fff'
    },
    ghost: {
      background: 'transparent',
      color: tokens.color.text.primary,
      border: `1px solid ${tokens.color.border}`
    },
    transparent: {
      background: 'transparent',
      color: tokens.color.text.muted
    }
  } as const;

  const chosen = themed[variant];

  return (
    <button
      {...rest}
      style={{ ...styles, ...chosen }}
      className={clsx('arc-btn', `arc-btn--${variant}`, `arc-btn--${size}`, className)}
      aria-pressed={rest['aria-pressed']}
    >
      {children}
    </button>
  );
};

export default Button;
