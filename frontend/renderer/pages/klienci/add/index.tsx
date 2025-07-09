import React, { useState } from "react";

export default function ClientAddPage() {
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "Aktywny",
  });

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });

  // Nowy stan dla adresów
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    apartmentNumber: "",
    buildingNumber: "",
    city: "",
    postalCode: "",
    province: "",
    street: "",
  });

  const handleContactChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const addContact = () => {
    if (!newContact.name) return;
    setContacts([...contacts, newContact]);
    setNewContact({ name: "", email: "", phone: "" });
  };

  const removeContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  // Zmiana adresu w liście
  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  // Dodanie nowego adresu
  const addAddress = () => {
    // Możesz dodać walidację, np. minimalnie ulica i miasto
    if (!newAddress.street || !newAddress.city) return;
    setAddresses([...addresses, newAddress]);
    setNewAddress({
      apartmentNumber: "",
      buildingNumber: "",
      city: "",
      postalCode: "",
      province: "",
      street: "",
    });
  };

  // Usunięcie adresu
  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const newClient = {
      ...client,
      companyContacts: contacts,
      addresses: addresses,
    };
    console.log("Dodany klient:", newClient);
    alert("Klient został dodany!");

    setClient({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      status: "Aktywny",
    });
    setContacts([]);
    setAddresses([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-gray-800">Dodaj nowego klienta</h1>

      {/* Dane klienta */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* ... pola klienta takie jak wcześniej ... */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Imię</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={client.firstName}
            onChange={(e) => setClient({ ...client, firstName: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Nazwisko</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={client.lastName}
            onChange={(e) => setClient({ ...client, lastName: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Telefon</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={client.phone}
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
          <select
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={client.status}
            onChange={(e) => setClient({ ...client, status: e.target.value })}
          >
            <option value="Aktywny">Aktywny</option>
            <option value="Nieaktywny">Nieaktywny</option>
          </select>
        </div>
      </div>

      {/* Kontakty firmowe */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Kontakty firmowe</h2>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 items-center">
              <input
                type="text"
                className="border border-gray-300 rounded-xl p-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-primary "
                placeholder="Nazwa"
                value={contact.name}
                onChange={(e) => handleContactChange(index, "name", e.target.value)}
              />
              <input
                type="email"
                className="border border-gray-300 rounded-xl p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Email"
                value={contact.email}
                onChange={(e) => handleContactChange(index, "email", e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-xl p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Telefon"
                value={contact.phone}
                onChange={(e) => handleContactChange(index, "phone", e.target.value)}
              />
              <button
                onClick={() => removeContact(index)}
                className="text-red-600 hover:text-red-700 transition text-sm underline"
              >
                Usuń
              </button>
            </div>
          ))}

          <div className="flex flex-col md:flex-row gap-3 items-center mt-4">
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nazwa"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              type="email"
              className="border border-gray-300 rounded-xl p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Telefon"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <button
              onClick={addContact}
              className="bg-primary hover:bg-primaryhover text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>

      {/* Sekcja adresów */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Adresy</h2>
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
              <input
                type="text"
                className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nr mieszkania"
                value={address.apartmentNumber}
                onChange={(e) => handleAddressChange(index, "apartmentNumber", e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nr budynku"
                value={address.buildingNumber}
                onChange={(e) => handleAddressChange(index, "buildingNumber", e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ulica"
                value={address.street}
                onChange={(e) => handleAddressChange(index, "street", e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Miasto"
                value={address.city}
                onChange={(e) => handleAddressChange(index, "city", e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Kod pocztowy"
                value={address.postalCode}
                onChange={(e) => handleAddressChange(index, "postalCode", e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Województwo"
                value={address.province}
                onChange={(e) => handleAddressChange(index, "province", e.target.value)}
              />
              <button
                onClick={() => removeAddress(index)}
                className="text-red-600 hover:text-red-700 transition text-sm underline col-span-full text-right"
              >
                Usuń
              </button>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center mt-4">
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nr mieszkania"
              value={newAddress.apartmentNumber}
              onChange={(e) => setNewAddress({ ...newAddress, apartmentNumber: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nr budynku"
              value={newAddress.buildingNumber}
              onChange={(e) => setNewAddress({ ...newAddress, buildingNumber: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ulica"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Miasto"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Kod pocztowy"
              value={newAddress.postalCode}
              onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Województwo"
              value={newAddress.province}
              onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
            />
            <button
              onClick={addAddress}
              className="bg-primary hover:bg-primaryhover text-white px-4 py-2 rounded-lg text-sm transition col-span-full md:col-auto"
            >
              Dodaj
            </button>
          </div>
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
