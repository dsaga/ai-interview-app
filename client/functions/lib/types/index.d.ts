/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
export declare const callGenerateQuestions: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    id: string;
    questionText: string;
}[]>>;
export declare const generateQuestions: import("firebase-functions/v2/https").HttpsFunction;
