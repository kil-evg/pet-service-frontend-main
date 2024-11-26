import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/auth/me", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Используем токен
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Удаляем токен
    navigate('/login'); // Перенаправляем на страницу входа
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-6 text-center">User Profile</h2>
        <p><strong>Name:</strong> {user.firstName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Description:</strong> {user.description}</p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-sky-600 hover:bg-theme-blue text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
