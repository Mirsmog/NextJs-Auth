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
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icon/favicon-16x16.png"
      />
      <link rel="manifest" href="/icon/site.webmanifest"></link>
      <body className="w-full min-h-screen">{children}</body>
    </html>
  );
}
