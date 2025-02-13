"use client";

import { useLayoutEffect, useState } from "react";

import clsx from "clsx";


const CommonTextArea = ({
  inputRef,
  isFocused,
  onChangeInput,
  handleKeyDown,
  textBoxValue,
  textAreaClassName,
  disabled,
}) => {
  const [scrollBar, setScrollBar] = useState(false);
  const maxHeight = 320;



// useLayoutEffect does nothing?? "Warning: useLayoutEffect does nothing on the server, 
// because its effect cannot be encoded into the server renderer's output format. 
// This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. 
// To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. 
// See https://reactjs.org/link/uselayouteffect-ssr for common fixes."
  useLayoutEffect(() => {
    const textArea = inputRef.current;

    if (textArea) {
      textArea.style.height = "0px";
      const scrollHeight = textArea.scrollHeight;
      textArea.style.height = Math.min(scrollHeight, maxHeight) + "px";
      setScrollBar(scrollHeight >= maxHeight);
    }
  }, [inputRef, textBoxValue]);

  return (
    <div className= {clsx({ "ask-question-input-focus": isFocused })}>
      <textarea
        ref={inputRef}
        className={clsx(
          "w-full max-h-80 h-40 lg:h-44 rounded-lg p-3 text-bodySmall md:text-bodyMedium lg:text-bodyLarge font-light bg-primary-50 focus:outline-primary-50 focus:bg-bg-50",
          textAreaClassName,
          "textarea_design",
          { "overflow-y-auto": scrollBar },
          "resize-none"
        )}
        value={textBoxValue}
        onKeyDown={handleKeyDown}
        onChange={onChangeInput}
        disabled={disabled}
      />
    </div>
  );
};

export default CommonTextArea;
