import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AnimalProfilePage: React.FC = () => {
  const [animal, setAnimal] = useState<any>(null); // Информация о животном
  const [editableAnimal, setEditableAnimal] = useState<any>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  // Загружаем данные животного с сервера
  const fetchAnimalData = async () => {
    try {
      const response = await fetch("/api/pets/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch animal data");

      const animalData = await response.json();
      setAnimal(animalData);
      setEditableAnimal(animalData);
    } catch (err) {
      setError("Error fetching animal data");
    }
  };

  // Обрабатываем изменения в текстовых полях
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableAnimal((prev: any) => ({ ...prev, [name]: value }));
  };

  // Обрабатываем изменение фото
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
      setEditableAnimal((prev: any) => ({ ...prev, photo: file }));
    }
  };

  // Сохраняем изменения
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", editableAnimal.name);
    formData.append("description", editableAnimal.description);

    if (editableAnimal.photo instanceof File) {
      formData.append("photo", editableAnimal.photo);
    }

    try {
      const response = await fetch("/api/pets/me", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update animal data");

      const updatedAnimal = await response.json();
      setAnimal(updatedAnimal);
      setIsEditing(false);
      setPhotoPreview(null);
    } catch (err) {
      setError("Error saving animal data");
    }
  };

  useEffect(() => {
    fetchAnimalData(); // Загружаем данные животного при загрузке страницы
  }, []);

  if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;
  if (!animal) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-6 text-center">Animal Profile</h2>

        {isEditing ? (
          <>
            <div className="mb-4">
              <label className="block font-semibold">Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {photoPreview && <img src={photoPreview} alt="Preview" className="mt-4 max-w-full rounded" />}
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                value={editableAnimal.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Description:</label>
              <textarea
                name="description"
                value={editableAnimal.description}
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
              onClick={() => {
                setIsEditing(false);
                setPhotoPreview(null);
              }}
              className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {animal.photo && <img src={animal.photo} alt="Animal" className="mb-4 max-w-full rounded" />}
            <p><strong>Name:</strong> {animal.name}</p>
            <p><strong>Description:</strong> {animal.description}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AnimalProfilePage;
