import { TQuestionEntityWithScore } from "shared";
export declare const generateAnswersPrompt: (answers: string[]) => string;
export declare function processAnswers(query: string): Promise<{
    questions: Array<TQuestionEntityWithScore>;
}>;
