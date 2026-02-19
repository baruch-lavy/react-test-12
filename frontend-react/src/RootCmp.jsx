import { Routes, Route, BrowserRouter } from "react-router";

//pages
import { DataSet } from "./pages/dataSet";
import { QuestionsPage } from "./pages/QuastionsPage";

//cmps

export function RootCmp() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataSet />} />
          <Route path="/questions" element={<QuestionsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
