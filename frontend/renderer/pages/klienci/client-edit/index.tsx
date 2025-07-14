import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ClientEditPage() {
  const [clientId, setClientId] = useState(null);
  const [client, setClient] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ id: null, firstName: "", lastName: "", email: "", phoneNumber: "", position: "", clientId: clientId });
  
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    id: null,
    buildingNumber: "",
    apartmentNumber: "",
    postalCode: "",
    city: "",
    province: "",
    street: "",
    clientId: clientId,
  });


useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  if (!isNaN(id)) {
    setClientId(id);
  }
}, []);

useEffect(() => {
  if (!clientId) return;

  setNewContact((prev) => ({ ...prev, clientId }));
  setNewAddress((prev) => ({ ...prev, clientId }));

  axios
    .get(`http://localhost:8080/api/client/one/${clientId}`)
    .then((res) => {
      if (res.data) {
        setClient(res.data);
        setContacts(res.data.clientContactsDto || []);
        setAddresses(res.data.addressesDto || []);
        console.log(res.data)
        console.log(addresses)
      }
    })
    .catch((err) => {
      alert("Błąd podczas pobierania danych klienta: " + err);
    });
}, [clientId]);

  const handleContactAdd = () => {
    if(newContact != null){
      axios.post("http://localhost:8080/api/clientContact/add", newContact)
      .then((res) => {
        setNewContact((prev) => ({...prev, id:res.data.id}));
        addContact();
      }
      ).catch((err) => {
        alert(err);
      })
    }
  }

const handleAddressAdd = async () => {
  if (!newAddress) return;

  try {
    const res = await axios.post("http://localhost:8080/api/address/add", newAddress);
    console.log("Response data:", res.data);
    setNewAddress((prev) => ({ ...prev, id: res.data.id }));
    addAddress(); // Consider passing res.data.id if needed
  } catch (err) {
    alert(err);
  }
};

const handleContactChange = (index, field, value) => {
  const updated = [...contacts];
  updated[index][field] = value;
  setContacts(updated);
  updateContact(updated[index]); // aktualizuj kontakt na serwerze
};




  const addContact = () => {
    if (!newContact.firstName) return;
    setContacts([...contacts, newContact]);
    setNewContact({ firstName: "", lastName: "", email: "", phoneNumber: "", position: "", clientId: clientId, id:null });
    window.location.reload();
  };

  const removeContact = (contactId) => {
    if (!contactId) return alert("Contact ID is missing");
    axios.delete(`http://localhost:8080/api/clientContact/delete/${contactId}`)
    .then((res) => {
      window.location.reload()
    })
    .catch((err)=> alert(err));
  };


  const addAddress = () => {
    if (!newAddress.city || !newAddress.street) return;
    setAddresses([...addresses, newAddress]);
    setNewAddress({
      buildingNumber: "",
      apartmentNumber: "",
      postalCode: "",
      city: "",
      province: "",
      street: "",
      clientId: clientId,
      id: null,
    });

    window.location.reload();
  };

  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
    updateAddress(updated[index]); // aktualizuj adres na serwerze
  };
  
  const removeAddress = (addressId) => {
    if (!addressId) return alert("Address ID is missing");
    axios.delete(`http://localhost:8080/api/address/delete/${addressId}`)
    .then((res) => {
        window.location.reload();
      }
    ).catch((err) => alert(err));
  };

const updateContact = async (contact) => {
  if (!contact.id) return;
  try {
    await axios.put(`http://localhost:8080/api/clientContact/update/${contact.id}`, contact);
  } catch (err) {
    alert("Błąd podczas aktualizacji kontaktu: " + err);
  }
};

