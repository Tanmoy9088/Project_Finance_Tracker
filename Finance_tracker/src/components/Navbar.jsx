import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    api.post("/auth/logout");
    navigate("/auth");
    console.log("logout successfully")
  };
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow">
      <h1 className="text-xl font-bold">💰 Finance Tracker</h1>
      <button
        onClick={toggleDark}
        className="bg-gray-200 dark:bg-gray-700 p-2 rounded"
      >
        Toggle Dark Mode
      </button>
      <button className=" bg-red-600 p-1 text-white rounded-md ml-1 hover:text-red-900 hover:bg-red-600" onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default Navbar;
