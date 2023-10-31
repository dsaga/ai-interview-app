import { GetQuestionsDto } from "../schemas";
export declare class QuestionsController {
    db: FirebaseFirestore.Firestore;
    constructor(db: FirebaseFirestore.Firestore);
    callGenerateQuestions(data: any): Promise<GetQuestionsDto>;
}
