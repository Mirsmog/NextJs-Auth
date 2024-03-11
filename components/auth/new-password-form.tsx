'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { NewPasswordScheme } from '@/schemas';
import { CardWrapper } from './card-wrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { newPassword } from '@/actions/new-password';

interface NewPasswordForm {}

export const NewPasswordForm: React.FC<NewPasswordForm> = ({}) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const form = useForm<z.infer<typeof NewPasswordScheme>>({
    resolver: zodResolver(NewPasswordScheme),
    shouldUnregister: false,
    defaultValues: {
      newPassword: '',
    },
  });
  const [isPending, startTransition] = React.useTransition();

  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const onSubmit = (values: z.infer<typeof NewPasswordScheme>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  console.log(token);
  return (
    <CardWrapper
      headerLabel="Enter new password"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-full flex items-center justify-between">
                    <div>New password</div>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••••••••"
                      type="text"
                      disabled={isPending}
                      autoComplete="new-password"
                      className={cn('placeholder:text-lg')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            Change password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
