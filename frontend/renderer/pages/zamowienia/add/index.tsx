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
  Package,
} from "lucide-react";
import axios from "axios";

export default function AddOrderForm() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [clientAddresses, setClientAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // To disable button during submission

  const [formData, setFormData] = useState({
    clientId: null,
    addressId: null,
    paymentStatus: "",
    deliveryDate: "",
    documentNumber: "", // Frontend will still send an empty string, backend will generate
    salePlace: "",
    statusId: null,
    // orderItems will now be managed separately for submission
  });

  const [orderItemsToAdd, setOrderItemsToAdd] = useState([]); // Separate state for items to add to the order

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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/client/all`);
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/products/all`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchOrderStatuses = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/status/all/order`);
      setStatuses(res.data);
    } catch (err) {
      console.error("Error fetching order statuses:", err);
    }
  };

  const fetchClientAddresses = async (clientId) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/address/one/${clientId}`
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
    setFormData((prev) => ({ ...prev, clientId: clientId, addressId: null }));
  };

  const handleProductSelectionChange = (e) => {
    const productId = e.target.value ? parseInt(e.target.value) : null;
    const product = products.find((p) => p.id === productId);
    setSelectedProductForOrderItem(product);
  };

  const handleQuantityChange = (e) => {
    setQuantityForOrderItem(parseInt(e.target.value));
  };

const handleAddOrderItemToList = () => {
  if (selectedProductForOrderItem && quantityForOrderItem > 0) {
    setOrderItemsToAdd((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === selectedProductForOrderItem.id
      );

      if (existingIndex !== -1) {
        // Produkt już istnieje — aktualizujemy ilość
        const updatedItems = [...prev];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantityForOrderItem,
        };
        return updatedItems;
      } else {
        // Nowy produkt — dodajemy
        return [
          ...prev,
          {
            productId: selectedProductForOrderItem.id,
            quantity: quantityForOrderItem,
            price: parseFloat(selectedProductForOrderItem.price),
          },
        ];
      }
    });

    // Reset picker
    setSelectedProductForOrderItem(null);
    setQuantityForOrderItem(1);
  }
};


  const handleRemoveOrderItemFromList = (indexToRemove) => {
    setOrderItemsToAdd((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const calculateTotalPrice = () => {
    return orderItemsToAdd.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  // --- New Submission Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create the Order (without items initially)
      const orderCreationPayload = {
        clientId: formData.clientId,
        addressId: formData.addressId,
        paymentStatus: formData.paymentStatus,
        deliveryDate: formData.deliveryDate,
        documentNumber: formData.documentNumber, // Still sent empty, backend generates
        salePlace: formData.salePlace,
        statusId: formData.statusId,
        price: calculateTotalPrice(), // Send total price of all items
      };

      console.log("Creating Order:", orderCreationPayload);
      const orderRes = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/api/orders/add`,
        orderCreationPayload
      );
      const newOrder = orderRes.data;

      // 2. Add Order Items using the newOrderId
    if (orderItemsToAdd.length > 0) {
      const orderItemsPayload = orderItemsToAdd.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price * item.quantity, // Ensure this is the per-item price
        order: newOrder, // Explicitly set the orderId here
      }));

      try {
        // Create an array of promises from all the axios.post calls
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/api/orderItems/add/list`,
          orderItemsPayload
        );

        console.log("All order items added successfully!");
              alert("Zamówienie utworzone pomyślnie!");
      window.close(); // Close window on successful submission
      } catch (error) {
        console.error("Error adding order items:", error);
        // Handle the error appropriately, e.g., show a user message
      }
    }


    } catch (err) {
      console.error(
        "Error creating order or adding items:",
        err.response ? err.response.data : err.message
      );
      alert("Błąd podczas tworzenia zamówienia: " + (err.response ? err.response.data.message : err.message));
    } finally {
      setIsLoading(false);
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
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Płatność</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <CreditCard className="w-4 h-4 text-gray-400" />
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="ml-2 w-full outline-none"
              required
            >
              <option value="">Wybierz metodę płatności</option>
              <option value="karta">Karta</option>
              <option value="gotówka">Gotówka</option>
              <option value="przelew">Przelew</option>
              <option value="blik">Blik</option>
            </select>
          </div>
        </div>


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
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Produkty w zamówieniu
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Wybierz Produkt
          </label>
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
          name="quantity"
          icon={<Layers className="w-4 h-4 text-gray-400" />}
          label="Ilość"
          type="number"
          value={quantityForOrderItem}
          onChange={handleQuantityChange}
          min="1"
        />
        <button
          type="button"
          onClick={handleAddOrderItemToList}
          disabled={!selectedProductForOrderItem || quantityForOrderItem <= 0}
          className="md:col-span-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryhover transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Dodaj produkt do zamówienia
        </button>
      </div>

      {/* Table of added products */}
      {orderItemsToAdd.length > 0 && (
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
              {orderItemsToAdd.map((item, index) => {
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
                        onClick={() => handleRemoveOrderItemFromList(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-right text-base font-bold text-gray-900"
                >
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
        disabled={isLoading} // Disable button while loading
        className="mt-6 w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <CheckCircle className="w-5 h-5" />
        )}
        {isLoading ? "Zapisywanie..." : "Zapisz zamówienie"}
      </button>
    </form>
  );
}

// --- Reusable LabeledInput and TextareaInput (from your original code) ---
function LabeledInput({
  icon,
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  min = null,
  disabled = false,
}) {
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