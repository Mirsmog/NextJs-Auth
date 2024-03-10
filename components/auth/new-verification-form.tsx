'use client';
import React from 'react';
import { CardWrapper } from './card-wrapper';
import { PulseLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '../form-success';
import { FormError } from '../form-error';

interface NewVerificationForm {}

export const NewVerificationForm: React.FC<NewVerificationForm> = ({}) => {
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const onSubmit = React.useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError('Token is missing');
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => setError('Something went wrong!'));
  }, [token, success, error]);
  React.useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex flex-col items-center w-full justify-center">
        {success || error ? null : (
          <PulseLoader color="#3454D1" speedMultiplier={0.8} />
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
