import "./App.css";
import ErrorsProvider from "./providers/ErrorsProvider";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import Routes from "./router/Routes";
import { BrowserRouter } from "react-router-dom";

console.log(import.meta.env.FIREBASE_PROJECT_ID); // undefined

function App() {
  return (
    <BrowserRouter>
      <FirebaseProvider
        firebaseConfig={{
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
          measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
        }}
      >
        <ErrorsProvider>
          <Routes />
        </ErrorsProvider>
      </FirebaseProvider>
    </BrowserRouter>
  );
}

export default App;
