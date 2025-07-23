import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Tag, Palette } from "lucide-react";
import ColorPicker from "../../../components/ColorPicker"; // Zmodyfikuj ścieżkę zgodnie ze strukturą projektu

export default function AddCategoryPage() {
  const router = useRouter();

  const [category, setCategory] = useState({
    name: "",
    color: "bg-green-200",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setCategory((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/api/category/add`, category)
      .then(() => {
        window.close();
      })
      .catch(() => {
        alert("Błąd podczas dodawania kategorii.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleCancel = () => {
    window.close();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Nowa kategoria</h1>
        <p className="text-gray-500 text-sm">Wprowadź nazwę i kolor kategorii</p>
      </div>

      <div className="bg-white border shadow-sm rounded-xl p-6 space-y-6 text-black">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Tag className="w-4 h-4" />
            Nazwa kategorii
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            value={category.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Palette className="w-4 h-4" />
            Kolor kategorii
          </label>
          <div className="flex items-center gap-3">
            <ColorPicker
              selectedColor={category.color}
              onSelect={(color) => handleChange("color", color)}
            />
            <span className="text-sm text-gray-600">Wybierz kolor</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-md font-medium transition"
          onClick={handleCancel}
          disabled={saving}
        >
          Anuluj
        </button>
        <button
          className="px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Zapisywanie..." : "Dodaj kategorię"}
        </button>
      </div>
    </div>
  );
}
