import { create } from "zustand";
import { TExperienceLevelKeys, TInterviewRoleKeys } from "shared";
import { TQuestionEntity } from "shared";

type Questions = Array<TQuestionEntity>;

type AnweredQuestion = {
  questionId: string;
  answer: string;
  timeTaken: number;
};

type Config = {
  role: Nullable<TInterviewRoleKeys>;
  experienceLevel: Nullable<TExperienceLevelKeys>;
  questionsNum: Nullable<number>;
  timeLimitPerQuestion: Nullable<number>;
  shuffle: boolean;
};

type User = {
  email: Nullable<string>;
};

type Error = {
  message: string;
  type: string;
};

type Store = {
  errors: Error[];
  user: User;
  questions: Questions;
  answered: AnweredQuestion[];
  config: Config;
  setErrors: (errors: Error[]) => void;
  setQuestions: (questions: Questions) => void;
  setAnswer: (questionId: string, answer: string, timeTaken: number) => void;
  setConfig: (config: Partial<Config>) => void;
  setUser: (user: User) => void;
  getFirstUnansweredQuestion: () => Nullable<TQuestionEntity>;
};

const useInterviewStore = create<Store>((set, get) => ({
  user: {
    email: null,
  },
  errors: [],
  config: {
    role: null,
    experienceLevel: null,
    questionsNum: null,
    timeLimitPerQuestion: null,
    shuffle: true,
  },
  questions: [],
  answered: [],
  // setErrors: (errors: Error[]) => set({ errors }),
  setQuestions: (questions: Questions) => set({ questions }),
  setErrors: (errors: Error[]) => {
    set({ errors });
    setTimeout(() => {
      set((state: Store) => {
        const filteredErrors = state.errors.filter(
          (error) => !errors.includes(error)
        );
        return { errors: filteredErrors };
      });
    }, 10000);
  },
  setAnswer: (questionId: string, answer: string, timeTaken: number) =>
    set((state: Store) => {
      const answeredQuestion = { questionId, answer, timeTaken };
      const answered = [...state.answered, answeredQuestion];
      return { answered };
    }),
  setConfig: (config: Partial<Config>) =>
    set((state: Store) => ({ config: { ...state.config, config } })),
  setUser: (user: User) => set({ ...user, user }),
  getFirstUnansweredQuestion: () => {
    const { questions, answered } = get();

    const answeredQuestionIds = new Set(answered.map((aq) => aq.questionId));

    const unansweredQuestions = questions.filter(
      (question) => !answeredQuestionIds.has(question.id)
    );

    return unansweredQuestions.length > 0 ? unansweredQuestions[0] : null;
  },
}));

export default useInterviewStore;
