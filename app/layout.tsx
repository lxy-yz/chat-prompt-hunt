import React, { ReactNode, Suspense } from 'react';
import Header from './header';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

import './globals.css';

// export const metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s | ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: [
//     "Next.js",
//     "React",
//     "Tailwind CSS",
//     "Server Components",
//     "Radix UI",
//   ],
//   authors: [
//     {
//       name: "shadcn",
//       url: "https://shadcn.com",
//     },
//   ],
//   creator: "shadcn",
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteConfig.name,
//     description: siteConfig.description,
//     images: [`${siteConfig.url}/og.jpg`],
//     creator: "@shadcn",
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
//   manifest: `${siteConfig.url}/site.webmanifest`,
// }

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Header session={session} />
        </Suspense>
        <div className="lg:max-w-screen-xl mx-auto">{children}</div>
        {/* <Analytics /> */}
        {/* <Toast /> */}
      </body>
    </html>
  );
};

export default RootLayout;
