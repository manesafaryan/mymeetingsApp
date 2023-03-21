import React, { lazy, Suspense } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { Header } from "./layout";
import { ErrorBoundary } from "./components/shared";
import Home from "./pages/Home";

const NotFoundPage = lazy(() => import("./pages/404"));

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
            <Route
              path={"/"}
              errorElement={<ErrorBoundary />}
              element={<Home />}
            />
            <Route
              path={"/:id"}
              errorElement={<ErrorBoundary />}
              element={<Home />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
