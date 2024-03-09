import { auth, signOut } from '@/auth';
import React from 'react';
import { Button } from '@/components/ui/button';

interface SettingsPage {}

const SettingsPage: React.FC<SettingsPage> = async ({}) => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit" className="">
          Sign out
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
