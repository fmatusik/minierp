import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  ShoppingBag,
  PlusCircle,
  XCircle,
  DollarSign,
  CheckCircle,
  Layers,
  Package
} from "lucide-react";
import axios from "axios";

export default function AddOrderForm() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]); // For order status
  const [clientAddresses, setClientAddresses] = useState([]);

  const [formData, setFormData] = useState({
    clientId: null,
    addressId: null, // This will be the ID of the selected address
    paymentStatus: "",
    deliveryDate: "", // YYYY-MM-DDTHH:MM format
    documentNumber: "",
    salePlace: "",
    statusId: null,
    orderItems: [], 
  });

  const [selectedProductForOrderItem, setSelectedProductForOrderItem] =
    useState(null);
  const [quantityForOrderItem, setQuantityForOrderItem] = useState(1);

  // --- Data Fetching ---
  useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchOrderStatuses();
  }, []);

  useEffect(() => {
    if (formData.clientId) {
      fetchClientAddresses(formData.clientId);
    } else {
      setClientAddresses([]);
      setFormData((prev) => ({ ...prev, addressId: null }));
    }
  }, [formData.clientId]);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/client/all");
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products/all");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchOrderStatuses = async () => {
    try {
      // Assuming you have an endpoint for order statuses, similar to product statuses
      const res = await axios.get("http://localhost:8080/api/status/all/order");
      setStatuses(res.data);
    } catch (err) {
      console.error("Error fetching order statuses:", err);
    }
  };

  const fetchClientAddresses = async (clientId) => {
    try {
      // Assuming an endpoint like /api/client/{clientId}/addresses
      const res = await axios.get(
        `http://localhost:8080/api/address/one/${clientId}`
      );
      setClientAddresses(res.data);
    } catch (err) {
      console.error("Error fetching client addresses:", err);
    }
  };

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value ? parseInt(e.target.value) : null;
    setFormData((prev) => ({ ...prev, clientId: clientId, addressId: null })); // Reset address when client changes
  };

  const handleProductSelectionChange = (e) => {
    const productId = e.target.value ? parseInt(e.target.value) : null;
    const product = products.find((p) => p.id === productId);
    setSelectedProductForOrderItem(product);
  };

  const handleQuantityChange = (e) => {
    setQuantityForOrderItem(parseInt(e.target.value));
  };

  const handleAddOrderItem = () => {
    if (selectedProductForOrderItem && quantityForOrderItem > 0) {
      const newItem = {
        productId: selectedProductForOrderItem.id,
        quantity: quantityForOrderItem,
        // Ensure price is a number and handle potential issues with float
        price: parseFloat(selectedProductForOrderItem.price),
      };

      setFormData((prev) => ({
        ...prev,
        orderItems: [...prev.orderItems, newItem],
      }));

      // Reset picker
      setSelectedProductForOrderItem(null);
      setQuantityForOrderItem(1);
    }
  };

  const handleRemoveOrderItem = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      orderItems: prev.orderItems.filter((_, index) => index !== indexToRemove),
    }));
  };

  const calculateTotalPrice = () => {
    return formData.orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const orderData = {
      clientId: formData.clientId,
      addressId: formData.addressId,
      paymentStatus: formData.paymentStatus,
      deliveryDate: formData.deliveryDate,
      documentNumber: formData.documentNumber,
      salePlace: formData.salePlace,
      statusId: formData.statusId,
      price: calculateTotalPrice(), // Calculate total price before sending
      orderItems: formData.orderItems,
    };

    console.log("Order data to send:", orderData);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/orders/add",
        orderData
      );
      console.log("Order created:", res.data);
      window.close(); // Close window on successful submission
    } catch (err) {
      console.error("Error creating order:", err.response ? err.response.data : err.message);
      alert("Error creating order: " + (err.response ? err.response.data.message : err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md border"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Utwórz nowe zamówienie
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Client Selection */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Klient</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <User className="w-4 h-4 text-gray-400" />
            <select
              name="clientId"
              value={formData.clientId || ""}
              onChange={handleClientChange}
              className="ml-2 w-full outline-none"
              required
            >
              <option value="">Wybierz klienta</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address Selection */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Adres</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <select
              name="addressId"
              value={formData.addressId || ""}
              onChange={handleChange}
              className="ml-2 w-full outline-none"
              required
              disabled={!formData.clientId || clientAddresses.length === 0}
            >
              <option value="">
                {formData.clientId
                  ? clientAddresses.length > 0
                    ? "Wybierz adres"
                    : "Brak adresów dla klienta"
                  : "Wybierz klienta najpierw"}
              </option>
              {clientAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {`${address.street} ${address.buildingNumber}${
                    address.apartmentNumber ? "/" + address.apartmentNumber : ""
                  }, ${address.postalCode} ${address.city}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Payment Status */}
        <LabeledInput
          icon={<CreditCard className="w-4 h-4 text-gray-400" />}
          label="Status Płatności"
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          required
        />

        {/* Delivery Date */}
        <LabeledInput
          icon={<Calendar className="w-4 h-4 text-gray-400" />}
          label="Data Dostawy"
          name="deliveryDate"
          type="datetime-local"
          value={formData.deliveryDate}
          onChange={handleChange}
          required
        />


        {/* Sale Place */}
        <LabeledInput
          icon={<ShoppingBag className="w-4 h-4 text-gray-400" />}
          label="Miejsce Sprzedaży"
          name="salePlace"
          value={formData.salePlace}
          onChange={handleChange}
          required
        />

        {/* Order Status */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Status Zamówienia
          </label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <CheckCircle className="w-4 h-4 text-gray-400" />
            <select
              name="statusId"
              value={formData.statusId || ""}
              onChange={handleChange}
              className="ml-2 w-full outline-none"
              required
            >
              <option value="">Wybierz status</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* --- Order Items Section --- */}
      <hr className="my-6 border-gray-200" />
      <h3 className="text-xl font-bold text-gray-800 mb-4">Produkty w zamówieniu</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Wybierz Produkt</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <Package className="w-4 h-4 text-gray-400" />
            <select
              value={selectedProductForOrderItem?.id || ""}
              onChange={handleProductSelectionChange}
              className="ml-2 w-full outline-none"
            >
              <option value="">Dodaj produkt</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (SKU: {product.sku}) -{" "}
                  {product.price.toFixed(2)} zł
                </option>
              ))}
            </select>
          </div>
        </div>
        <LabeledInput
          icon={<Layers className="w-4 h-4 text-gray-400" />}
          label="Ilość"
          type="number"
          value={quantityForOrderItem}
          onChange={handleQuantityChange}
          min="1"
          className="w-full"
        />
        <button
          type="button"
          onClick={handleAddOrderItem}
          disabled={!selectedProductForOrderItem || quantityForOrderItem <= 0}
          className="md:col-span-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Dodaj produkt do zamówienia
        </button>
      </div>

      {/* Table of added products */}
      {formData.orderItems.length > 0 && (
        <div className="mt-6 border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produkt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ilość
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cena za szt.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Łączna cena
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.orderItems.map((item, index) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product ? product.name : `Product ID: ${item.productId}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.price.toFixed(2)} zł
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(item.quantity * item.price).toFixed(2)} zł
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => handleRemoveOrderItem(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right text-base font-bold text-gray-900">
                  Suma całkowita:
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">
                  {calculateTotalPrice().toFixed(2)} zł
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button
        type="submit"
        className="mt-6 w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        Zapisz zamówienie
      </button>
    </form>
  );
}

// --- Reusable LabeledInput and TextareaInput (from your original code) ---
function LabeledInput({ icon, label, name, value, onChange, type = "text", required = false, min = null, disabled = false }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2">
        {icon}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="ml-2 w-full outline-none"
          required={required}
          min={min}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function TextareaInput({ icon, label, name, value, onChange, required = false }) {
  return (
    <div className="space-y-1 col-span-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-start border rounded-md px-3 py-2">
        <div className="pt-1">{icon}</div>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          className="ml-2 w-full outline-none resize-none"
          required={required}
        />
      </div>
    </div>
  );
}