import './globals.css';
import ApplyModal from '@/components/ApplyModal';
import Interactions from '@/components/Interactions';

export const metadata = {
  title: 'Legends - Private Investors Network',
  description: 'Hard-to-find deals, shared by investors. Co-investment. Additional capital. Private events. Membership by approval.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <ApplyModal />
        <Interactions />
      </body>
    </html>
  );
}
