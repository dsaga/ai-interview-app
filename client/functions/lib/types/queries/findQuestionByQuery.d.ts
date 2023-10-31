import * as admin from "firebase-admin";
export declare function findQuestionByValue(db: admin.firestore.Firestore, value: string): Promise<FirebaseFirestore.QuerySnapshot>;
