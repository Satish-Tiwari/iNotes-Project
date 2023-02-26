import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import { Navbar } from "./Components/Utility/Navbar";
import Notestate from "./Context/notes/NoteState";
import Alert from "./Context/Alert/Alert";
import Login from "./Components/Utility/Login";
import Signup from "./Components/Utility/Signup";
import Alertbox from "./Context/Alert/Alertbox";
import UserDetails from "./Context/UserDetails/UserDetails";

function App() {
  return (
    <>
      <Alert>
        <UserDetails>
          <Notestate>
            <BrowserRouter>
              {/* Navbar is here... */}
              <Navbar />
              <Alertbox />
              {/* Some routes define here... */}
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                </Routes>
              </div>
            </BrowserRouter>
          </Notestate>
        </UserDetails>
      </Alert>
    </>
  );
}

export default App;
