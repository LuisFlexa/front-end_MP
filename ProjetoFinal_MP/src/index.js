import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/auth";
import './index.css';

const root = createRoot(document.querySelector("#root"));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
