import { SCHEMA, TQuestionEntityWithScore } from "shared";
import { apiAnswerQuestions } from "./api/apiAnswerQuestions";

export const generateAnswersPrompt = (answers: string[]) => {
  return [
    "Can you take the following list of questions and answers with the id at the start, and return the score for each question with the provided id? ",
    ...answers,
  ].join(" --- ");
};

export async function processAnswers(
  query: string
): Promise<{ questions: Array<TQuestionEntityWithScore> }> {
  try {
    const { function_call } = await apiAnswerQuestions(query.toString());

    if (function_call?.name && function_call.arguments) {
      const data = JSON.parse(function_call.arguments);

      const { questions } = (await SCHEMA.evaluatedAnswersSchema.validate(
        data
      )) as { questions: Array<TQuestionEntityWithScore> };

      return { questions };
    } else {
      throw new Error("No function call returned");
    }
  } catch (error) {
    return { questions: [] };
  }
}
