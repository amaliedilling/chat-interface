// layouts/Frame.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Frame = ({ children, showHeaderButtons, onNewChat }) => {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className=" h-svh w-full md:w-2/3 relative flex flex-col border shadow-xl rounded-xl items-center justify-center bg-bg-100 overflow-hidden">
                <Header showButtons={showHeaderButtons} onNewChat={onNewChat} />
                <div className='flex-1 w-full overflow-y-auto'>
                    {children}
                </div>
                {/* <Footer /> */}  
                
            </div>
        </div>
    );
};

export default Frame;
