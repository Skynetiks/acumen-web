import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import reportWebVitals from "./reportWebVitals.ts";
import { queryClient } from "@/lib/queryClient.ts";
import "./styles.css";
import App from "./app.tsx";
import { AuthProvider } from "./lib/providers/auth-context.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NuqsAdapter>
            <App />
          </NuqsAdapter>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
