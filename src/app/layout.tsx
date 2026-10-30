import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://itihas-io.vercel.app'),
  title: {
    default: 'Itihas.io — Daily Indian History Timeline Challenge',
    template: '%s | Itihas.io',
  },
  description:
    'Test your knowledge of Indian history! Inscribe years and place 5 daily historical and cultural milestones on the timeline. Resets daily at midnight IST.',
  applicationName: 'Itihas.io',
  authors: [{ name: 'Siddharth Singh' }],
  keywords: [
    'Indian History Game',
    'Bharat Timeline',
    'Daily Trivia India',
    'Wordle for Indian History',
    'Chronicles of Bharat',
    'Indian History Quiz',
    'Itihas',
  ],
  creator: 'Itihas.io',
  publisher: 'Itihas.io',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://itihas-io.vercel.app',
    title: 'Itihas.io — Daily Indian History Timeline Challenge',
    description:
      'Can you place Indian history on the timeline? 5 daily historical and cultural milestones from ancient Bharat to modern cinema and space missions.',
    siteName: 'Itihas.io',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Itihas.io — Chronicles of Bharat Daily Challenge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itihas.io — Daily Indian History Timeline Challenge',
    description:
      'Inscribe years and place 5 daily historical milestones on the Indic timeline. New challenge every midnight IST.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents mobile Safari from zooming in on tap
  userScalable: false,
  themeColor: '#0a0d14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0d14] antialiased overflow-x-hidden selection:bg-amber-900 selection:text-amber-100">
        {children}
      </body>
    </html>
  );
}