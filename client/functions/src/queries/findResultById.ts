import * as admin from "firebase-admin";

export async function findResultById(
  db: admin.firestore.Firestore,
  id: string
): Promise<FirebaseFirestore.DocumentSnapshot> {
  const querySnapshot = await db
    .collection("results")
    .doc(id)
    .get();
  return querySnapshot;
}
