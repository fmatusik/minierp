import React, { useState, useEffect } from "react";
import {
  Tag, FileText, Package, Clipboard, DollarSign,
  Weight, Layers, CheckCircle, ImagePlus, Trash2
} from "lucide-react";
import axios from "axios";

// Reużycie inputów z formularza dodawania
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
  }, []);

  const fetchProduct = () => {
    axios.get(`http://localhost:8080/api/products/one/${productId}`)
      .then((res) => {
        const { name, description, dimensions, notes, price, sku, weight, categoryId, statusId } = res.data;
        setFormData({ name, description, dimensions, notes, price, sku, weight, categoryId, statusId });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSubmit = () => {
    //update image -> http://localhost:8080/api/images/update/
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 9) {
      alert("Maksymalnie 9 zdjęć.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update product data
      await axios.put(`http://localhost:8080/api/products/${productId}`, formData);

      // Upload images
      if (images.length > 0) {
        const formDataImg = new FormData();
        images.forEach((img) => formDataImg.append("images", img));

        await axios.post(`http://localhost:8080/api/products/${productId}/images`, formDataImg, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

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
          {previews.map((src, index) => (
            <div key={index} className="relative">
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

          {previews && (
            //Poprawić styling buttona na full width i font medium text white
            <button className="w-full text-center bg-primary rounded-md"
            onClick={handleImageSubmit}
            >Dodaj zdjęcia</button>
          )}
        </div>
      </div>

      <button type="submit" className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2">
        <CheckCircle className="w-5 h-5" />
        Zapisz zmiany
      </button>
    </form>
  );
}
