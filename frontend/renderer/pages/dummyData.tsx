export const status = [
  { id: 1, name: 'Aktywny' },
  { id: 2, name: 'Nieaktywny' },
  { id: 3, name: 'W trakcie' },
  { id: 4, name: 'Zakończony' },
  { id: 5, name: 'Zamrożony' },
];

export const clients = [
  { id: 1, status: 1, name: 'Klient A', notes: 'Uwagi 1' },
  { id: 2, status: 2, name: 'Klient B', notes: 'Uwagi 2' },
  { id: 3, status: 1, name: 'Klient C', notes: 'Uwagi 3' },
  { id: 4, status: 3, name: 'Klient D', notes: 'Uwagi 4' },
  { id: 5, status: 1, name: 'Klient E', notes: 'Uwagi 5' },
];

export const clientContacts = [
  { id: 1, client: 1, email: 'anna@example.com', firstname: 'Anna', lastname: 'Nowak', phoneNumber: '123456789', position: 'Manager' },
  { id: 2, client: 1, email: 'piotr@example.com', firstname: 'Piotr', lastname: 'Kowalski', phoneNumber: '987654321', position: 'Asystent' },
  { id: 3, client: 2, email: 'ewa@example.com', firstname: 'Ewa', lastname: 'Wiśniewska', phoneNumber: '111222333', position: 'Specjalista' },
  { id: 4, client: 3, email: 'tomasz@example.com', firstname: 'Tomasz', lastname: 'Zieliński', phoneNumber: '444555666', position: 'Kierownik' },
  { id: 5, client: 4, email: 'karol@example.com', firstname: 'Karol', lastname: 'Szymański', phoneNumber: '777888999', position: 'Dyrektor' },
];

export const addresses = [
  { id: 1, clientContact: 1, name: 'ul. Kwiatowa 12', buildingNumber: '12A', city: 'Warszawa', province: 'Mazowieckie', postalCode: '00-001' },
  { id: 2, clientContact: 2, name: 'ul. Leśna 3', buildingNumber: '3B', city: 'Kraków', province: 'Małopolskie', postalCode: '30-002' },
  { id: 3, clientContact: 3, name: 'ul. Główna 5', buildingNumber: '5', city: 'Poznań', province: 'Wielkopolskie', postalCode: '60-003' },
  { id: 4, clientContact: 4, name: 'ul. Krótka 7', buildingNumber: '7C', city: 'Gdańsk', province: 'Pomorskie', postalCode: '80-004' },
  { id: 5, clientContact: 5, name: 'ul. Długa 9', buildingNumber: '9D', city: 'Wrocław', province: 'Dolnośląskie', postalCode: '50-005' },
];

export const categories = [
  { id: 1, product: 1, name: 'Elektronika' },
  { id: 2, product: 2, name: 'Odzież' },
  { id: 3, product: 3, name: 'Sport' },
  { id: 4, product: 4, name: 'Biuro' },
  { id: 5, product: 5, name: 'Ogród' },
];

export const products = [
  { id: 1, status: 1, dimensions: 10.5, price: 199.99, weight: 1.2, description: 'Tablet 10 cali', name: 'Tablet A1', notes: 'Best seller', sku: 'SKU001' },
  { id: 2, status: 1, dimensions: 5.2, price: 59.99, weight: 0.3, description: 'Koszulka sportowa', name: 'Koszulka X', notes: '', sku: 'SKU002' },
  { id: 3, status: 2, dimensions: 15.0, price: 999.99, weight: 3.0, description: 'Rower górski', name: 'Rower R2', notes: 'Nowy model', sku: 'SKU003' },
  { id: 4, status: 1, dimensions: 2.0, price: 19.99, weight: 0.1, description: 'Długopis żelowy', name: 'Długopis Gel', notes: '', sku: 'SKU004' },
  { id: 5, status: 1, dimensions: 30.0, price: 349.99, weight: 5.0, description: 'Kosiarka elektryczna', name: 'Kosiarka K5', notes: 'Promocja', sku: 'SKU005' },
];

