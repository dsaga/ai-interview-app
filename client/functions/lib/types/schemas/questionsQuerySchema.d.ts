import * as Yup from "yup";
export declare const questionsQuerySchema: Yup.ObjectSchema<{
    role: NonNullable<"QA" | "AI" | "FRONT_END_DEVELOPER" | "BACK_END_DEVELOPER" | "FULL_STACK_DEVELOPER" | "DEVOPS" | "TECHNICAL_ARCHITECT" | "TECHNICAL_LEAD" | "TECHNICAL_MANAGER" | "PRODUCT_MANAGER" | "PROJECT_MANAGER" | "SCRUM_MASTER" | "BUSINESS_ANALYST" | "DATA_SCIENCE" | "MACHINE_LEARNING" | "BLOCKCHAIN" | "CLOUD" | "CYBER_SECURITY" | "IT_SUPPORT" | "IT_INFRASTRUCTURE" | undefined>;
    experienceLevel: NonNullable<"JUNIOR" | "MEDIOR" | "SENIOR" | "STAFF" | "PRINCIPAL" | undefined>;
    questionsNum: number;
}, Yup.AnyObject, {
    role: undefined;
    experienceLevel: undefined;
    questionsNum: undefined;
}, "">;
export type QuestionsQuerySchemaType = Yup.InferType<typeof questionsQuerySchema>;
