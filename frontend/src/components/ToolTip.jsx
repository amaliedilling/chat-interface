"use client";

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Tooltip = ({ content, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block">
            {/* The element the tooltip is attached to */}
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className="cursor-help"
            >
                {children}
            </div>

            {/* The tooltip itself */}
            {isVisible && (
                <div className={clsx(
                    'absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2',
                    'bg-primary-50 text-black text-xs font-light py-1 px-2 rounded shadow-lg w-fit whitespace-normal text-wrap'
                )}>
                    {content}
                </div>
            )}
        </div>
    );
};

Tooltip.propTypes = {
    content: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Tooltip;