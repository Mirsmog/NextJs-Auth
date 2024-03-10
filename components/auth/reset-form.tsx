'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ResetSchema } from '@/schemas';
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
import { reset } from '@/actions/reset';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface ResetForm {}

export const ResetForm: React.FC<ResetForm> = ({}) => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    shouldUnregister: false,
    defaultValues: {
      email: '',
    },
  });
  const emailError = Boolean(form.formState.errors.email);
  const [isPending, startTransition] = React.useTransition();

  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Recover your account"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-full flex items-center justify-between">
                    <div>Email</div>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="you@example.com"
                      type="email"
                      disabled={isPending}
                      autoComplete="email"
                      className={cn({
                        'focus-visible:ring-red-500 border-red-500': emailError,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
