export declare const generateQuestionsPrompt: (questionsNum: string, role: string, experienceLevel: string) => string;
export declare function sendAndProcessQuestions(db: FirebaseFirestore.Firestore, question: string): Promise<{
    questions: any;
    functionResponse?: undefined;
} | {
    questions: never[];
    functionResponse: null;
}>;