export const images = [
  { id: 1, product: 1, isThumbnail: true, alt: 'Tablet A1', path: '/images/tablet_a1.jpg' },
  { id: 2, product: 2, isThumbnail: true, alt: 'Koszulka X', path: '/images/koszulka_x.jpg' },
  { id: 3, product: 3, isThumbnail: true, alt: 'Rower R2', path: '/images/rower_r2.jpg' },
  { id: 4, product: 4, isThumbnail: true, alt: 'Długopis Gel', path: '/images/dlugopis_gel.jpg' },
  { id: 5, product: 5, isThumbnail: true, alt: 'Kosiarka K5', path: '/images/kosiarka_k5.jpg' },
];

export const warehouses = [
  { id: 1, name: 'Magazyn Centralny', type: 1, capacity: 1000 },
  { id: 2, name: 'Magazyn Zachodni', type: 2, capacity: 800 },
  { id: 3, name: 'Magazyn Wschodni', type: 2, capacity: 600 },
  { id: 4, name: 'Magazyn Północny', type: 1, capacity: 700 },
  { id: 5, name: 'Magazyn Południowy', type: 1, capacity: 900 },
];

export const stockLevels = [
  { id: 1, product: 1, warehouse: 1, quantity: 50 },
  { id: 2, product: 2, warehouse: 2, quantity: 30 },
  { id: 3, product: 3, warehouse: 3, quantity: 15 },
  { id: 4, product: 4, warehouse: 4, quantity: 100 },
  { id: 5, product: 5, warehouse: 5, quantity: 20 },
];

export const stockMovements = [
  { id: 1, relatedOrder: null, note: 'Przyjęcie', sourceWarehouse: 1, targetWarehouse: 2 },
  { id: 2, relatedOrder: null, note: 'Przesunięcie', sourceWarehouse: 2, targetWarehouse: 3 },
  { id: 3, relatedOrder: null, note: 'Zwrot', sourceWarehouse: 3, targetWarehouse: 1 },
  { id: 4, relatedOrder: null, note: 'Reklamacja', sourceWarehouse: 4, targetWarehouse: 2 },
  { id: 5, relatedOrder: null, note: 'Wysyłka', sourceWarehouse: 5, targetWarehouse: 3 },
];

export const stockMovementItems = [
  { id: 1, product: 1, quantity: 5, stockMovement: 1 },
  { id: 2, product: 2, quantity: 10, stockMovement: 2 },
  { id: 3, product: 3, quantity: 2, stockMovement: 3 },
  { id: 4, product: 4, quantity: 20, stockMovement: 4 },
  { id: 5, product: 5, quantity: 1, stockMovement: 5 },
];

export const orderInfos = [
  { id: 1, address: 1, client: 1, deliveryDate: '2025-07-01T10:00:00Z', documentNumber: 1001, price: 200.00, notes: 'Pilne', salePlace: 'Warszawa' },
  { id: 2, address: 2, client: 2, deliveryDate: '2025-07-02T12:00:00Z', documentNumber: 1002, price: 300.00, notes: '', salePlace: 'Kraków' },
  { id: 3, address: 3, client: 3, deliveryDate: '2025-07-03T14:00:00Z', documentNumber: 1003, price: 150.00, notes: 'Na raty', salePlace: 'Poznań' },
  { id: 4, address: 4, client: 4, deliveryDate: '2025-07-04T16:00:00Z', documentNumber: 1004, price: 500.00, notes: '', salePlace: 'Gdańsk' },
  { id: 5, address: 5, client: 5, deliveryDate: '2025-07-05T18:00:00Z', documentNumber: 1005, price: 99.99, notes: '', salePlace: 'Wrocław' },
];

export const data = [
  { id: 1, createdAt: '2025-07-01T10:00:00Z', updatedAt: '2025-07-01T10:00:00Z' },
  { id: 2, createdAt: '2025-07-02T10:00:00Z', updatedAt: '2025-07-02T10:00:00Z' },
  { id: 3, createdAt: '2025-07-03T10:00:00Z', updatedAt: '2025-07-03T10:00:00Z' },
  { id: 4, createdAt: '2025-07-04T10:00:00Z', updatedAt: '2025-07-04T10:00:00Z' },
  { id: 5, createdAt: '2025-07-05T10:00:00Z', updatedAt: '2025-07-05T10:00:00Z' },
];
