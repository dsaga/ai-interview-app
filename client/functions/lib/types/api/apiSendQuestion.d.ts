import OpenAi from "openai";
export declare function apisendQuestion(question: string): Promise<{
    message: string | null;
    function_call: OpenAi.Chat.Completions.ChatCompletionMessage.FunctionCall | undefined;
    role: OpenAi.Chat.Completions.ChatCompletionRole;
}>;
