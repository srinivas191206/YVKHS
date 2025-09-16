import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('main.tsx loading, React:', React);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

console.log('Creating root and rendering App');
const root = createRoot(rootElement);
root.render(<App />);
