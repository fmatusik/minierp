    import React, { useState, useEffect } from "react";
    import { Tag, FileText, Package, Clipboard, DollarSign, Weight, Layers, CheckCircle } from "lucide-react";
    import axios from 'axios';



    export default function AddProductForm() {
    const [statuses, setStatuses] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        dimensions: "",
        notes: "",
        price: "",
        sku: "",
        weight: "",
        category: "",
        status: ""
    });

    useEffect(() => {
        fetchCategories();
        fetchStatuses();
    },[])
    
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Produkt do wysłania:", formData);
        // Tutaj możesz dodać wysyłkę przez axios
        axios.post("http://localhost:8080/api/products/add", formData)
        .then((res) => {
            window.close();
        })
        .catch((err) => {
            console.error(err);
        })
    };


    const fetchCategories = () => {
        axios.get("http://localhost:8080/api/category/all")
        .then((res) =>{
            console.log(res.data);
            setCategories(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    const fetchStatuses = () => {
        axios.get("http://localhost:8080/api/status/all/product")
        .then((res) => {
            console.log(res.data);
            setStatuses(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dodaj nowy produkt</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <LabeledInput
        icon={<Tag className="w-4 h-4 text-gray-400" />}
        label="Nazwa"
        name="name"
        value={formData.name}
        onChange={handleChange}
    />

    <LabeledInput
        icon={<Package className="w-4 h-4 text-gray-400" />}
        label="Wymiary"
        name="dimensions"
        value={formData.dimensions}
        onChange={handleChange}
    />

    <TextareaInput
        icon={<Clipboard className="w-4 h-4 text-gray-400" />}
        label="Opis"
        name="description"
        value={formData.description}
        onChange={handleChange}
    />

    <TextareaInput
        icon={<FileText className="w-4 h-4 text-gray-400" />}
        label="Notatka"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
    />

    <LabeledInput
        icon={<DollarSign className="w-4 h-4 text-gray-400" />}
        label="Cena"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
    />

    <LabeledInput
        icon={<Layers className="w-4 h-4 text-gray-400" />}
        label="SKU"
        name="sku"
        value={formData.sku}
        onChange={handleChange}
    />

    <LabeledInput
        icon={<Weight className="w-4 h-4 text-gray-400" />}
        label="Waga (kg)"
        name="weight"
        type="number"
        value={formData.weight}
        onChange={handleChange}
    />

    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Kategoria</label>
        <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary/50"
        >
        <option value="">Wybierz kategorię</option>
        {categories.map((cat) => (
            <option key={cat.id} value={cat}>{cat.name}</option>
        ))}
        </select>
    </div>

    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary/50"
        >
        <option value="">Wybierz status</option>
        {statuses.map((status) => (
            <option key={status.id} value={status.id}>{status.name}</option>
        ))}
        </select>
    </div>
    </div>


        <button
            type="submit"
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2"
        >
            <CheckCircle className="w-5 h-5" />
            Zapisz produkt
        </button>
        </form>
    );
    }

    function LabeledInput({ icon, label, name, value, onChange, type = "text" }) {
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
            />
        </div>
        </div>
    );
    }



    function TextareaInput({ icon, label, name, value, onChange }) {
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
            />
        </div>
        </div>
    );
    }

