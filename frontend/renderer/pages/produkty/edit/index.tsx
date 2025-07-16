import React, { useState, useEffect } from "react";
import {
  Tag, FileText, Package, Clipboard, DollarSign,
  Weight, Layers, CheckCircle, Trash2
} from "lucide-react";
import axios from "axios";

function LabeledInput({ icon, label, name, value, onChange, type = "text" }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2">
        {icon}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="ml-2 w-full outline-none"
        />
      </div>
    </div>
  );
}

function TextareaInput({ icon, label, name, value, onChange }) {
  return (
    <div className="space-y-1 col-span-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-start border rounded-md px-3 py-2">
        <div className="pt-1">{icon}</div>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          className="ml-2 w-full outline-none resize-none"
        />
      </div>
    </div>
  );
}

export default function EditProductForm({ productId }) {
  const [statuses, setStatuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dimensions: "",
    notes: "",
    price: "",
    sku: "",
    weight: "",
    categoryId: "",
    statusId: "",
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
    fetchStatuses();
    fetchImages();
  }, []);

  const fetchProduct = () => {
    axios.get(`http://localhost:8080/api/products/one/${productId}`)
      .then((res) => {
        const product = res.data;
        setFormData({
          name: product.name,
          description: product.description,
          dimensions: product.dimensions,
          notes: product.notes,
          price: product.price,
          sku: product.sku,
          weight: product.weight,
          categoryId: product.categoryDto?.id || "",
          statusId: product.statusDto?.id || "",
        });
      })
      .catch(console.error);
  };


  const fetchCategories = () => {
    axios.get("http://localhost:8080/api/category/all")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  };

  const fetchStatuses = () => {
    axios.get("http://localhost:8080/api/status/all/product")
      .then((res) => setStatuses(res.data))
      .catch(console.error);
  };

  const fetchImages = () => {
    axios.get(`http://localhost:8080/api/images/product/${productId}`)
      .then((res) => setFetchedImages(res.data))
      .catch((err) => {
        window.ipc?.invoke("show-alert", "Wystąpił problem w trakcie wczytywania zdjęć");
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = fetchedImages.length + images.length + files.length;

    if (totalImages > 9) {
      alert("Maksymalnie 9 zdjęć ogółem.");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteFetchedImage = async (imageId) => {
    try {
      await axios.delete(`http://localhost:8080/api/images/delete/${imageId}`);
      setFetchedImages(prev => prev.filter(img => img.id !== imageId));
    } catch (error) {
      console.error(error);
      alert("Błąd przy usuwaniu zdjęcia.");
    }
  };

  const handleImageSubmit = async () => {
    if (images.length === 0) return;

    const formDataImg = new FormData();
    images.forEach(img => formDataImg.append("images", img));
    formDataImg.append("productId", productId);

    try {
      await axios.post(`http://localhost:8080/api/images/upload/files`, formDataImg, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Zdjęcia zostały dodane.");
      setImages([]);
      setPreviews([]);
      fetchImages(); // Reload existing images
    } catch (error) {
      console.error(error);
      alert("Błąd podczas dodawania zdjęć.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/products/update/${productId}`, formData);
      alert("Produkt zaktualizowany.");
    } catch (err) {
      console.error(err);
      alert("Wystąpił błąd przy aktualizacji.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edytuj produkt</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput icon={<Tag className="w-4 h-4 text-gray-400" />} label="Nazwa" name="name" value={formData.name} onChange={handleChange} />
        <LabeledInput icon={<Package className="w-4 h-4 text-gray-400" />} label="Wymiary" name="dimensions" value={formData.dimensions} onChange={handleChange} />
        <TextareaInput icon={<Clipboard className="w-4 h-4 text-gray-400" />} label="Opis" name="description" value={formData.description} onChange={handleChange} />
        <TextareaInput icon={<FileText className="w-4 h-4 text-gray-400" />} label="Notatka" name="notes" value={formData.notes} onChange={handleChange} />
        <LabeledInput icon={<DollarSign className="w-4 h-4 text-gray-400" />} label="Cena" name="price" type="number" value={formData.price} onChange={handleChange} />
        <LabeledInput icon={<Layers className="w-4 h-4 text-gray-400" />} label="SKU" name="sku" value={formData.sku} onChange={handleChange} />
        <LabeledInput icon={<Weight className="w-4 h-4 text-gray-400" />} label="Waga (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Kategoria</label>
          <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
            <option value="">Wybierz kategorię</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select name="statusId" value={formData.statusId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
            <option value="">Wybierz status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>{status.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Zdjęcia */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Zdjęcia produktu (max 9)</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block" />

        <div className="grid grid-cols-3 gap-4 mt-2">
          {/* Istniejące zdjęcia */}
          {fetchedImages.map((img, index) => (
            <div key={`fetched-${img.id}`} className="relative">
              <img src={`http://localhost:8080${img.path}`} alt={`existing-${index}`} className="w-full h-32 object-cover rounded-md" />
              <button
                type="button"
                onClick={() => handleDeleteFetchedImage(img.id)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}

          {/* Nowe zdjęcia */}
          {previews.map((src, index) => (
            <div key={`preview-${index}`} className="relative">
              <img src={src} alt={`preview-${index}`} className="w-full h-32 object-cover rounded-md" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {images.length > 0 && (
          <button
            type="button"
            className="w-full font-medium text-white bg-blue-600 rounded-md py-2 hover:bg-blue-700 transition"
            onClick={handleImageSubmit}
          >
            Dodaj zdjęcia
          </button>
        )}
      </div>

      <button type="submit" className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2">
        <CheckCircle className="w-5 h-5" />
        Zapisz zmiany
      </button>
    </form>
  );
}
