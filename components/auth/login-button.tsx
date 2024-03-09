'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LoginButton extends React.PropsWithChildren {
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton: React.FC<LoginButton> = ({
  children,
  mode = 'redirect',
  asChild,
}) => {
  const router = useRouter();
  const onClick = () => {
    router.push('/login');
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
