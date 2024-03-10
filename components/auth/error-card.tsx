import React from 'react';
import { Card, CardFooter, CardHeader } from '../ui/card';
import { Header } from './header';
import { BackButton } from './back-button';

interface ErrorCard {}

export const ErrorCard: React.FC<ErrorCard> = ({}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops something went wrong" />
        <p className="text-center text-[128px]">🤯</p>
        <CardFooter className="flex flex-col ">
          <BackButton
            href="/login"
            label="Back to login"
            className="relative w-full h-full z-10 after:absolute  after:top-[calc(50% - 5px)] after:z-1 after:left-0 after:w-1/3 after:h-[1px] after:border-t before:absolute before:top-[calc(50% - 5px)] before:z-0 before:right-0 before:w-1/3 before:h-[1px] before:border-t pt-2"
          />
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
