import React, { ReactNode, Suspense } from 'react';
import Header from './header';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

import './globals.css';

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en" className="h-full bg-gray-50">
			<body className="h-full">
				<Suspense>
					<Header session={session} />
				</Suspense>
				{children}
				{/* <Analytics /> */}
				{/* <Toast /> */}
			</body>
		</html>
	);
};

export default RootLayout;
