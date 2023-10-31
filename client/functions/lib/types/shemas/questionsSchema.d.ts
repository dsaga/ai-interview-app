import * as Yup from "yup";
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
export type GetQuestionsDto = Array<QuestionsSchemaType>;
