import React, { useState } from "react";
import axios from "axios";
import {
  User,
  MapPin,
  Layers,
  Package,
  CheckCircle,
} from "lucide-react";

// Warehouse types matching your backend enum with Polish labels
const warehouseTypes = [
  { label: "Magazyn regionalny", value: "REGIONAL" },
  { label: "Magazyn centralny", value: "CENTRAL" },
  { label: "Centrum dystrybucyjne", value: "DISTRIBUTION" },
  { label: "Magazyn przy produkcji", value: "PRODUCTION" },
  { label: "Magazyn zwrotów", value: "RETURNS" },
  { label: "Magazyn przeładunkowy", value: "TRANSIT" },
  { label: "Magazyn tymczasowy", value: "TEMPORARY" },
];

export default function AddWarehouseForm() {
  // Warehouse state
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");

  // Address state
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  // Loading state to disable button during submit
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const addressBody = {
        street,
        buildingNumber,
        apartmentNumber: apartmentNumber || null,
        postalCode,
        city,
        province,
      };

      // 1. Add address and get its ID
      const resAddress = await axios.post(
        "http://localhost:8080/api/address/add/warehouse",
        addressBody
      );

      const newAddressId = resAddress.data.id;

      // 2. Add warehouse with addressId
      const warehouseBody = {
        name,
        capacity: Number(capacity),
        type,
        addressDto: resAddress.data,
      };
    
      console.log(warehouseBody);

      const resWarehouse = await axios.post(
        "http://localhost:8080/api/warehouse/add",
        warehouseBody
      );

      console.log("Warehouse added:", resWarehouse.data);
      alert("Magazyn dodany pomyślnie!");

      // Optionally reset form
      setName("");
      setCapacity("");
      setType("");
      setStreet("");
      setBuildingNumber("");
      setApartmentNumber("");
      setPostalCode("");
      setCity("");
      setProvince("");
    } catch (err) {
      console.error(err);
      alert("Wystąpił problem podczas dodawania magazynu lub adresu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md border"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dodaj magazyn</h2>

      <LabeledInput
        icon={<User />}
        label="Nazwa magazynu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          icon={<Layers />}
          label="Pojemność (w m³)"
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Typ magazynu</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <Package className="w-4 h-4 text-gray-400" />
            <select
              className="ml-2 w-full outline-none"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Wybierz typ</option>
              {warehouseTypes.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      <h3 className="text-xl font-bold text-gray-800 mb-4">Dodaj adres magazynu</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          icon={<MapPin />}
          label="Ulica"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <LabeledInput
          icon={<MapPin />}
          label="Numer budynku"
          value={buildingNumber}
          onChange={(e) => setBuildingNumber(e.target.value)}
          required
        />
        <LabeledInput
          icon={<MapPin />}
          label="Numer mieszkania (opcjonalnie)"
          value={apartmentNumber}
          onChange={(e) => setApartmentNumber(e.target.value)}
          required={false}
        />
        <LabeledInput
          icon={<MapPin />}
          label="Kod pocztowy"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <LabeledInput
          icon={<MapPin />}
          label="Miasto"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <LabeledInput
          icon={<MapPin />}
          label="Województwo"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-6 w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <CheckCircle className="w-5 h-5" />
        {loading ? "Dodawanie..." : "Zapisz magazyn"}
      </button>
    </form>
  );
}

// LabeledInput component supporting value, onChange, and optional required prop
function LabeledInput({ icon, label, type = "text", min = null, value, onChange, required = true }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2">
        {icon}
        <input
          type={type}
          className="ml-2 w-full outline-none"
          min={min}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
