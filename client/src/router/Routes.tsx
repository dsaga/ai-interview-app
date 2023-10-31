import { Route, Routes as RouterRoutes, Navigate } from "react-router-dom";
import { StarterPage } from "@/features/StarterPage/StarterPage";
import { InterviewPage } from "@/features/InterviewPage";
import { PageLayout } from "@/layout/PageLayout";

function Routes() {
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
      <Route
        path="/qa"
        element={
          <PageLayout>
            <InterviewPage />{" "}
          </PageLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />{" "}
    </RouterRoutes>
  );
}

export default Routes;
