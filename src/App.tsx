import React from "react";
import { HomePage } from "./pages/HomePage";
import { theme } from "./Theme";
import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GamePage } from "./pages/game/GamePage";
import { Ash } from "./game/visual/Ash";

function App() {
  return (
    <div className="App" id="Game">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
