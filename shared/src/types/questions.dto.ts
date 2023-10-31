import * as Yup from "yup";

import {
  getQuestionsSchema,
  questionEntitySchema,
  questionsQuerySchema,
} from "../schemas";

export type TQuestionEntity = Yup.InferType<typeof questionEntitySchema>;

export type TGetQuestions = Yup.InferType<typeof getQuestionsSchema>;

export type TGetQuestionsResponseDto = Array<TQuestionEntity>;

export type TQuestionsQuery = Yup.InferType<typeof questionsQuerySchema>;
