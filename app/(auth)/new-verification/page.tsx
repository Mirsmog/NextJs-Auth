import { NewVerificationForm } from '@/components/auth/new-verification-form';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface VerificationPage {}

const VerificationPage: React.FC<VerificationPage> = ({}) => {
  return <NewVerificationForm />;
};

export default VerificationPage;
