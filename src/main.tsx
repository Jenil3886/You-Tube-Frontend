// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import "./style/animations.css";

// // Add a small delay to allow for page transitions
// // document.addEventListener("DOMContentLoaded", () => {
// // 	document.body.classList.add("fade-in");
// // });
// createRoot(document.getElementById("root")!).render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./style/animations.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ToastProvider } from "@radix-ui/react-toast";
import { Toaster } from "./components/ui/toaster.tsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.tsx";

// Add a small delay to allow for page transitions
// document.addEventListener("DOMContentLoaded", () => {
// 	document.body.classList.add("fade-in");
// });

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <ThemeProvider>
          <TooltipProvider>
            <ToastProvider />
            <Toaster />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </SocketProvider>
    </QueryClientProvider>
  </StrictMode>
);
