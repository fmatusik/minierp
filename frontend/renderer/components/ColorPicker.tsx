import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const tailwindColors = [
  "bg-green-200",
  "bg-yellow-200",
  "bg-orange-200",
  "bg-red-100",
  "bg-purple-100",
  "bg-blue-100",
  "bg-cyan-200",
  "bg-lime-200",
  "bg-pink-100",
  "bg-gray-100",
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
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {/* Popup */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded shadow-lg p-3 z-50">
          <div className="grid grid-cols-5 gap-2">
            {tailwindColors.map((color) => (
              <button
                type="button"
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
