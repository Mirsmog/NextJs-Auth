'use client';
import React from 'react';
import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
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

interface LoginForm {}

export const LoginForm: React.FC<LoginForm> = ({}) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const emailError = Boolean(form.formState.errors.email);
  const passError = Boolean(form.formState.errors.password);
  const [isPending, startTransition] = React.useTransition();

  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
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
                      className={cn({
                        'focus-visible:ring-red-500 border-red-500': emailError,
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
                      className={cn(
                        {
                          'focus-visible:ring-red-500 border-red-500 placeholder:text-red-500':
                            passError,
                        },
                        'placeholder:text-lg'
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
