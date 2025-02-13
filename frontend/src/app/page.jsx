import React from 'react';
import StandardButton from '@components/StandardButton';
import Link from 'next/link';
import chatConfig from '../../interfaceConfig';

const LogIn = () => {
    return (
        <div
            name="login"
            className="w-full h-full flex flex-col items-center justify-center bg-bg-100 dark:bg-tertiary-500 text-tertiary-500 dark:text-white px-6"
        >
            {/* Wrapper for all content */}
            <div className="flex flex-col items-center justify-center space-y-10 max-w-lg">
                {/* Welcome Message */}
                <div className="text-center space-y-4">
                    <p className="text-headerMedium md:text-headerLarge font-regular">
                        Welcome to the {chatConfig.header.title}
                    </p>
                    <p className="text-headerSmall md:text-headerMedium font-light">
                        Use your AAU-login to continue
                    </p>
                </div>

                {/* Log In Button */}
                <Link href="/chat" passHref>
                    <StandardButton label="Log In" />
                </Link>
            </div>
        </div>
    );
};

export default LogIn;