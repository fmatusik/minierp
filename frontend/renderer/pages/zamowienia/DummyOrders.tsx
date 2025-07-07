const dummyOrders = [
  {
    id: "ORD-001",
    client: {
      id:1,
      name: "ABCDEF",
      notes: "notka"
    },
    status: {
      id: 1,
      name: "W realizacji"
    },
    totalPrice: "12300",
    data: {
      createdAt: "2025-06-07",
    },
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
    address: {
      province: "Małopolska",
      city: "Kraków",
      street: "Opolska",
      buildingNumber: 18,
      apartmentNumber: 1,
      postalCode: "31-216"
    },
    products: [
      {
        id: "prod-1",
        image: "test",
        name: "Lenovo h25",
        category: "Laptopy",
        price: 50000,
        status: "Aktywny"
      },      
      {
        id: "prod-1",
        image: "test",
        name: "Lenovo h25",
        category: "Laptopy",
        price: 50000,
        status: "Aktywny"
      },      
      {
        id: "prod-1",
        image: "test",
        name: "Lenovo h25",
        category: "Laptopy",
        price: 50000,
        status: "Aktywny"
      }
    ],
    price: 15000,
    /*stockMovements: [
      {
        id: 1,
        data: {
          id: 1,
          createdAt: "07-07-2025",
          deletedAt: null,
          updatedAt: "07-07-2025"
        },

      }
    ]*/

  },
  {
    id: "ORD-002",
    client: {
      id:2,
      name: "XYZ S.A",
      notes: "notka"
    },
    status: {
      id: 2,
      name: "Zrealizowane"
    },
    totalPrice: "4700",
    data: {
      createdAt: "2025-05-25",
    },
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
    address: {
      province: "Małopolska2",
      city: "Kraków2",
      street: "Opolska2",
      buildingNumber: 182,
      apartmentNumber: 12,
      postalCode: "31-2162r"
    },
    products: [
      {
        id: "prod-1",
        image: "test",
        name: "Lenovo h25",
        category: "Laptopy",
        price: 50000,
        status: "Aktywny"
      }
    ]
  },
  // Dodaj więcej danych testowych dla pełnego działania lazy loadingu
  ...Array.from({ length: 200 }, (_, i) => ({
    id: `ORD-${i + 3}`,
    client: {
      id:i+3,
      name: `Firma ${i+3}`,
      notes: "notka"
    },
    status: i % 3 === 0 
      ? { id: 1, name: "W realizacji" } 
      : i % 3 === 1 
        ? { id: 2, name: "Zrealizowane" } 
        : { id: 3, name: "Anulowane" },
    totalPrice: `${(Math.random() * 10000 + 1000).toFixed(0)}`,
    data: {
      createdAt: `2025-06-${String((i % 30) + 1).padStart(2, "0")}`,
    },
    deliveryDate: `2025-07-${String((i % 30) + 1).padStart(2, "0")}`,
    paymentStatus: i % 2 === 0 ? "Opłacone" : "Nieopłacone",
    address: {
      province: "Małopolska",
      city: "Kraków",
      street: "Opolska",
      buildingNumber: 18,
      apartmentNumber: 1,
      postalCode: "31-216"
    },
    products: [
      {
        id: "prod-1",
        image: "test",
        name: "Lenovo h25",
        category: "Laptopy",
        price: 50000,
        status: "Aktywny"
      }
    ]
  })),
];

export default dummyOrders;