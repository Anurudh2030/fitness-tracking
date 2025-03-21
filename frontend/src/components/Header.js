import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fitness Tracker</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/trainers" className="hover:text-blue-200">
                Trainers
              </Link>
            </li>
            <li>
              <Link to="/workout" className="hover:text-blue-200">
                Workout
              </Link>
            </li>
            <li>
              <Link to="/time" className="hover:text-blue-200">
                Time
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;