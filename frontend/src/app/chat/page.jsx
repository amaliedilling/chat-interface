"use client";

import React, { useRef, useState, useEffect } from 'react';
import InputBar from '@components/InputBar';
import MessageBubble from '@components/MessageBubble';
import { postChatCompletions } from '@services/chatService';
import Footer from '@components/Footer';
import LoadDots from '@components/LoadDots';
import EvaluationMode from '@components/EvaluationMode';
import chatConfig from '../../../interfaceConfig';
import { useHeader } from '../../contexts/HeaderContext';
import SidePanel from '@components/SidePanel';
import ChatHistory from '@components/ChatHistory';
import clsx from 'clsx';



const ChatPage = () => {
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState("");
    const [chatElements, SetChatElements] = useState([]);
    const [isLoadingResponse, setIsLoadingResponse] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [streamingDone, setStreamingDone] = useState(false);
    const [evalComplete, setEvalComplete] = useState(true);
    const { setShowNewChatButton, setHandleNewChat, setManageChatsHandler } = useHeader(); // Access header context
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [evaluationCompletion, setEvaluationCompletion] = useState({});



    const assistantStreamingResponseRef = useRef("");
    const [assistantStreamingResponse, setAssistantStreamingResponse] = useState("");

    const chatHistory = [
        { title: "Feedback on Lorem Ipsum", timestamp: "2024-09-29T12:45:00" },
        { title: "Another chat", timestamp: "2024-09-27T13:07:00" },
        { title: "More example text", timestamp: "2024-09-22T09:58:00" },
        { title: "Old Chat Example", timestamp: "2022-12-15T15:20:00" },
        { title: "Meeting Notes", timestamp: "2023-08-14T11:32:00" },
        { title: "Project Discussion", timestamp: "2023-07-10T10:00:00" },
        { title: "Research Feedback", timestamp: "2023-06-05T14:23:00" },
        { title: "Brainstorming Session", timestamp: "2023-05-20T16:45:00" },
        { title: "Team Sync", timestamp: "2022-11-11T13:15:00" },
        { title: "Client Feedback", timestamp: "2022-10-08T09:00:00" },
    ];

    const lastSubmitTime = useRef(0);

    useEffect(() => {
        if (chatConfig.evaluationRequired && areAllEvaluationsComplete()) {
            setErrorMessage(""); // Clear the error message dynamically
        }
    }, [evaluationCompletion]);


    // Set header context to show "New Chat" button
    useEffect(() => {
        setShowNewChatButton(true);
        setHandleNewChat(() => handleNewChat); // Set handleNewChat in the context

        // Setting a handler for the "Manage Chats" button to toggle panel
        setManageChatsHandler(() => () => setIsPanelVisible((prev) => !prev)); // Toggle side panel on clicking Manage Chats

        return () => {
            setShowNewChatButton(false); // Hide button when leaving the page
            setHandleNewChat(null);      // Clear the handler when leaving the page
            setManageChatsHandler(null); // Clear the manage chats handler
        };
    }, [setShowNewChatButton, setHandleNewChat, setManageChatsHandler]);

    // Focus on the input field when the component mounts
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Scroll to the bottom when new messages are added or response content changes
    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);  // Adding a slight delay to let DOM updates complete
    };

    useEffect(() => {
        if (isLoadingResponse) {
            scrollToBottom();
        }
    }, [assistantStreamingResponse, chatElements]);

    const handleEvaluationChange = (evaluationName, value) => {
        setEvaluationCompletion((prev) => ({
            ...prev,
            [evaluationName]: value, // Update the value for the specific evaluation
        }));
    };


    const areAllEvaluationsComplete = () => {
        // Ensure evaluations exist before checking completion
        if (!chatElements.some((el) => el.type === 'evaluation_block')) {
            return true; // Skip evaluation check if no evaluation block exists
        }

        // Check if all evaluations have valid (non-null) values
        return chatConfig.evaluationModes.every(
            (evaluation) =>
                evaluationCompletion[evaluation.name] !== null &&
                evaluationCompletion[evaluation.name] !== undefined
        );
    };

    // New handler to reset chat elements
    const handleNewChat = () => {
        SetChatElements([]);
        setInput("");
        setAssistantStreamingResponse(""); // Clear any streaming response
        setErrorMessage(""); // Clear any errors
        setStreamingDone(false);
    };

    const handleSubmit = async () => {
        if (chatConfig.evaluationRequired && !areAllEvaluationsComplete()) {
            setErrorMessage("Please complete all evaluations before proceeding.");
            return; // Stop submission until evaluations are complete
        }

        setErrorMessage(""); // Clear the error message when valid


        const now = Date.now();
        if (isLoadingResponse || !input.trim() || now - lastSubmitTime.current < 300) return; // Add debounce
        lastSubmitTime.current = now; // Update last submit time

        const userMessage = { content: input, isUser: true, type: 'message' };
        SetChatElements(prev => [...prev, userMessage]);
        setInput("");
        assistantStreamingResponseRef.current = ""; // Clear the streaming response content ref
        setAssistantStreamingResponse("");          // Clear the response state as well
        setErrorMessage("");                        // Clear any previous error messages
        setIsLoadingResponse(true);
        setStreamingDone(false);

        try {
            // Convert messages to the expected format with 'role' and 'content'
            const formattedMessages = chatElements.map((message) => {
                return {
                    role: message.isUser ? "user" : "assistant",
                    content: message.content,
                };
            });

            // Pass formatted messages to the API call
            await postChatCompletions(
                formattedMessages,
                userMessage,
                (deltaContent) => {
                    // Update the accumulated content in the ref
                    assistantStreamingResponseRef.current += deltaContent;

                    // Set the response state to trigger re-render less frequently
                    setAssistantStreamingResponse(prev => prev + deltaContent);

                    // Scroll to the bottom to follow the streamed response
                    scrollToBottom();
                }
            );

        } catch (error) {
            console.error("Error fetching LLM response:", error);
            setErrorMessage("An error occurred while fetching the response. Please try again.");  // Set error message
        } finally {
            setIsLoadingResponse(false);
            // After streaming ends, add the assistant message to the state
            if (assistantStreamingResponseRef.current) {
                const assistantFinalMessage = {
                    content: assistantStreamingResponseRef.current,
                    isUser: false,
                    type: 'message', // Identifies this as a message element
                };
                SetChatElements((prev) => [...prev, assistantFinalMessage]);

                // Create an evaluation block
                const evaluationBlock = {
                    type: 'evaluation_block',
                    evaluations: chatConfig.evaluationModes.map((evalMode) => ({
                        name: evalMode.name,
                        evaluationType: evalMode.type,
                    })),
                };

                SetChatElements((prev) => [...prev, evaluationBlock]);
                // Reset evaluation state for the next block
            setEvaluationCompletion({});

                setStreamingDone(true);
            }
        }

    };

    const updateEvaluation = (name, value) => {
        setEvaluationCompletion((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="relative w-full h-full">
            {/* Main Content Wrapper with SidePanel */}
            <div className="relative w-full h-full flex">
                {/* Main Content Area with Conditional Blur */}
                <div
                    className={clsx(
                        "w-full h-full flex flex-col items-center transition-all duration-300",
                        isPanelVisible ? "" : ""
                    )}
                >
                    {/* Messages Section */}
                    {chatElements.length > 0 && (
                        <div className="w-full flex-1 flex flex-col items-start p-4 space-y-2 bg-bg-100 overflow-y-auto relative">
                            <div className="flex-grow"></div>
                            {chatElements.map((element, index) => {
                                if (element.type === 'message') {
                                    return (
                                        <MessageBubble key={index} message={element.content} isUser={element.isUser} />
                                    );
                                } else if (element.type === 'evaluation_block') {
                                    return (
                                        <div key={index} className="flex flex-row space-x-2 p-2 items-center">
                                            {element.evaluations.map((evaluation, i) => (
                                                <EvaluationMode
                                                    key={i}
                                                    evaluationName={evaluation.name}
                                                    evaluationType={evaluation.evaluationType}
                                                    onChange={updateEvaluation}
                                                />
                                            ))}
                                        </div>
                                    );
                                }
                            })}

                            {/* Display the streaming response while it's loading */}
                            {isLoadingResponse && assistantStreamingResponse && (
                                <MessageBubble message={assistantStreamingResponse} isUser={false} />
                            )}

                            {/* Display the loading dots while the response is being streamed */}
                            {isLoadingResponse && (
                                <div className="p-2">
                                    <LoadDots />
                                </div>
                            )}


                            {/* Dummy div to ensure smooth scroll to the last message */}

                            <div ref={messagesEndRef}></div>
                        </div>
                    )}

                    {/* Display error message if there's an error */}
                    {errorMessage && (
                        <div className="w-full p-4 text-xs text-red-500 text-center">
                            {errorMessage}
                        </div>
                    )}

                    {/* Placeholder Text */}
                    {chatElements.length === 0 && (
                        <div className="flex-1 w-2/3 flex flex-col items-center justify-center text-center text-tertiary-500 p-4">
                            <p className="text-sm ">How can I help?</p>
                            <p className="text-sm font-light mt-4">Start the chat by sending a message or uploading a file for me to review.</p>
                        </div>
                    )}

                    <div className='w-full px-2'>
                        <InputBar
                            inputRef={inputRef}
                            input={input}
                            setInput={setInput}
                            handleSubmit={handleSubmit}
                            loading={isLoadingResponse}

                        />
                    </div>
                    < Footer />
                </div>

                {/* Side Panel */}
                <SidePanel isVisible={isPanelVisible} onClose={() => setIsPanelVisible(false)}>
                    <h2 className="text-base font-medium my-2 text-center text-primary-500">CHAT HISTORY</h2>
                    <ChatHistory chatHistory={chatHistory} />
                </SidePanel>


            </div>

        </div>
    );
};

export default ChatPage;