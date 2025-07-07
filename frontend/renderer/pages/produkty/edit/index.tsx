import React, { useState } from "react";

export default function EditProduct({ product }) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    sku: product.sku,
    price: product.price,
    weight: product.weight,
    dimensions: product.dimensions,
    description: product.description,
    notes: product.notes,
    status: product.status?.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <div className="p-10">

{/*<pre>{JSON.stringify(product, null, 2)}</pre>*/}
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl mx-auto">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Edytuj Produkt</h2>
          <p className="text-sm text-yellow-600">
            ⚠️ Ten formularz jest tylko do podglądu. Zmiany nie są zapisywane.
          </p>
        </div>

        <form className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nazwa</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input
              type="text"
              name="sku"
              value={product.SKU}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cena</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={parseFloat(formData.price)}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Waga (kg)</label>
              <input
                type="number"
                name="weight"
                step="0.01"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Wymiary (cm)</label>
              <input
                type="number"
                name="dimensions"
                step="0.01"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Opis</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notatki</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Aktywny">Aktywny</option>
              <option value="Nieaktywne">Nieaktywne</option>
              <option value="Oczekujące">Oczekujące</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Powrót
            </button>
            <button
              type="submit"
              disabled
              className="px-4 py-2 rounded bg-gray-400 text-white cursor-not-allowed"
            >
              Zapisz (wyłączone)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
