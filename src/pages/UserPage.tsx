
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const UserProfilePage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [editableUser, setEditableUser] = useState<any>(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { setIsLoggedIn, setIsLoggedOut } = useContext(AuthContext);

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
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user data: ${response.status}`);
            }

            const userData = await response.json();
            setUser(userData);
            setEditableUser(userData);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Failed to fetch user data.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setIsLoggedOut(true);
        navigate('/login');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditableUser((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        try {
            const response = await fetch("/api/auth/me", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editableUser),
            });

            if (!response.ok) {
                throw new Error(`Failed to update user data: ${response.status}`);
            }

            const updatedUser = await response.json();
            setUser(updatedUser); 
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating user data:", err);
            setError("Failed to update user data.");
        }
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
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-lg w-full p-8 bg-white shadow-md rounded">
                <h2 className="text-2xl font-semibold mb-6 text-center">Welcome {user.firstName}</h2>

                {isEditing ? (
                    <>
                    <div className="mb-4">
                            <label className="block font-semibold">photo:</label>
                            <input
                                type="text"
                                name="photo"
                                value={editableUser.photo}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={editableUser.firstName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Last name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={editableUser.lastName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Description:</label>
                            <textarea
                                name="description"
                                value={editableUser.description}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                    <p><strong>Photo:</strong> {user.photo}</p>
                        <p><strong>Name:</strong> {user.firstName}</p>
                        <p><strong>Last name:</strong> {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Description:</strong> {user.description}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit
                        </button>
                    </>
                )}

                <button
                    onClick={handleLogout}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default UserProfilePage;

import React from 'react';
import myProfileImage from '../asets/images/profile-logo.png';


const UserPage: React.FC = () => {
  return (
    <div>
      <div>
        <h1 className='text-xxl text-center mb-8 mt-8'>My Profile</h1>
      </div>
      <div className='grid md:grid-cols-4 sm:grid-cols-1 '>
        <div className="rounded-full md:col-start-2 sm:grid-cols-1 place-items-center">
          <img src={myProfileImage} alt="Logo" className=' w-40 ' />
          <p>
          <span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star"></span>
<span className="fa fa-star"></span>
          </p>
        </div>

        <div className='place-items-center  md:place-items-start mt-4 text-sm'>
          <div><strong>First name:</strong> Robindronade</div>
          <div><strong>Last name:</strong> Berabidjao</div>
          <div><strong>Email:</strong> robindrojao@gmail.com</div>
          <div><strong>Password:</strong> *****52</div>
          <div><strong>Role:</strong> Sitter</div>
          <button className='bg-sky-200 hover:text-white hover:bg-theme-blue px-2 py-1 rounded-sm '>Edit profile</button>
        </div>

        <div className=' sm:col-start-1 md:col-start-2 md:col-span-2 m-10  '>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>


      </div>
    </div>
  );
};

export default UserPage;
