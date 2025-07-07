import { useRef, useState } from "react";

export default function ProductPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const handleDotClick = (index: number) => {
    const container = carouselRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth;
      const pages = 3; // 3 dots
      const targetScrollLeft = (scrollWidth / pages) * index;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });

      setActivePage(index);
    }
  };

  return (
    <div className="p-10">
      <div className="bg-white rounded-xl w-full shadow-md">
        {/* Image Carousel */}
        <div className="overflow-hidden rounded-t-xl">
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden gap-3 snap-x snap-mandatory scroll-smooth scrollbar-hide transition-all duration-300"
          >
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className="min-w-[33.3333%] h-64 bg-gray-300 snap-start transition-transform duration-500 ease-out"
              />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center my-4 space-x-2">
          {[0, 1, 2].map((dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => handleDotClick(dotIdx)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                activePage === dotIdx ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="flex justify-between items-center px-6 pb-6">
          <div>
            <h2 className="text-lg font-medium">Lenovo H2</h2>
            <p className="text-gray-500 text-sm">Laptopy</p>
          </div>
          <div className="text-xl font-bold">50 000 zł</div>
        </div>
        
        {/* Product description */}

        <p className="px-10 py-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus autem repellat nam voluptates enim nihil, dolorum corrupti similique perferendis, quibusdam eveniet earum iste? Expedita in quos nobis velit minima quaerat. Temporibus accusantium accusamus cupiditate repellat in nesciunt quis, illum ducimus voluptatibus porro qui facere? Delectus deserunt assumenda repellendus iure quo ipsam eveniet dolores fugiat dignissimos cumque architecto consectetur possimus doloribus mollitia tempora maiores magnam, commodi rem, quae minus harum consequuntur facere officiis a! Veritatis unde cumque nulla accusantium veniam porro, aliquid sapiente minima tempore aspernatur, consequatur voluptatibus neque! Mollitia nostrum numquam amet sed rerum eveniet saepe est ducimus debitis cumque?</p>

        {/* Product info table */}
        <div className="w-full px-5 pb-10 flex justify-center ">
            <table className="min-w-[60%] text-sm border rounded-lg">
                <tr>
                    <th className="px-4 py-2 text-left bg-gray-100 border">Nazwa</th>
                    <td className="px-4 py-2 text-left border">name</td>
                </tr>
                                <tr>
                    <th className="px-4 py-2 text-left bg-gray-100 border">SKU</th>
                    <td className="px-4 py-2 text-left border">123FF</td>
                </tr>
                                <tr>
                    <th className="px-4 py-2 text-left bg-gray-100 border">Waga</th>
                    <td className="px-4 py-2 text-left border">weight</td>
                </tr>
                                <tr>
                    <th className="px-4 py-2 text-left bg-gray-100 border">Wymiary</th>
                    <td className="px-4 py-2 text-left border">dimensions</td>
                </tr>
                                <tr>
                    <th className="px-4 py-2 text-left bg-gray-100 border">Dodano</th>
                    <td className="px-4 py-2 text-left border">07-07-2025</td>
                </tr>
                                <tr>
                    <th className="px-4 py-2 text-left bg-gray-100 border">Status</th>
                    <td className="px-4 py-2 text-left border">Aktywny</td>
                </tr>
                                <tr>
                    <th className="px-4 py-2 text-left bg-gray-100 border">Notatki</th>
                    <td className="px-4 py-2 text-left border">note</td>
                </tr>
            </table>
        </div>
      </div>
    </div>
  );
}
