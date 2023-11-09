import * as admin from "firebase-admin";
export declare function findResultById(db: admin.firestore.Firestore, id: string): Promise<admin.firestore.DocumentData | undefined>;
