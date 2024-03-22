'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
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
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface LoginForm {}

export const LoginForm: React.FC<LoginForm> = ({}) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    shouldUnregister: false,
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const emailError = Boolean(form.formState.errors.email);
  const passError = Boolean(form.formState.errors.password);
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((e) => setError('Что-то пошло не так!'));
    });
  };
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonHref="/register"
      backButtonLabel="Don't have ann account yet?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-full flex items-center justify-between">
                      <div>Two factor code</div>
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123456"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                            'focus-visible:ring-red-500 border-red-500':
                              emailError,
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full flex items-center justify-between">
                        <div>Password</div>
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="••••••••••••"
                          type="password"
                          disabled={isPending}
                          autoComplete="new-password"
                          className={cn(
                            {
                              'focus-visible:ring-red-500 border-red-500 placeholder:text-red-500':
                                passError,
                            },
                            'placeholder:text-lg'
                          )}
                        />
                      </FormControl>
                      <Button
                        variant={'link'}
                        size={'sm'}
                        className="p-0 !mt-0 text-muted-foreground"
                      >
                        <Link className="p-0 m-0" href="/reset">
                          Forgot password?
                        </Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
