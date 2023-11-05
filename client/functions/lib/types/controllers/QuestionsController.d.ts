import { TGetQuestionsResponse, TPostEvaluateAnswersResponse, TScoreEntity } from "shared";
export declare class QuestionsController {
    db: FirebaseFirestore.Firestore;
    constructor(db: FirebaseFirestore.Firestore);
    callGetResults(data: any): Promise<TScoreEntity | null>;
    callEvaluateAnswers(data: any): Promise<TPostEvaluateAnswersResponse>;
    callGenerateQuestions(data: any): Promise<TGetQuestionsResponse>;
}
