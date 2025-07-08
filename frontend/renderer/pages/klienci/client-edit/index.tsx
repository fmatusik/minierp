import React, { useEffect, useState } from "react";

const dummyClients = [
  {
    id: 1,
    firstName: "XYZ",
    lastName: "S.A",
    email: "jan.kowalski@example.com",
    phone: "+48 123 456 789",
    status: "Aktywny",
    companyContacts: [
      { name: "Kontakt 1", email: "kontakt1@firma.com", phone: "+48 111 222 333" },
      { name: "Kontakt 2", email: "kontakt2@firma.com", phone: "+48 444 555 666" },
    ],
  },
  {
    id: 2,
    firstName: "Anna",
    lastName: "Nowak",
    email: "anna.nowak@example.com",
    phone: "+48 987 654 321",
    status: "Nieaktywny",
    companyContacts: [],
  },
  {
    id: 3,
    firstName: "Marek",
    lastName: "Wiśniewski",
    email: "marek.w@example.com",
    phone: "+48 555 123 456",
    status: "Aktywny",
    companyContacts: [
      { name: "Dział IT", email: "it@firma.com", phone: "+48 999 000 111" },
    ],
  },
];

export default function ClientEditPage() {
  const [client, setClient] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = parseInt(urlParams.get("id"));
    const foundClient = dummyClients.find((c) => c.id === clientId);
    if (foundClient) {
      setClient({ ...foundClient });
      setContacts(foundClient.companyContacts || []);
    }
  }, []);

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

  if (!client) {
    return (
      <div className="grid place-items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Ładowanie...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-gray-800">
        Edytuj klienta:{" "}
        <span className="text-primary">{client.firstName} {client.lastName}</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
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

      <div className="text-right">
        <button className="mt-6 bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-xl transition">
          Zapisz zmiany
        </button>
      </div>
    </div>
  );
}
