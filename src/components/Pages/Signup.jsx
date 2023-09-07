import { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password and confirmPassword fields match
    if (formData.password !== formData.confirmPassword) {
      alert("password and confirm password should be the same");
      return;
    }

    // Generate a random ID for the user
    const userId = generateRandomId();

    // Add your IndexedDB logic here to store user information
    const user = {
      id: userId,
      email: formData.email,
      username: formData.username,
      // You should hash and salt the password before storing it.
      // For simplicity, we're storing it as plain text in this example.
      password: formData.password,
    };

    // Open a connection to the IndexedDB database
    const request = indexedDB.open("YourDatabaseName", 1);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Create a transaction and object store for storing user data
      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");

      // Add the user data to the object store
      const addUserRequest = store.add(user);

      addUserRequest.onsuccess = () => {
        console.log("User data added to IndexedDB");
        // You can redirect the user to another page or perform any other actions here
      };

      addUserRequest.onerror = () => {
        console.error("Error adding user data to IndexedDB");
      };

      // Close the database connection
      db.close();
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an object store for user data
      const store = db.createObjectStore("users", { keyPath: "id" });

      // You can define additional indexes if needed
      store.createIndex("email", "email", { unique: true });

      console.log("IndexedDB setup complete");
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Signup
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Address */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Link to Login Page */}
          <div className="text-center mt-2">
            <span className="text-gray-600">
              If you already have an account,{" "}
              <Link to="/login" className="text-blue-600">
                go to login page
              </Link>
            </span>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
