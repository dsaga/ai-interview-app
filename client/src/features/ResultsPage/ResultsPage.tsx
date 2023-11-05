import { useParams } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { TScoreEntity } from "shared";
import { useFirebase } from "@/providers/FirebaseProvider";
import { useCallback, useEffect, useState } from "react";

export function ResultsPage() {
  const [score, setScore] = useState<TScoreEntity | null>();
  const params = useParams<{ resultId: string }>();
  const { functions } = useFirebase();

  const getResults = useCallback(
    httpsCallable<{ resultId: string }, TScoreEntity>(
      functions,
      "callGetResults"
    ),
    [functions]
  );

  useEffect(() => {
    const getResult = async () => {
      if (!params.resultId) return;
      const result = await getResults({ resultId: params.resultId });
      setScore(result.data);
    };

    getResult();
    return () => {
      setScore(null);
    };
  }, [params.resultId]);

  return <>{params.resultId}  {score?.totalScore}</>;
}