const updateAddress = async (address) => {
  if (!address.id) return;
  try {
    await axios.put(`http://localhost:8080/api/address/update/${address.id}`, address);
  } catch (err) {
    alert("Błąd podczas aktualizacji adresu: " + err);
  }
};

  
  const handleSaveChanges = async () => {
  try {
    await Promise.all([
      ...contacts.map(contact => updateContact(contact)),
      ...addresses.map(address => updateAddress(address))
    ]);
    alert("Zmiany zapisane pomyślnie");
  } catch (err) {
    alert("Błąd przy zapisie zmian: " + err);
  }
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
        Edytuj klienta: {client.name}
        <span className="text-primary"> {client.firstName} {client.lastName}</span>
      </h1>

      {/* Kontakty firmowe */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Kontakty firmowe</h2>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 items-center">
              <input type="text" className="input" placeholder="Imię" value={contact.firstName} onChange={(e) => handleContactChange(index, "firstName", e.target.value)} />
              <input type="text" className="input" placeholder="Nazwisko" value={contact.lastName} onChange={(e) => handleContactChange(index, "lastName", e.target.value)} />
              <input type="email" className="input" placeholder="Email" value={contact.email} onChange={(e) => handleContactChange(index, "email", e.target.value)} />
              <input type="text" className="input" placeholder="Telefon" value={contact.phoneNumber} onChange={(e) => handleContactChange(index, "phoneNumber", e.target.value)} />
            <input type="text" className="input" placeholder="Stanowisko" value={contact.position} onChange={(e) => handleContactChange(index, "position", e.target.value )} />
              <button onClick={() => removeContact(contact.id)} className="text-red-600 hover:text-red-700 transition text-sm underline">Usuń</button>
            </div>
          ))}
          <div className="flex flex-col md:flex-row gap-3 items-center mt-4">
            <input type="text" className="input" placeholder="Imię" value={newContact.firstName} onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })} />
            <input type="text" className="input" placeholder="Nazwisko" value={newContact.lastName} onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })} />
            <input type="email" className="input" placeholder="Email" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
            <input type="text" className="input" placeholder="Telefon" value={newContact.phoneNumber} onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })} />
            <input type="text" className="input" placeholder="Stanowisko" value={newContact.position} onChange={(e) => setNewContact({ ...newContact, position: e.target.value })} />
            <button onClick={handleContactAdd} className="bg-primary hover:bg-primaryhover text-white px-4 py-2 rounded-lg text-sm transition">Dodaj</button>
          </div>
        </div>
      </div>

      {/* Adresy */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Adresy</h2>
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-3 gap-3 items-center">
              <input type="text" className="input" placeholder="Ulica" value={address.street} onChange={(e) => handleAddressChange(index, "street", e.target.value)} />
              <input type="text" className="input" placeholder="Miasto" value={address.city} onChange={(e) => handleAddressChange(index, "city", e.target.value)} />
              <input type="text" className="input" placeholder="Kod pocztowy" value={address.postalCode} onChange={(e) => handleAddressChange(index, "postalCode", e.target.value)} />
              <input type="text" className="input" placeholder="Numer budynku" value={address.buildingNumber} onChange={(e) => handleAddressChange(index, "buildingNumber", e.target.value)} />
              <input type="text" className="input" placeholder="Numer mieszkania" value={address.apartmentNumber} onChange={(e) => handleAddressChange(index, "apartmentNumber", e.target.value)} />
              <input type="text" className="input" placeholder="Województwo" value={address.province} onChange={(e) => handleAddressChange(index, "province", e.target.value)} />
              <button onClick={() => removeAddress(address.id)} className="text-red-600 hover:text-red-700 transition text-sm underline col-span-2 md:col-span-1">Usuń</button>
            </div>
          ))}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            <input type="text" className="input" placeholder="Ulica" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} />
            <input type="text" className="input" placeholder="Miasto" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
            <input type="text" className="input" placeholder="Kod pocztowy" value={newAddress.postalCode} onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })} />
            <input type="text" className="input" placeholder="Numer budynku" value={newAddress.buildingNumber} onChange={(e) => setNewAddress({ ...newAddress, buildingNumber: e.target.value })} />
            <input type="text" className="input" placeholder="Numer mieszkania" value={newAddress.apartmentNumber} onChange={(e) => setNewAddress({ ...newAddress, apartmentNumber: e.target.value })} />
            <input type="text" className="input" placeholder="Województwo" value={newAddress.province} onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })} />
            <button onClick={handleAddressAdd} className="bg-primary hover:bg-primaryhover text-white px-4 py-2 rounded-lg text-sm transition col-span-2 md:col-span-1">Dodaj</button>
          </div>
        </div>
      </div>

      {/* Zapisz */}
      <div className="text-right">
        <button className="mt-6 bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-xl transition"   onClick={handleSaveChanges}>
          Zapisz zmiany
        </button>
      </div>
    </div>
  );
}
