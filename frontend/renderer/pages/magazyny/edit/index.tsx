import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  MapPin,
  Layers,
  Package,
  CheckCircle,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

// Typy magazynów
const warehouseTypes = [
  { label: "Magazyn regionalny", value: "REGIONAL" },
  { label: "Magazyn centralny", value: "CENTRAL" },
  { label: "Centrum dystrybucyjne", value: "DISTRIBUTION" },
  { label: "Magazyn przy produkcji", value: "PRODUCTION" },
  { label: "Magazyn zwrotów", value: "RETURNS" },
  { label: "Magazyn przeładunkowy", value: "TRANSIT" },
  { label: "Magazyn tymczasowy", value: "TEMPORARY" },
];

export default function EditWarehouseForm() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Warehouse state
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [addressId, setAddressId] = useState(null);

  // Address state
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [addressData, setAddressData] = useState({});
    const [warehouseId, setWarehouseId] = useState(null);

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  if (!isNaN(id)) {
    setWarehouseId(id);
  }
}, []);



  // Fetch warehouse data on mount
  useEffect(() => {
    if(!warehouseId) return;

    const fetchData = async () => {
      try {
        const resWarehouse = await axios.get(
          `http://localhost:8080/api/warehouse/one/${warehouseId}`
        );
        const warehouse = resWarehouse.data;
        setName(warehouse.name);
        setCapacity(warehouse.capacity);
        setType(warehouse.type);
        setAddressId(warehouse.addressDto.id);

        const address = warehouse.addressDto;
        setStreet(address.street);
        setBuildingNumber(address.buildingNumber);
        setApartmentNumber(address.apartmentNumber || "");
        setPostalCode(address.postalCode);
        setCity(address.city);
        setProvince(address.province);
        setAddressData(address.data)
      } catch (err) {
        console.error(err);
        alert("Nie udało się pobrać danych magazynu");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [warehouseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const addressBody = {
        id: addressId,
        street,
        buildingNumber,
        apartmentNumber: apartmentNumber || null,
        postalCode,
        city,
        province,
        data: addressData, 
      };

      // 1. Update address
      await axios.put(
        `http://localhost:8080/api/address/update/${addressId}`,
        addressBody
      );

      // 2. Update warehouse
      const warehouseBody = {
        name,
        capacity: Number(capacity),
        type,
        addressId,
      };

      await axios.put(
        `http://localhost:8080/api/warehouse/update/${warehouseId}`,
        warehouseBody
      );

      alert("Magazyn został zaktualizowany pomyślnie!");
      window.close();
    } catch (err) {
      console.error(err);
      alert("Wystąpił problem podczas aktualizacji");
      window.close();
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <p className="text-center text-gray-500">Ładowanie danych...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md border"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edytuj magazyn</h2>

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

      <h3 className="text-xl font-bold text-gray-800 mb-4">Edytuj adres magazynu</h3>

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
        {loading ? "Aktualizowanie..." : "Zapisz zmiany"}
      </button>
    </form>
  );
}

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
