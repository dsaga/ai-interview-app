import { ButtonPrimary } from "@/components/ButtonPrimary";
import InputField from "@/components/InputField";
import { PageHeadline } from "@/components/PageHeadline";
import { Timer } from "@/components/Timer";
import useInterviewStore from "@/store/useInterviewStore";
import { useMemo, useState } from "react";

export function InterviewPage() {
  const [myAnswer, setMyAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmitAnswer = () => {
    if (unansweredQuestion) {
      // add loader
      setIsLoading(true);
      // update timelimit to corerctly set based on elapsed time
      setAnswer(unansweredQuestion.id, myAnswer, config.timeLimitPerQuestion!);

      // remove loader
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {unansweredQuestion && !isLoading ? (
          <section>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <PageHeadline>{unansweredQuestion.questionText}</PageHeadline>
              <Timer timeMin={1} />
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
                    id="answer"
                    type="textarea"
                    required
                    label="Email address"
                    onChange={(e) => setMyAnswer(e.target.value)}
                  />
                </div>

                <div>
                  <ButtonPrimary>Submit</ButtonPrimary>
                </div>
              </form>
            </div>
          </section>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </>
  );
}
