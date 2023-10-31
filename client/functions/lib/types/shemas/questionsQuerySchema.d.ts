import * as Yup from "yup";
export declare const questionsQuerySchema: Yup.ObjectSchema<{
    role: string;
    experienceLevel: string;
    questionsNum: number;
}, Yup.AnyObject, {
    role: undefined;
    experienceLevel: undefined;
    questionsNum: undefined;
}, "">;
export type QuestionsQuerySchemaType = Yup.InferType<typeof questionsQuerySchema>;
