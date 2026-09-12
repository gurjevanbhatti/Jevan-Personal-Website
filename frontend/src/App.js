import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/y2k/Layout";
import HomePage from "./components/y2k/pages/Home";
import AboutPage from "./components/y2k/pages/About";
import EducationPage from "./components/y2k/pages/Education";
import SkillsPage from "./components/y2k/pages/Skills";
import ExperiencePage from "./components/y2k/pages/Experience";
import ContactPage from "./components/y2k/pages/Contact";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="education" element={<EducationPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
