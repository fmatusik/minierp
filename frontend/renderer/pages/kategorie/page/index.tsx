import { useState, useEffect } from "react";
import clsx from "clsx";
import ColorPicker from "../../../components/ColorPicker";
import axios from "axios";
export default function CategoryPage({ categoryId }) {
  const [headerColor, setHeaderColor] = useState("bg-purple-600");
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  
  const fetchCategoryData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/category/one/${categoryId}`);
        if (!res.ok) throw new Error("Failed to fetch category");
        const data = await res.json();

        setCategory(data);
        setProducts(data.productsDto || []);
        console.log(data.productsDto)
        setHeaderColor(data.color);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCategoryData();
  }, [categoryId]);

  const formattedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    category: category?.name || "Brak kategorii",
    price: `${product.price?.toFixed(2)} PLN`,
    status: product.statusDto || "Nieznany",
    image: `http://localhost:8080${product.imagesDto[0]?.path }`|| "https://via.placeholder.com/300x200",
  }));

  const handleSetHeaderColor = (color) => {
    setHeaderColor(color);
    axios.put(
      `http://localhost:8080/api/category/update/color/${category.id}`,
      color,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    )
    .then((res) => {
      fetchCategoryData();
    })
    .catch((err) => {
      console.error(err);
    })
    
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/category/delete/${category.id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  if (loading) return <div className="text-center py-10">Ładowanie...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Dynamic Header */}
      <div className={clsx("relative h-28 rounded-t-2xl", headerColor)}>
        <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 bg-white rounded-full p-4 shadow">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12l-8 4-8-4m16 0l-8-4-8 4m16 0v4m-16-4v4m16 0l-8 4-8-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{category?.name || "Kategoria"}</h2>
          <div className="flex items-center gap-2">
            <ColorPicker selectedColor={headerColor} onSelect={(color) => handleSetHeaderColor(color)} />
            <button className="border border-black rounded-full px-4 py-1 text-sm font-bold"
              onClick={handleDelete}
            >
              Usuń
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {formattedProducts.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-sm text-gray-800">{product.price}</p>
                <span
                  className={
                    `inline-block text-xs px-2 py-1 rounded ${product.status.color}`
                  }
                >
                  {product.status.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
