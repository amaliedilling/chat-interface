import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import CommonTextArea from '../components/CommonTextArea';
import IconButton from '../components/IconButton';

const InputBar = ({ inputRef, input, setInput, handleSubmit, loading, disabled }) => {
  const onEnterPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !loading && !disabled) {
        handleSubmit();
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-around p-1">
      <div className="flex-1">
        <CommonTextArea
          inputRef={inputRef}
          isFocused={input.length > 0} 
          onChangeInput={(e) => setInput(e.target.value)}
          textBoxValue={input}
          handleKeyDown={onEnterPress} // Handle Enter key
          disabled={loading || disabled} // Use `disabled` prop to conditionally disable the input
          placeHolder="Type your message..."
        />
      </div>
      <div className="mb-1"> {/* add padding on this div for alignment?? */}
        <IconButton
          icon={PaperAirplaneIcon}
          onClick={handleSubmit}
          disabled={loading || input.trim() === '' || disabled} // Use `disabled` prop to conditionally disable the button
          ariaLabel="Send message"
          className="m-2"
          bgColor="bg-primary-50"
          iconClassname="-rotate-45 w-6 h-6"
        />
      </div>
    </div>
  );
};

export default InputBar;
