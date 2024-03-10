import { ErrorCard } from '@/components/auth/error-card';
import React from 'react';

interface AuthErrorPage {}

const AuthErrorPage: React.FC<AuthErrorPage> = ({}) => {
  return <ErrorCard />;
};

export default AuthErrorPage;
