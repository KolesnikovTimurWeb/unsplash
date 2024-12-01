import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FullPost from "./pages/FullPost";
import TagPage from "./pages/TagPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/photos/:id" element={<FullPost />} />
        <Route path="/collection/:tag" element={<TagPage />} />
      </Routes>
    </>
  );
}

export default App;
