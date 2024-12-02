
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
    
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhotoFile(e.target.files[0]);
        }
    };
    const handlePhotoUpload = async () => {
        if (!photoFile) {
            alert("Please select a file to upload.");
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) return;

        const formData = new FormData();
        formData.append('file', photoFile);
        formData.append('folder', 'user-images'); // Вы можете указать любую папку

        try {
            const response = await fetch('/api/files/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload photo');
            }

            const fileUrl = await response.text();
            setEditableUser((prev: any) => ({ ...prev, photo: fileUrl }));
            alert('Photo uploaded successfully.');
        } catch (err) {
            console.error("Error uploading photo:", err);
            alert('Failed to upload photo.');
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
                            <label className="block font-semibold">Photo:</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <button
                                type="button"
                                onClick={handlePhotoUpload}
                                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Upload Photo
                            </button>
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
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSave}
                                className="mt-2 w-1/2  bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="mt-2 w-1/2  bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-4">
                            <p><strong>Photo:</strong></p>
                            <img src={user.photo} alt="User Profile" className="w-32 h-32 object-cover rounded-full" />
                        </div>
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

