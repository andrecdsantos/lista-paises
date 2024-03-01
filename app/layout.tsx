import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import Image from 'next/image';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Lista de países',
    description: 'Lista de países criada com Nextjs 14',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={nunitoSans.className}>
                <main className="bg-gray-100 min-h-screen flex flex-col items-center">
                    <nav className="w-full h-16 bg-white flex items-center justify-center">
                        <section className="container flex items-center gap-3 ">
                            <Image src="logo.svg" alt="logo da aplicação" width={48} height={48}/>
                            <h1 className="font-bold text-2xl">
                                Lista de países
                            </h1>
                        </section>
                    </nav>
                    {children}
                </main>
            </body>
        </html>
    );
}
