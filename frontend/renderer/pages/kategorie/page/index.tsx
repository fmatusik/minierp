export default function CategoryPage() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Purple Header */}
      <div className="relative bg-purple-600 h-28 rounded-t-2xl">
        <div className="absolute left-1/4 -bottom-6 transform -translate-x-1/2 bg-white rounded-full p-4 shadow">
          {/* Cube Icon (using emoji placeholder, replace with SVG/icon as needed) */}
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

      {/* Content Section */}
      <div className="pt-12 px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Laptopy</h2>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-purple-600 rounded-full" />
            <button className="border border-black rounded-full px-4 py-1 text-sm font-bold">
              Edytuj
            </button>
          </div>
        </div>

        {/* Product Boxes */}
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-gray-300 rounded-lg" />
          <div className="h-24 bg-gray-300 rounded-lg" />
          <div className="h-24 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
