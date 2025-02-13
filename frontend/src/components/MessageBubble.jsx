import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({ message, isUser }) => {
  return (
    <div
      className={clsx(
        'max-w-xs md:max-w-md lg:max-w-lg p-3 font-light text-black rounded-lg',
        {
          'self-end bg-primary-50': isUser, // Aligns user messages to the right
          'self-start bg-bg-100': !isUser // Aligns assistant messages to the left
        }
      )}
    >
      {isUser ? (
        <p className="text-bodySmall md:text-bodyMedium lg:text-bodyLarge whitespace-pre-wrap">{message}</p>
      ) : (
        <ReactMarkdown
          className="text-bodySmall md:text-bodyMedium lg:text-bodyLarge markdown-content" // Add a class to style markdown content
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {children}
              </a>
            ),
            p: ({ children }) => (
              <p className="mb-2">{children}</p> // Add margin-bottom for space between paragraphs
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside pl-4 mb-2">{children}</ul> // Use list classes for unordered lists
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside pl-4 mb-2">{children}</ol> // Use list classes for ordered lists
            ),
            li: ({ children }) => (
              <li className="mb-1">{children}</li> // Add spacing between list items
            ),
            strong: ({ children }) => (
              <strong className="font-bold">{children}</strong> // Make bold text visually distinct
            ),
            em: ({ children }) => (
              <em className="italic">{children}</em> // Make italic text visually distinct
            )
          }}
        >
          {message}
        </ReactMarkdown>
      )}
    </div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool
};

export default MessageBubble;
