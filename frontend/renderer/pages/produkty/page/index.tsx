import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function ProductPage({ selectedProduct }) {
  const carouselRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [selectedProduct]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products/one/${selectedProduct}`);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Błąd podczas pobierania produktu:", error);
    }
  };

  if (!product) {
    return <div className="p-10">Ładowanie produktu...</div>;
  }

  const category = product.categoryDto || "Brak kategorii";

  const productImages = product.imagesDto?.map((img) => img.path) || [];
  const maxImages = 9;
  const images = productImages.length > 0
    ? productImages.slice(0, maxImages)
    : Array(1).fill("https://via.placeholder.com/300x200");

  const itemsPerPage = 3;
  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handleDotClick = (index) => {
    const container = carouselRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth;
      const targetScrollLeft = (scrollWidth / totalPages) * index;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });

      setActivePage(index);
    }
  };

  const getImageWidthClass = () => {
    if (images.length === 1) return "w-full";
    if (images.length === 2) return "w-1/2";
    return "w-1/3";
  };

  const imageWidthClass = getImageWidthClass();

  return (
    <div className="p-10">
      <div className="bg-white rounded-xl w-full shadow-md">
        {/* Image Carousel */}
        <div className="overflow-hidden rounded-t-xl">
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden gap-3 snap-x snap-mandatory scroll-smooth scrollbar-hide transition-all duration-300"
          >
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`h-64 snap-start transition-transform duration-500 ease-out ${imageWidthClass} flex-shrink-0`}
              >
                <img
                  src={`http://localhost:8080${image}`}
                  alt={`${product.name || "Product"} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center my-4 space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                activePage === idx ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="flex justify-between items-center px-6 pb-6">
          <div>
            <h2 className="text-lg font-medium">{product.name}</h2>
            <p className={`text-gray-700 text-sm rounded-md`}>{category.name}</p>
          </div>
          <div className="text-xl font-bold">{product.price} zł</div>
        </div>

        {/* Product description */}
        <p className="px-10 py-10">{product.description || "Brak opisu"}</p>

        {/* Product info table */}
        <div className="w-full px-5 pb-10 flex justify-center">
          <table className="min-w-[60%] text-sm border rounded-lg">
            <tbody>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-100 border">Nazwa</th>
                <td className="px-4 py-2 text-left border">{product.name || "Brak nazwy"}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-100 border">SKU</th>
                <td className="px-4 py-2 text-left border">{product.sku || "Brak SKU"}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-100 border">Waga</th>
                <td className="px-4 py-2 text-left border">
                  {product.weight ? `${product.weight} kg` : "Brak danych"}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-100 border">Wymiary</th>
                <td className="px-4 py-2 text-left border">
                  {product.dimensions ? `${product.dimensions} cm` : "Brak danych"}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-100 border">Dodano</th>
                <td className="px-4 py-2 text-left border">
                  {new Date(product.data?.createdAt).toLocaleDateString("pl-PL") || "Brak danych"}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-100 border">Status</th>
                <td className="px-4 py-2 text-left border">{product.statusDto?.name || "Brak statusu"}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-100 border">Notatki</th>
                <td className="px-4 py-2 text-left border">{product.notes || "Brak notatek"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
