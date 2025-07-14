import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ClientAddPage() {
  const [client, setClient] = useState({
    name: "",
    notes: "",
  });

  const router = useRouter(); // Correct Next.js hook

  const handleSave = () => {
    axios
      .post("http://localhost:8080/api/client/add", client)
      .then((res) => {
        const newClientId = res.data.id; // Ensure backend returns ID

      window.location.href = `/klienci/client-edit?id=${newClientId}`;
      })
      .catch((err) => {
        alert(`Błąd podczas dodawania klienta. ${err}`);
      });
  };






  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-gray-800">Dodaj nowego klienta</h1>

      <div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Nazwa</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
        </div>
        <br />
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium text-gray-700">Nazwa</label>
          <textarea 
            value={client.notes}
            onChange={(e) => setClient({ ...client, notes: e.target.value })}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
      </div>




      <div className="text-right">
        <button
          onClick={handleSave}
          className="mt-6 bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Dodaj klienta
        </button>
      </div>
    </div>
  );
}
