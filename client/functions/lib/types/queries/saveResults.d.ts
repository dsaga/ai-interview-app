import * as admin from "firebase-admin";
import { TPostEvaluateAnswersResponse, TScoreEntity } from "shared";
export declare function saveResults(db: admin.firestore.Firestore, results: TScoreEntity): Promise<TPostEvaluateAnswersResponse>;
