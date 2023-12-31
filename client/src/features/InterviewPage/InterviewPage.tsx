import { ButtonPrimary } from "@/components/ButtonPrimary";
import InputField from "@/components/InputField";
import Loader from "@/components/Loader";
import { PageHeadline } from "@/components/PageHeadline";
import { Timer, TimerRef } from "@/components/Timer";
import { useFirebase } from "@/providers/FirebaseProvider";
import useInterviewStore from "@/store/useInterviewStore";
import { httpsCallable } from "firebase/functions";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TPostEvaluateAnswers, TPostEvaluateAnswersResponse } from "shared";

export function InterviewPage() {
  const navigate = useNavigate();
  const timerRef = useRef<TimerRef | null>(null);
  const [myAnswer, setMyAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { functions } = useFirebase();

  const sendAnswers = httpsCallable<
    TPostEvaluateAnswers,
    TPostEvaluateAnswersResponse
  >(functions, "callEvaluateAnswers");

  const getFirstUnansweredQuestion = useInterviewStore(
    (store) => store.getFirstUnansweredQuestion
  );

  const answered = useInterviewStore((store) => store.answered);

  const unansweredQuestion = useMemo(
    () => getFirstUnansweredQuestion(),
    [answered]
  );

  const config = useInterviewStore((store) => store.config);
  const setAnswer = useInterviewStore((store) => store.setAnswer);

  const handleSendAnswers = async () => {
    // if no more questions, submit
    const { questions, answered } = useInterviewStore.getState();

    const score = await sendAnswers({
      answers: answered,
      questions: questions,
    });

    // set results to state
    navigate(`/results/${score.data.resultId}`);
  };

  const handleSubmitAnswer = async () => {
    if (unansweredQuestion) {
      // add loader
      setIsLoading(true);
      // update timelimit to corerctly set based on elapsed time
      setAnswer(
        unansweredQuestion.id,
        myAnswer,
        timerRef.current?.getTime() || 0
      );

      setTimeout(() => {
        setMyAnswer("");
      }, 0);

      // if last question
      if (answered.length + 1 === config.questionsNum) {
        setTimeout(async () => {
          await handleSendAnswers();
          setIsLoading(false);
        }, 0);
      } else {
        // if not last question
        // remove loader
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 animate-slideDown duration-500 ease-out">
        <Loader isLoading={Boolean(!unansweredQuestion || isLoading)}>
          <section>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <p className="my-5 text-left text-1  text-gray-600">
                Question {answered.length + 1} of {config.questionsNum}
              </p>
              <PageHeadline>{unansweredQuestion!.questionText}</PageHeadline>
              <p className="my-5 text-left text-1  text-gray-600">
                Answer with as much detail as possible for a better grade.
              </p>
              <Timer
                key={unansweredQuestion?.id}
                ref={timerRef}
                timeMin={config.timeLimitPerQuestion!}
                onExpired={handleSubmitAnswer}
              />
            </div>

            <div className=" bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitAnswer();
                }}
              >
                <div>
                  <InputField
                    value={myAnswer}
                    id="answer"
                    type="textarea"
                    required
                    label="Your answer"
                    onChange={(e) => setMyAnswer(e.target.value)}
                  />
                </div>

                <div>
                  <ButtonPrimary>Submit</ButtonPrimary>
                </div>
              </form>
            </div>
          </section>
        </Loader>
      </div>
    </>
  );
}
