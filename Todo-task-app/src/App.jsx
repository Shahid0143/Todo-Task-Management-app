import { Toaster } from "react-hot-toast";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
      <Toaster />
    </div>
  );
}

export default App;
