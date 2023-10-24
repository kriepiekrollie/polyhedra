import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Slider from "./pages/Slider";
import ShapeArticle from "./pages/ShapeArticle";
import WorkInProgress from "./pages/wip.js";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Homepage />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/wip" element={<WorkInProgress />} />
          <Route path="/shape/:shape" element={<ShapeArticle />} />

        </Route>
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
