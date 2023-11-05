import { Route, Routes as RouterRoutes, Navigate } from "react-router-dom";
import { StarterPage } from "@/features/StarterPage/StarterPage";
import { InterviewPage } from "@/features/InterviewPage";
import { PageLayout } from "@/layout/PageLayout";
import useInterviewStore from "@/store/useInterviewStore";
import { ResultsPage } from "@/features/ResultsPage";

function Routes() {
  const config = useInterviewStore((store) => store.config);
  const hasConfigInformation = Object.values(config).every((value) => value);

  return (
    <RouterRoutes>
      <Route
        path="/"
        element={
          <PageLayout>
            <StarterPage />
          </PageLayout>
        }
      />
      {hasConfigInformation && (
        <Route
          path="/qa"
          element={
            <PageLayout>
              <InterviewPage />{" "}
            </PageLayout>
          }
        />
      )}
      <Route
        path="/results/:resultId"
        element={
          <PageLayout>
            <ResultsPage />
          </PageLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />{" "}
    </RouterRoutes>
  );
}

export default Routes;
