import React, { useState } from "react";
import { Tag, Layers } from "lucide-react";
import ColorPicker from "../../../components/ColorPicker"; // zakładam, że jest w tym samym folderze
import axios from 'axios';
export default function AddStatusForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    color: "bg-green-200",
  });

  const types = [
    { label: "Zamówienie", value: "ORDER" },
    { label: "Produkt", value: "PRODUCT" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Status do wysłania:", formData);
    
    axios.post("http://localhost:8080/api/status/add", formData)
    .then((res) => {
        window.close();
    }
    ).catch((err) => {
        console.error(err);
    });
  };

  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dodaj nowy status</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          icon={<Tag className="w-4 h-4 text-gray-400" />}
          label="Nazwa"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Typ</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Wybierz typ</option>
            {types.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1 flex flex-col">
          <label className="text-sm font-medium text-gray-700">Kolor</label>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gray-400" />
            <ColorPicker selectedColor={formData.color} onSelect={handleColorSelect} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2"
      >
        Dodaj status
      </button>
    </form>
  );
}

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
