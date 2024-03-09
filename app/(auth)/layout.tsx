import React from 'react';

interface AuthLayout extends React.PropsWithChildren {}

const AuthLayout: React.FC<AuthLayout> = ({ children }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500 to-sky-500">
      {children}
    </div>
  );
};

export default AuthLayout;
