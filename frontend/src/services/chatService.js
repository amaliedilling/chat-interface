// services/chatService.js
const API_BASE_URL = process.env.NEXT_PUBLIC_VLLM_API1_BASE_URL;

export const postChatCompletions = async (messages, userMessage, onStreamUpdate) => {
    try {
        const payload = {
            model: "meta-llama/Llama-3.2-3B-Instruct",
            messages: [
                ...messages,
                { role: "user", content: userMessage.content }
            ],
            max_tokens: 300,
            temperature: 0.7,
            n: 1,
            stream: true,
        };

        console.log("Payload being sent to API:", JSON.stringify(payload, null, 2));

        const response = await fetch(`${API_BASE_URL}/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let assistantMessageContent = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const dataStr = line.slice(5).trim();

                    // Skip "[DONE]" - do not parse it
                    if (dataStr === '[DONE]') {
                        continue;
                    }

                    try {
                        const data = JSON.parse(dataStr);
                        if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                            const deltaContent = data.choices[0].delta.content;
                            assistantMessageContent += deltaContent;

                            // Update the UI progressively
                            if (onStreamUpdate) {
                                onStreamUpdate(deltaContent);
                            }
                        }
                    } catch (err) {
                        console.error('Error parsing data chunk:', err);
                    }
                }
            }
        }

        return { assistantMessageContent };
    } catch (error) {
        console.error("Error fetching LLM response:", error);
        throw error;
    }
};
