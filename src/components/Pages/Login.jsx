import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Open a connection to the IndexedDB database
    const request = indexedDB.open("YourDatabaseName", 1);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Create a transaction and object store for retrieving user data
      const transaction = db.transaction(["users"], "readonly");
      const store = transaction.objectStore("users");

      // Open a cursor to iterate through the user data
      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
          const user = cursor.value;

          if (
            user.email === formData.email &&
            user.password === formData.password
          ) {
            // Redirect to user's dashboard after successful login
            navigate("/");
            return; // Exit the function early
          }

          cursor.continue();
        } else {
          // Display an error message for incorrect credentials
          alert("Invalid email or password. Please try again.");
        }
      };

      cursorRequest.onerror = (event) => {
        console.error(
          "Error retrieving user data from IndexedDB:",
          event.target.error
        );
      };

      // Close the database connection
      db.close();
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Login
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

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* Link to Signup Page */}
        <div className="text-center mt-2">
          <span className="text-gray-600">
            If you don&apos;t have an account,{" "}
            <Link to="/signup" className="text-blue-600">
              sign up here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
