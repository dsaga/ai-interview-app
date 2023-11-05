import * as Yup from "yup";
import { ButtonPrimary } from "@/components/ButtonPrimary";
import Checkmark from "@/components/Checkmark";
import InputField from "@/components/InputField";
import { PageHeadline } from "@/components/PageHeadline";
import { SelectField } from "@/components/SelectField";
import { useFirebase } from "@/providers/FirebaseProvider";
import { httpsCallable } from "firebase/functions";
import {
  CONSTS,
  TExperienceLevelKeys,
  TInterviewRoleKeys,
  TQuestionsQuery,
  TGetQuestionsResponse,
} from "shared";

const { interviewRoles, experienceLevels, interviewQuestionsCount } = CONSTS;

import useInterviewStore, { TStore } from "@/store/useInterviewStore";
import { useNavigate } from "react-router-dom";
import { SCHEMA } from "shared";
import Loader from "@/components/Loader";
import { useState } from "react";

export function StarterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { functions } = useFirebase();

  const selectConfig = (state: TStore) => state.config;
  const selectSetConfig = (state: TStore) => state.setConfig;
  const selectUser = (state: TStore) => state.setUser;
  const selectQuestions = (state: TStore) => state.setQuestions;
  const selectErrors = (state: TStore) => state.setErrors;

  const setConfig = useInterviewStore(selectSetConfig);
  const setUser = useInterviewStore(selectUser);
  const setQuestions = useInterviewStore(selectQuestions);

  const config = useInterviewStore(selectConfig);

  const setErrors = useInterviewStore(selectErrors);

  const generateQuestions = httpsCallable<
    TQuestionsQuery,
    TGetQuestionsResponse
  >(functions, "callGenerateQuestions");

  const handleGenerateQuestions = async () => {
    try {
      setIsLoading(true);
      const { role, experienceLevel, questionsNum } = await SCHEMA.questionsQuerySchema
        .concat(
          Yup.object().shape({ sendResultsToEmail: Yup.bool().required() })
        )
        .validate(config);

      const questions = await generateQuestions({
        role: role,
        experienceLevel: experienceLevel,
        questionsNum: questionsNum,
      });

      console.log(questions)

      if (questions.data) setQuestions(questions.data);

      // transition to the next page (INREVIEW PAGE)
      navigate("/qa");
    } catch (err) {
      console.log(err);
      setErrors([
        {
          message: err
            ? err.toString()
            : "Something went wrong. Please try again later.",
          type: "error",
        },
      ]);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 animate-slideDown duration-500 ease-out">
        <Loader isLoading={isLoading}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <PageHeadline>What position are you applying for?</PageHeadline>
          </div>

          <div className=" bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerateQuestions();
              }}
            >
              <div>
                <InputField
                  id="email"
                  type="email"
                  required
                  label="Email address"
                  onChange={(e) => setUser({ email: e.target.value })}
                />
              </div>

              <div>
                <SelectField
                  id="position"
                  name="position"
                  label="Position"
                  options={Object.entries(interviewRoles).map(
                    ([key, value]) => ({
                      key,
                      label: value,
                    })
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value in interviewRoles) {
                      setConfig({ role: value as TInterviewRoleKeys });
                    }
                  }}
                />
              </div>

              <div>
                <SelectField
                  id="seniorityLevel"
                  name="seniorityLevel"
                  label="Seniority Level"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value in experienceLevels) {
                      setConfig({
                        experienceLevel: value as TExperienceLevelKeys,
                      });
                    }
                  }}
                  options={Object.entries(experienceLevels).map(
                    ([key, value]) => ({
                      key,
                      label: value,
                    })
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <SelectField
                  id="questionsNum"
                  name="questionsNum"
                  label="Questions"
                  options={interviewQuestionsCount.map((count) =>
                    count.toString()
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setConfig({ questionsNum: parseInt(value) });
                    }
                  }}
                />

                <SelectField
                  id="timeLimitPerQuestion"
                  name="timeLimitPerQuestion"
                  label="Time Limit Per Question"
                  options={["5", "10", "15", "20"]}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setConfig({ timeLimitPerQuestion: parseInt(value) });
                    }
                  }}
                />
              </div>

              <div>
                <Checkmark
                  id="sendResultsToEmail"
                  name="sendResultsToEmail"
                  checked={config.sendResultsToEmail}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setConfig({
                        sendResultsToEmail: !config.sendResultsToEmail,
                      });
                    }
                  }}
                >
                  Send results to my email address after completion.
                </Checkmark>
              </div>

              <div>
                <ButtonPrimary>Start The Interview</ButtonPrimary>
              </div>
            </form>
          </div>
        </Loader>
      </div>
    </>
  );
}
