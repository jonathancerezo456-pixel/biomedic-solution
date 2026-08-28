import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Biomedic Solution | Equipos médicos',
  description: 'Equipos médicos para consultorios, clínicas e instituciones de salud.',
  openGraph: { title: 'Biomedic Solution', description: 'Tecnología médica que inspira confianza clínica.', type: 'website', locale: 'es_CO' },
  twitter: { card: 'summary_large_image', title: 'Biomedic Solution', description: 'Tecnología médica que inspira confianza clínica.' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${geist.variable} antialiased`}>{children}</body></html>;
}
