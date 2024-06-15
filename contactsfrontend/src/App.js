import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Contacts from "./contacts/Contacts";
import Header from "./shared/header/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div className="main_container ">
              <Header />
              <Contacts />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
