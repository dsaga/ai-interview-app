import * as Yup from "yup";
declare const questionsCollectionSchema: Yup.ArraySchema<{
    id: string;
    questionText: string;
}[], Yup.AnyObject, "", "">;
export declare const questionsSchema: Yup.ObjectSchema<{
    query: string;
    questions: {
        id: string;
        questionText: string;
    }[];
}, Yup.AnyObject, {
    query: undefined;
    questions: "";
}, "">;
export type QuestionsSchemaType = Yup.InferType<typeof questionsSchema>;
export type QuestionsCollectionSchemaType = Yup.InferType<typeof questionsCollectionSchema>;
export type GetQuestionsDto = QuestionsCollectionSchemaType;
export {};
