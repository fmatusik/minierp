// components/Popup.tsx
import { X } from "lucide-react";
//example of using popup:https://chatgpt.com/c/6876984b-aa04-800f-af6c-33eea8781570
export default function Popup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-2xl shadow-xl w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>
        <p className="text-center text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
