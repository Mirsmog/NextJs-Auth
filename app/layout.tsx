import React from 'react';
import './global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Test',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        type="image/svg"
        href="/icon/favicon.svg"
        sizes="512x512"
      />
      <link rel="manifest" href="/icon/site.webmanifest"></link>
      <body className="w-full min-h-screen">{children}</body>
    </html>
  );
}
