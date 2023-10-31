/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// import { defineSecret } from "firebase-functions/params";

import { onCall, onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { makeQuestionsController } from "./controllers";

admin.initializeApp();

const db = admin.firestore();

const questionsController = makeQuestionsController(db);

export const callGenerateQuestions = onCall(async (data) => {
  return await questionsController.callGenerateQuestions(data.data);
});

export const generateQuestions = onRequest(async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    const result = await questionsController.callGenerateQuestions(
      request.query
    );
    response.status(200).send(result);
  } catch (e: any) {
    logger.info("No question provided", e, { structuredData: true });
    response.status(400).send({ error: "No question provided", e });
  }
});
