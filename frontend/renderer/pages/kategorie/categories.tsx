import React from "react";
import { Boxes } from "lucide-react";

const dummyCategories = [
  {
    id: 1,
    name: "Laptopy",
    productsCount: 12,
  },
  {
    id: 2,
    name: "Smartfony",
    productsCount: 18,
  },
  {
    id: 3,
    name: "Monitory",
    productsCount: 7,
  },
  {
    id: 4,
    name: "Tablety",
    productsCount: 5,
  },
  {
    id: 5,
    name: "Smartwatche",
    productsCount: 9,
  },
  {
    id: 6,
    name: "Słuchawki",
    productsCount: 14,
  },
];

export default function KategoriePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Kategorie</h1>
          <p className="text-gray-600 text-sm">Grupy produktów w Twoim katalogu</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">+ Nowa kategoria</button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {dummyCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border shadow-sm p-4 hover:shadow-md transition flex flex-col items-center text-center"
          >
            <div className="bg-gray-200 rounded-full p-3 mb-3">
              <Boxes size={28} className="text-gray-600" />
            </div>
            <h3 className="font-semibold text-sm">{category.name}</h3>
            <p className="text-xs text-gray-500">{category.productsCount} produktów</p>
          </div>
        ))}
      </div>
    </div>
  );
}
