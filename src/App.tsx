import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<FormPage />} />
            <Route path="/edit/:id" element={<FormPage />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
