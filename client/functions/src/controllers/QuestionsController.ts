import { findQuestionByValue } from "../queries/findQuestionByQuery";
import { generateQuestionsPrompt, sendAndProcessQuestions } from "../questions";
import { SCHEMA, TGetQuestionsResponseDto } from "shared";

export class QuestionsController {
  db: FirebaseFirestore.Firestore;
  constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  async callGenerateQuestions(data: any): Promise<TGetQuestionsResponseDto> {
    const { role, experienceLevel, questionsNum } =
      await SCHEMA.questionsQuerySchema
      .validate(data);

    const question = generateQuestionsPrompt(
      questionsNum.toString(),
      role,
      experienceLevel
    );

    const existingQuestion = await findQuestionByValue(this.db, question);

    if (!existingQuestion.empty) {
      const [existingQuestionData] = existingQuestion.docs;

      return existingQuestionData.data().questions;
    }

    const processedQuestions = await sendAndProcessQuestions(this.db, question);

    return processedQuestions.questions as TGetQuestionsResponseDto;
  }
}
