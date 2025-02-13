import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const IconButton = ({ 
  icon: Icon, 
  onClick, 
  className = "", 
  bgColor = "bg-primary-50", 
  hoverBgColor = "hover:bg-primary-500",
  iconColor = "text-primary-500",
  hoverIconColor = "group-hover:text-primary-50", // Added group hover for icon
  ariaLabel, 
  disabled = false, 
  iconClassname = "",
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        'flex items-center justify-center rounded-lg h-11 w-11 lg:h-11 lg:w-11 transition duration-200',
        bgColor,
        hoverBgColor,
        className,
        'group',  // Added 'group' for managing group-hover
        {
          'cursor-not-allowed': disabled,
        }
      )}
      disabled={disabled}
    >
      <Icon
        className={clsx(
          "size-5 stroke-2 lg:size-6 transition duration-200",  // Ensure icon transitions smoothly
          iconColor,
          hoverIconColor,  // Apply hover styles using group-hover
          iconClassname
        )}
      />
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
  iconColor: PropTypes.string,
  hoverIconColor: PropTypes.string,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  iconClassname: PropTypes.string,
};

export default IconButton;
