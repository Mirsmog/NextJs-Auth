import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '../../lib/utils';

interface BackButton {
  label: string;
  href: string;
}

export const BackButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & BackButton
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn('font-normal w-full', className)}
    variant={'link'}
    size={'sm'}
    asChild
    {...props}
  >
    <Link href={props.href}>{props.label}</Link>
  </Button>
));
