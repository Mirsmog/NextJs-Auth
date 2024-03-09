import React from 'react';
import { Poppins } from 'next/font/google';
import { Button } from '../components/ui/button';
import { LoginButton } from '../components/auth/login-button';
import { cn } from '@/lib/utils';
const font = Poppins({ weight: ['600'], subsets: ['latin'] });

interface Home {}

const Home: React.FC<Home> = ({}) => {
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500 to-sky-500">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant={'secondary'} size={'lg'}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default Home;
