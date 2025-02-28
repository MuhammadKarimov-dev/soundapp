import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
  DirectorHome, 
  OvozAktyoriHome, 
  RejissorHome, 
  SoundRejissorHome, 
  TahriirchiHome 
} from ".";
import Login from "./pages/auth/Login";
import PrivateRoute from "./pages/auth/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/director" element={<PrivateRoute element={<DirectorHome />} />} />
        <Route path="/ovoz-aktyori" element={<PrivateRoute element={<OvozAktyoriHome />} />} />
        <Route path="/rejissor" element={<PrivateRoute element={<RejissorHome />} />} />
        <Route path="/sound-rejissor" element={<PrivateRoute element={<SoundRejissorHome />} />} />
        <Route path="/tahrirchi" element={<PrivateRoute element={<TahriirchiHome />} />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
