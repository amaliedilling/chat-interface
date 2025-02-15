import React from 'react';
import clsx from 'clsx';

const SidePanel = ({ isVisible, onClose, children }) => {
  return (
    <>
      {/* Background Overlay */}
      {isVisible && (
        <div 
          className="absolute inset-0 bg-bg-300 bg-opacity-70 z-40 transition-opacity duration-300" 
          onClick={onClose}
        />
      )}
      
      {/* Side Panel */}
      <div
        className={clsx(
          'absolute top-0 right-0 w-2/3 h-full bg-bg-100 z-50 shadow-lg transition-transform duration-300',
          isVisible ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Content inside the side panel */}
        <div className="p-2 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default SidePanel;
