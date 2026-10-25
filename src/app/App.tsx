import React from "react";
import { Container } from "@mui/material";
import "../css/app.css";
// v6: Switch yo'q, uning o'rniga Routes ishlatiladi
import { Link, Route, Routes } from "react-router-dom";
import { About } from "./screens/About";
import { Users } from "./screens/Users";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      {/* Routes: URL ga mos keladigan BITTA Route ni tanlaydi.
          v6 eng aniq moslikni o'zi topadi, shuning uchun tartib muhim emas */}
      <Routes>
        {/* v6: komponent Route ichiga bola qilib emas,
            element={...} prop sifatida beriladi */}
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <Container>Home</Container>;
}

export default App;
