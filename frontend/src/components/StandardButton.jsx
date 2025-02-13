import React from 'react';
import PropTypes from 'prop-types';

const StandardButton = ({ label, onClick, disabled }) => {
    return (
        <button
            name="standardbutton"
            onClick={onClick}
            disabled={disabled}
            className="bg-primary-500 text-white text-sm md:text-base font-light rounded-lg px-8 md:px-12 py-3 md:py-4 m-2 hover:scale-105 transition-all duration-200
                       disabled:bg-primary-300 disabled:cursor-not-allowed disabled:scale-100"
        >
            {label}
        </button>
    );
};

StandardButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

export default StandardButton;