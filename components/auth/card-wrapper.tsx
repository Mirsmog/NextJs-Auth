import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { BackButton } from '@/components/auth/back-button';
import { Social } from './social';
import { Header } from './header';

interface CardWrapper extends React.PropsWithChildren {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper: React.FC<CardWrapper> = ({
  backButtonHref,
  backButtonLabel,
  headerLabel,
  children,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
