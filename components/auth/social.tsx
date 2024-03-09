'use client';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';

interface Social {}

export const Social: React.FC<Social> = ({}) => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        variant={'outline'}
        size={'lg'}
        className="w-full"
        onClick={() => console.log('cli')}
      >
        <FcGoogle className={'w-5 h-5'} />
      </Button>
      <Button
        variant={'outline'}
        size={'lg'}
        className="w-full"
        onClick={() => console.log('cli')}
      >
        <FaGithub className={'w-5 h-5'} />
      </Button>
    </div>
  );
};
