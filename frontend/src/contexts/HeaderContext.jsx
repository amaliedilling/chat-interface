"use client";

import React, { createContext, useContext, useState } from 'react';

// Create the Header Context
const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [showNewChatButton, setShowNewChatButton] = useState(false);
    const [handleNewChat, setHandleNewChat] = useState(null); // Add a state for new chat handler
    const [manageChatsHandler, setManageChatsHandler] = useState(null);

    return (
        <HeaderContext.Provider
            value={{
                showNewChatButton,
                setShowNewChatButton,
                handleNewChat,
                setHandleNewChat,
                manageChatsHandler,
                setManageChatsHandler
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

// Custom hook to use the Header context
export const useHeader = () => {
    return useContext(HeaderContext);
};
