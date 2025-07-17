import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Calendar,
  CreditCard,
  ShoppingBag,
  PlusCircle,
  XCircle,
  CheckCircle,
  Layers,
  Package,
  Warehouse,
  Repeat,
  Notebook,
} from "lucide-react";
import axios from "axios";

export default function AddStockMovementForm() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [clientAddresses, setClientAddresses] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    movementType: "",
    warehouseSourceId: null,
    warehouseTargetId: null,
    clientId: null,
    manualClientName: "",
    addressId: null,
    paymentStatus: "",
    deliveryDate: "",
    documentNumber: "",
    salePlace: "",
    statusId: null,
    relatedOrderId: "",
    notes: "",
  });

  const [orderItemsToAdd, setOrderItemsToAdd] = useState([]);
  const [selectedProductForOrderItem, setSelectedProductForOrderItem] = useState(null);
  const [quantityForOrderItem, setQuantityForOrderItem] = useState(1);



  useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchOrderStatuses();
    fetchWarehouses();
    fetchOrders();
  }, []);

  useEffect(() => {
    if (formData.clientId) fetchClientAddresses(formData.clientId);
    else setClientAddresses([]);
  }, [formData.clientId]);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/client/all");
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  const fetchOrders = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/orders/all");
        setOrders(res.data);
    }catch(err) {
        console.error(err);
    }
  }

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/warehouse/all");
      setWarehouses(res.data);
    } catch (err) {
      console.error("Error fetching warehouses:", err);
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
      const res = await axios.get("http://localhost:8080/api/status/all/order");
      setStatuses(res.data);
    } catch (err) {
      console.error("Error fetching statuses:", err);
    }
  };

  const fetchClientAddresses = async (clientId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/address/one/${clientId}`);
      setClientAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value ? parseInt(e.target.value) : null;
    setFormData((prev) => ({
      ...prev,
      clientId,
      manualClientName: "", // Clear manual name if client selected
      addressId: null,
    }));
  };

  const handleProductSelectionChange = (e) => {
    const productId = parseInt(e.target.value);
    const product = products.find((p) => p.id === productId);
    setSelectedProductForOrderItem(product);
  };

  const handleQuantityChange = (e) => setQuantityForOrderItem(parseInt(e.target.value));

  const handleAddOrderItemToList = () => {
    if (selectedProductForOrderItem && quantityForOrderItem > 0) {
      setOrderItemsToAdd((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.productId === selectedProductForOrderItem.id
        );

        if (existingIndex !== -1) {
          const updatedItems = [...prev];
          const existingItem = updatedItems[existingIndex];
          updatedItems[existingIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantityForOrderItem,
          };
          return updatedItems;
        }

        return [
          ...prev,
          {
            productId: selectedProductForOrderItem.id,
            quantity: quantityForOrderItem,
            price: parseFloat(selectedProductForOrderItem.price),
          },
        ];
      });

      setSelectedProductForOrderItem(null);
      setQuantityForOrderItem(1);
    }
  };

  const handleRemoveOrderItemFromList = (index) => {
    setOrderItemsToAdd((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateTotalPrice = () => {
    return orderItemsToAdd.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    handleAddStockMovement();

    setIsLoading(false);


  };


  const handleAddStockMovement = () => {
    const stockMovementBody = {
        note: formData.notes,
        relatedOrderId: formData.relatedOrderId ? parseInt(formData.relatedOrderId) : null,
        sourceWarehouseId: formData.warehouseSourceId ? parseInt(formData.warehouseSourceId) : null,
        targetWarehouseId: formData.warehouseTargetId ? parseInt(formData.warehouseTargetId) : null,
        type: formData.movementType
    };
    console.log(stockMovementBody);


    axios.post("http://localhost:8080/api/stockMovements/add", stockMovementBody)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err);
        alert("Wystąpił nieoczekiwany problem w trakcie dodawania ruchu magazynowego");
    })
  }

  const handleAddStockMovementItems = () => {
    const stockMovementItemsBody = orderItemsToAdd;

    axios.post("http://localhost:8080/api/stockMovementItems/add", stockMovementItemsBody)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err);
        alert("Wystąpił nieoczekiwany problem w trakcie dodawania zamawianych produktów");
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Nowy ruch magazynowy</h2>

      {/* Movement Type */}
      <SelectField
        label="Typ Ruchu"
        name="movementType"
        icon={<Repeat className="w-4 h-4 text-gray-400" />}
        value={formData.movementType}
        onChange={handleChange}
        options={[
          { value: "RECEPTION", label: "Przyjęcie" },
          { value: "RELEASE", label: "Wydanie" },
          { value: "SHIFT", label: "Przesunięcie" },
        ]}
        required={true}
      />

      {/* Warehouses and Client Depending on Movement Type */}
      {(formData.movementType === "RECEPTION" || formData.movementType === "RELEASE") && (
        <>
          <SelectField
            label="Magazyn źródłowy"
            name="warehouseSourceId"
            icon={<Warehouse className="w-4 h-4 text-gray-400" />}
            value={formData.warehouseSourceId || ""}
            onChange={handleChange}
            options={warehouses.map((w) => ({ value: w.id, label: w.name }))}
            required={false}
          />

        {(formData.movementType === "RELEASE") && (
            <>
            <SelectField
            label="Powiązanie zamówienie"
            name="relatedOrderId"
            icon={<Package className="w-4 h-4 text-gray-400"/>}
            value={formData.relatedOrderId || ""}
            options={orders.map((o) => ({ value: o.id, label: o.documentNumber}))}
            onChange={handleChange}
            required={false}
            />
            <LabeledInput
              label="Nazwa kontrahenta (opcjonalnie)"
              name="manualClientName"
              icon={<User className="w-4 h-4 text-gray-400" />}
              value={formData.manualClientName}
              onChange={handleChange}
            />
            </>
          )}

        {(formData.movementType === "RECEPTION") && (
        <>
          <SelectField
            label="Kontrahent"
            name="clientId"
            icon={<User className="w-4 h-4 text-gray-400" />}
            value={formData.clientId || ""}
            required={false}
            onChange={handleClientChange}
            options={clients.map((c) => ({ value: c.id, label: c.name }))}
          />
            {!formData.clientId && (
                <LabeledInput
                label="Nazwa kontrahenta"
                name="manualClientName"
                icon={<User className="w-4 h-4 text-gray-400" />}
                value={formData.manualClientName}
                onChange={handleChange}
                required
                />
            )}

            </>
        )}


        </>
      )}

      {formData.movementType === "SHIFT" && (
        <>
          <SelectField
            label="Magazyn źródłowy"
            name="warehouseSourceId"
            icon={<Warehouse className="w-4 h-4 text-gray-400" />}
            value={formData.warehouseSourceId || ""}
            required={true}
            onChange={handleChange}
            options={warehouses.map((w) => ({ value: w.id, label: w.name }))}
          />

          <SelectField
            label="Magazyn docelowy"
            name="warehouseTargetId"
            icon={<Warehouse className="w-4 h-4 text-gray-400" />}
            value={formData.warehouseTargetId || ""}
            required={true}
            onChange={handleChange}
            options={warehouses.map((w) => ({ value: w.id, label: w.name }))}
          />
        </>
      )}
      <TextareaInput
      label="Notakti"
      name="notes"
      icon={<Notebook className="w-4 h-4 text-gray-400"/>}
      value={formData.notes || ""}
      onChange={handleChange}
      />


      {/* Product Selection */}
      <h3 className="text-xl font-bold mt-6">Produkty</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <SelectField
          label="Produkt"
          name="product"
          icon={<Package className="w-4 h-4 text-gray-400" />}
          value={selectedProductForOrderItem?.id || ""}
          required={false}
          onChange={handleProductSelectionChange}
          options={products.map((p) => ({ value: p.id, label: `${p.name} - ${p.price.toFixed(2)} zł` }))}
        />
        <LabeledInput label="Ilość" icon={<Layers />} type="number" min={1} value={quantityForOrderItem} onChange={handleQuantityChange} />
        <button
          type="button"
          onClick={handleAddOrderItemToList}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primaryhover flex justify-center items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Dodaj
        </button>
      </div>

      {/* Order Items Table */}
      {orderItemsToAdd.length > 0 && (
        <div className="mt-4">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Produkt</th>
                <th>Ilość</th>
                <th>Cena</th>
                <th>Łącznie</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderItemsToAdd.map((item, i) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <tr key={i}>
                    <td className="px-4 py-2">{product?.name || item.productId}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toFixed(2)} zł</td>
                    <td>{(item.price * item.quantity).toFixed(2)} zł</td>
                    <td>
                      <button onClick={() => handleRemoveOrderItemFromList(i)} className="text-red-500">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="3" className="text-right font-bold">Suma:</td>
                <td colSpan="2" className="font-bold">{calculateTotalPrice().toFixed(2)} zł</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 flex justify-center items-center gap-2">
        {isLoading ? <span>Zapisywanie...</span> : <><CheckCircle className="w-5 h-5" /> Zapisz</>}
      </button>
    </form>
  );
}

function LabeledInput({ icon, label, name, value, onChange, type = "text", required = false, min = null }) {
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
        />
      </div>
    </div>
  );
}

function SelectField({ icon, label, name, value, onChange, options, required }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2">
        {icon}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="ml-2 w-full outline-none"
          required={required}
        >
          <option value="">Wybierz...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
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
