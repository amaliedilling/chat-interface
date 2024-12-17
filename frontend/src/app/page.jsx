import React from 'react'
import StandardButton from '@components/StandardButton';
import Link from 'next/link';
import chatConfig from '../../interfaceConfig';



const LogIn = () => {


    return (
        <div name='login' className=' w-full h-full flex flex-col items-center justify-center bg-bg-100 text-tertiary-500 '>

            <div className=' flex flex-col items-center justify-around space-y-8'>
                <div className='text-center font-light space-y-6'>
                    <p className='text-base'>Welcome to the {chatConfig.header.title}</p>
                    <p className='text-sm'>Use your AAU-login to continue</p>
                </div>
                <Link href="/chat" passHref>
                    <StandardButton label={"Log In"}/>
                </Link>
            </div>
        </div>
    )
}

export default LogIn