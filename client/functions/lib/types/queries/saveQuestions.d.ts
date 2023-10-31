import * as admin from "firebase-admin";
export declare function saveQuestions(db: admin.firestore.Firestore, questions: Array<{
    question: string;
    id: string;
}>, query: string): Promise<unknown>;
