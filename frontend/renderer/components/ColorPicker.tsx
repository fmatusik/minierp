import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const tailwindColors = [
  "bg-green-700",
  "bg-yellow-700",
  "bg-orange-700",
  "bg-red-600",
  "bg-purple-600",
  "bg-blue-600",
  "bg-cyan-700",
  "bg-lime-700",
  "bg-pink-600",
  "bg-gray-600",
];

export default function ColorPicker({ selectedColor, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Kropka */}
      <button
        className={clsx("w-5 h-5 rounded-full border-2", selectedColor)}
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {/* Popup */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded shadow-lg p-3 z-50">
          <div className="grid grid-cols-5 gap-2">
            {tailwindColors.map((color) => (
              <button
                key={color}
                className={clsx(
                  "w-6 h-6 rounded-full border-2",
                  color,
                  selectedColor === color ? "border-white" : "border-transparent"
                )}
                onClick={() => {
                  onSelect(color);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
