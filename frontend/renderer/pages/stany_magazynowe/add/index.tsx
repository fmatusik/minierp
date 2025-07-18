import React, { useEffect, useState } from "react";
import {
  Package,
  User,
  Warehouse,
  Layers,
  CheckCircle,
} from "lucide-react";
import axios from 'axios';

export default function AddStockForm() {
  const [warehouseId, setWarehouseId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minStock, setMinStock] = useState("");
  const [loading, setLoading] = useState(false);
    const[warehouses, setWarehouses] = useState([]);
    const[products, setProducts] = useState([]);

  const fetchWarehouses = () => {
    axios.get("http://localhost:8080/api/warehouse/all")
    .then((res) => {
        setWarehouses(res.data);
    })
    .catch((err) => {
        console.error(err);
        alert("Wystąpił nieoczekiwany problem w trakcie ładowania magazynów");
        //window.close();
    })
  }

  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/products/all")
    .then((res) => {
        setProducts(res.data);
    })
    .catch((err) => {
        console.error(err);
        alert("Wystąpił nieoczekiwany błąd w trakcie ładowania produktów");
        //window.close();
    })
  }

  useEffect(() => {
    fetchWarehouses();
    fetchProducts();
  }, []);



  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const stockLevelBody = {
    productId,
    warehouseId,
    quantity: Number(quantity),
    minimumQuantity: Number(minStock),
  };

  try {
    const response = await axios.get(`http://localhost:8080/api/stockLevels/checkIfExists/${stockLevelBody.productId}/${stockLevelBody.warehouseId}`);
    const exists = response.data;
    console.log(exists)
    if (!exists) {
      const res = await axios.post("http://localhost:8080/api/stockLevels/add", stockLevelBody);
      console.log(res.data);
      alert("Pomyślnie dodano stan magazynowy");
    } else {
      alert("Istnieje już taki stan magazynowy!");
    }
  } catch (err) {
    console.error(err);
    alert("Wystąpił nieoczekiwany problem w trakcie dodawania magazynu");
  } finally {
    setLoading(false);
    window.close();
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md border"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dodaj stan magazynowy</h2>

      {/* Magazyn */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Magazyn</label>
        <div className="flex items-center border rounded-md px-3 py-2">
          <Warehouse className="w-4 h-4 text-gray-400" />
          <select
            className="ml-2 w-full outline-none"
            required
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
          >
            <option value="">Wybierz magazyn</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Produkt</label>
        <div className="flex items-center border rounded-md px-3 py-2">
          <User className="w-4 h-4 text-gray-400" />
          <select
            className="ml-2 w-full outline-none"
            required
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Wybierz product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (SKU: {p.sku})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ilość i minimalny stan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          icon={<Layers />}
          label="Ilość (szt.)"
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <LabeledInput
          icon={<Package />}
          label="Minimalny stan (szt.)"
          type="number"
          min="0"
          value={minStock}
          onChange={(e) => setMinStock(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`mt-6 w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <CheckCircle className="w-5 h-5" />
        {loading ? "Dodawanie..." : "Dodaj stan"}
      </button>
    </form>
  );
}

function LabeledInput({ icon, label, type = "text", min = null, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2">
        {icon}
        <input
          type={type}
          className="ml-2 w-full outline-none"
          min={min}
          required
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
