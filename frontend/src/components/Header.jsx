import React from 'react';
import whiteLogo from '../public/assets/AAU_HVID.png';
import Image from 'next/image';
import chatConfig from '../../interfaceConfig';
import IconButton from '@components/IconButton';
import { PlusIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import { useHeader } from '../contexts/HeaderContext';

const Header = () => {
    const { showNewChatButton, handleNewChat, manageChatsHandler} = useHeader(); // Access handleNewChat from the context

    return (
        <div name='header' className='w-full inset-x-0 top-0 h-30 md:h-34 bg-primary-500 text-white '>
            <div className='flex flex-row m-2 justify-between items-center py-4 md:py-6 lg:py-8'>
                {/* Left side button */}
                <div className='flex items-center px-4'>
                    {showNewChatButton && handleNewChat && (
                        <IconButton
                            icon={PlusIcon}
                            onClick={handleNewChat} // Use the handler from the context
                            ariaLabel="Start new chat"
                            bgColor="bg-transparent"
                            hoverBgColor="hover:bg-primary-50"
                            iconColor="text-white"
                            hoverIconColor="group-hover:text-primary-500"
                            iconClassname="h-6 w-6"
                        />
                    )}
                </div>

                {/* Center content */}
                <div className='flex flex-grow justify-center items-center'>
                    <div className='px-4 text-center'>
                        <p className='text-base md:text-xl lg:text-2xl font-semibold'>
                            {chatConfig.header.title}
                        </p>
                        <p className='text-sm md:text-base lg:text-lg font-light'>
                            {chatConfig.header.subtitle}
                        </p>
                    </div>
                    <div className='px-4'>
                        <Image src={whiteLogo} alt='AAU logo' height='60' />
                    </div>
                </div>

                {/* Right side button */}
                <div className='flex items-center px-4'>
                    {showNewChatButton && (
                        <IconButton
                            icon={RectangleStackIcon}
                            onClick={manageChatsHandler} // Update this if needed
                            ariaLabel="Manage chats"
                            bgColor="bg-transparent"
                            hoverBgColor="hover:bg-primary-50"
                            iconColor="text-white"
                            hoverIconColor="group-hover:text-primary-500"
                            iconClassname="h-6 w-6"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
