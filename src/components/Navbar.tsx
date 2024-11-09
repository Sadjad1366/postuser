// Navbar.tsx
import { Link, useNavigate } from "react-router-dom";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onClickHome}
            className="text-white font-bold text-xl hover:text-blue-200 transition duration-300"
          >
            My App
          </button>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/users"
            className="text-white font-semibold hover:text-blue-200 transition duration-300"
          >
            Users
          </Link>
          <Link
            to="/posts"
            className="text-white font-semibold hover:text-blue-200 transition duration-300"
          >
            Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};
