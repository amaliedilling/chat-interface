// src/app/layout.js
"use client"; // Required for client-side logic like useContext, state, etc.'

import React from 'react';
import '../styles/global.css';
import Frame from '../layouts/Frame';
import { HeaderProvider } from '../contexts/HeaderContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-foreground">
        {/* Wrap your application with HeaderProvider */}
        <HeaderProvider>
          <Frame>
            {children}
          </Frame>
        </HeaderProvider>
      </body>
    </html>
  );
}
