const addresses = [
  {
    id: 1,
    apartmentNumber: "12A",
    buildingNumber: "45",
    city: "Warsaw",
    postalCode: "00-001",
    province: "Masovian",
    data: {
      id: 1,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    apartmentNumber: "7B",
    buildingNumber: "22",
    city: "Krakow",
    postalCode: "30-002",
    province: "Lesser Poland",
    data: {
      id: 2,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    apartmentNumber: "3C",
    buildingNumber: "10",
    city: "Gdansk",
    postalCode: "80-003",
    province: "Pomeranian",
    data: {
      id: 3,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const clients = [
  {
    id: 1,
    name: "John Doe",
    notes: "Regular customer",
    status: {
      id: 1,
      name: "Aktywny",
      data: {
        id: 25,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    data: {
      id: 7,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    notes: "VIP client",
    status: {
      id: 2,
      name: "Nieaktywne",
      data: {
        id: 26,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    data: {
      id: 8,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    name: "Acme Corp",
    notes: "Corporate account",
    status: {
      id: 3,
      name: "Oczekujący",
      data: {
        id: 27,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    data: {
      id: 9,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const clientContacts = [
  {
    id: 1,
    client: {
      id: 1,
      name: "John Doe",
      notes: "Regular customer",
      status: {
        id: 1,
        name: "Aktywny",
        data: {
          id: 25,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 7,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+48 123 456 789",
    position: "Manager",
    data: {
      id: 10,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    client: {
      id: 2,
      name: "Jane Smith",
      notes: "VIP client",
      status: {
        id: 2,
        name: "Nieaktywne",
        data: {
          id: 26,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 8,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "+48 987 654 321",
    position: "Director",
    data: {
      id: 11,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    client: {
      id: 3,
      name: "Acme Corp",
      notes: "Corporate account",
      status: {
        id: 3,
        name: "Oczekujące",
        data: {
          id: 27,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 9,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    email: "contact@acmecorp.com",
    firstName: "Alice",
    lastName: "Brown",
    phoneNumber: "+48 555 555 555",
    position: "Account Manager",
    data: {
      id: 12,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const categories = [
  {
    id: 1,
    product: {
      id: "prod-1",
      dimensions: 15.5,
      price: 999.99,
      weight: 0.2,
      description: "Latest smartphone model",
      name: "Smartphone X",
      notes: "New release",
      sku: "SMX123",
      status: {
        id: 1,
        name: "Aktywny",
        data: {
          id: 25,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 22,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    name: "Electronics",
    data: {
      id: 4,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    product: {
      id: "prod-2",
      dimensions: 0.1,
      price: 29.99,
      weight: 0.15,
      description: "Cotton T-shirt",
      name: "Basic T-shirt",
      notes: "Available in multiple colors",
      sku: "TSH456",
      status: {
        id: 2,
        name: "Nieaktywne",
        data: {
          id: 26,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 23,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    name: "Clothing",
    data: {
      id: 5,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    product: {
      id: "prod-3",
      dimensions: 2.0,
      price: 19.99,
      weight: 0.5,
      description: "Bestselling novel",
      name: "Novel Y",
      notes: "Hardcover edition",
      sku: "NOV789",
      status: {
        id: 3,
        name: "Oczekujące",
        data: {
          id: 27,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 24,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    name: "Books",
    data: {
      id: 6,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const data = [
  {
    id: 1,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 2,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 3,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 4,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 5,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 6,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 7,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 8,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 9,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 10,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 11,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 12,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 13,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 14,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 15,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 16,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 17,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 18,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 19,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 20,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 21,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 22,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 23,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 24,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 25,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 26,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 27,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 28,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 29,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 30,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 31,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 32,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 33,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 34,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 35,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 36,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  },
  {
    id: 37,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  },
  {
    id: 38,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  },
  {
    id: 39,
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01"
  }
];

const images = [
  {
    id: 1,
    product: {
      id: "prod-1",
      dimensions: 15.5,
      price: 999.99,
      weight: 0.2,
      description: "Latest smartphone model",
      name: "Smartphone X",
      notes: "New release",
      sku: "SMX123",
      status: {
        id: 1,
        name: "Aktywny",
        data: {
          id: 25,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 22,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    isThumbnail: true,
    size: 102400,
    alt: "Smartphone front view",
    path: "https://cdn.thewirecutter.com/wp-content/media/2024/05/smartphone-2048px-1013.jpg",
    data: {
      id: 13,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    product: {
      id: "prod-2",
      dimensions: 0.1,
      price: 29.99,
      weight: 0.15,
      description: "Cotton T-shirt",
      name: "Basic T-shirt",
      notes: "Available in multiple colors",
      sku: "TSH456",
      status: {
        id: 2,
        name: "Nieaktywne",
        data: {
          id: 26,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 23,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    isThumbnail: false,
    size: 204800,
    alt: "T-shirt side view",
    path: "https://majors.pl/userdata/public/gfx/1344/417.jpg",
    data: {
      id: 14,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    product: {
      id: "prod-3",
      dimensions: 2.0,
      price: 19.99,
      weight: 0.5,
      description: "Bestselling novel",
      name: "Novel Y",
      notes: "Hardcover edition",
      sku: "NOV789",
      status: {
        id: 3,
        name: "Oczekujące",
        data: {
          id: 27,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 24,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    isThumbnail: true,
    size: 51200,
    alt: "Book cover",
    path: "https://t3.ftcdn.net/jpg/02/16/67/50/360_F_216675048_39petQYPtJ9cv5ycUg1LOmCtcNCoqtdk.jpg",
    data: {
      id: 15,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const orders = [
  {
    id: `ORD-${1001}`,
    client: {
      id: 1,
      name: "John Doe",
      notes: "Regular customer",
      status: {
        id: 1,
        name: "Aktywny",
        data: {
          id: 25,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 7,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    status: {
      id: 1,
      name: "Aktywny"
    },
    totalPrice: "1500",
    data: {
      id: 16,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    },
    deliveryDate: "2025-07-10",
    paymentStatus: "Opłacone",
    address: {
      id: 1,
      apartmentNumber: "12A",
      buildingNumber: "45",
      city: "Warsaw",
      postalCode: "00-001",
      province: "Masovian",
      data: {
        id: 1,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    products: [
      {
        id: "prod-1",
        image: "/images/smartphone.jpg",
        name: "Smartphone X",
        category: "Electronics",
        price: 999.99,
        status: "Aktywny",
        dimensions: 15.5,
        weight: 0.2,
        description: "Latest smartphone model",
        notes: "New release",
        sku: "SMX123",
        data: {
          id: 22,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      }
    ],
    salePlace: "Online"
  },
  {
    id: `ORD-${1002}`,
    client: {
      id: 2,
      name: "Jane Smith",
      notes: "VIP client",
      status: {
        id: 2,
        name: "Nieaktywne",
        data: {
          id: 26,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 8,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    status: {
      id: 2,
      name: "Nieaktywne"
    },
    totalPrice: "800",
    data: {
      id: 17,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    },
    deliveryDate: "2025-07-15",
    paymentStatus: "Opłacone",
    address: {
      id: 2,
      apartmentNumber: "7B",
      buildingNumber: "22",
      city: "Krakow",
      postalCode: "30-002",
      province: "Lesser Poland",
      data: {
        id: 2,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    products: [
      {
        id: "prod-2",
        image: "/images/tshirt.jpg",
        name: "Basic T-shirt",
        category: "Clothing",
        price: 29.99,
        status: "Nieaktywne",
        dimensions: 0.1,
        weight: 0.15,
        description: "Cotton T-shirt",
        notes: "Available in multiple colors",
        sku: "TSH456",
        data: {
          id: 23,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      }
    ],
    salePlace: "Store"
  },
  {
    id: `ORD-${1003}`,
    client: {
      id: 3,
      name: "Acme Corp",
      notes: "Corporate account",
      status: {
        id: 3,
        name: "Oczekujące",
        data: {
          id: 27,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 9,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    status: {
      id: 3,
      name: "Oczekujące"
    },
    totalPrice: "2500",
    data: {
      id: 18,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    },
    deliveryDate: "2025-07-20",
    paymentStatus: "Opłacone",
    address: {
      id: 3,
      apartmentNumber: "3C",
      buildingNumber: "10",
      city: "Gdansk",
      postalCode: "80-003",
      province: "Pomeranian",
      data: {
        id: 3,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    products: [
      {
        id: "prod-3",
        image: "/images/book.jpg",
        name: "Novel Y",
        category: "Books",
        price: 19.99,
        status: "Oczekujące",
        dimensions: 2.0,
        weight: 0.5,
        description: "Bestselling novel",
        notes: "Hardcover edition",
        sku: "NOV789",
        data: {
          id: 24,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      }
    ],
    salePlace: "Online"
  }
];

const orderItems = [
  {
    id: 1,
    order: {
      id: `ORD-${1001}`,
      client: {
        id: 1,
        name: "John Doe",
        notes: "Regular customer",
        status: {
          id: 1,
          name: "Aktywny",
          data: {
            id: 25,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        data: {
          id: 7,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      status: {
        id: 1,
        name: "Aktywny"
      },
      totalPrice: "1500",
      data: {
        id: 16,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      },
      deliveryDate: "2025-07-10",
      paymentStatus: "Opłacone",
      address: {
        id: 1,
        apartmentNumber: "12A",
        buildingNumber: "45",
        city: "Warsaw",
        postalCode: "00-001",
        province: "Masovian",
        data: {
          id: 1,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      salePlace: "Online"
    },
    product: {
      id: "prod-1",
      dimensions: 15.5,
      price: 999.99,
      weight: 0.2,
      description: "Latest smartphone model",
      name: "Smartphone X",
      notes: "New release",
      sku: "SMX123",
      status: {
        id: 1,
        name: "Aktywny",
        data: {
          id: 25,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 22,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    price: 500,
    quantity: 2,
    data: {
      id: 19,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    order: {
      id: `ORD-${1002}`,
      client: {
        id: 2,
        name: "Jane Smith",
        notes: "VIP client",
        status: {
          id: 2,
          name: "Nieaktywne",
          data: {
            id: 26,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        data: {
          id: 8,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      status: {
        id: 2,
        name: "Nieaktywne"
      },
      totalPrice: "800",
      data: {
        id: 17,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      },
      deliveryDate: "2025-07-15",
      paymentStatus: "Opłacone",
      address: {
        id: 2,
        apartmentNumber: "7B",
        buildingNumber: "22",
        city: "Krakow",
        postalCode: "30-002",
        province: "Lesser Poland",
        data: {
          id: 2,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      salePlace: "Store"
    },
    product: {
      id: "prod-2",
      dimensions: 0.1,
      price: 29.99,
      weight: 0.15,
      description: "Cotton T-shirt",
      name: "Basic T-shirt",
      notes: "Available in multiple colors",
      sku: "TSH456",
      status: {
        id: 2,
        name: "Nieaktywne",
        data: {
          id: 26,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 23,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    price: 300,
    quantity: 1,
    data: {
      id: 20,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    order: {
      id: `ORD-${1003}`,
      client: {
        id: 3,
        name: "Acme Corp",
        notes: "Corporate account",
        status: {
          id: 3,
          name: "Oczekujące",
          data: {
            id: 27,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        data: {
          id: 9,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      status: {
        id: 3,
        name: "Oczekujące"
      },
      totalPrice: "2500",
      data: {
        id: 18,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      },
      deliveryDate: "2025-07-20",
      paymentStatus: "Opłacone",
      address: {
        id: 3,
        apartmentNumber: "3C",
        buildingNumber: "10",
        city: "Gdansk",
        postalCode: "80-003",
        province: "Pomeranian",
        data: {
          id: 3,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      salePlace: "Online"
    },
    product: {
      id: "prod-3",
      dimensions: 2.0,
      price: 19.99,
      weight: 0.5,
      description: "Bestselling novel",
      name: "Novel Y",
      notes: "Hardcover edition",
      sku: "NOV789",
      status: {
        id: 3,
        name: "Oczekujące",
        data: {
          id: 27,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 24,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    price: 700,
    quantity: 3,
    data: {
      id: 21,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const products = [
  {
    id: "prod-1",
    dimensions: 15.5,
    price: 999.99,
    weight: 0.2,
    description: "Latest smartphone model",
    name: "Smartphone X",
    notes: "New release",
    sku: "SMX123",
    status: {
      id: 1,
      name: "Aktywny",
      data: {
        id: 25,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    data: {
      id: 22,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: "prod-2",
    dimensions: 0.1,
    price: 29.99,
    weight: 0.15,
    description: "Cotton T-shirt",
    name: "Basic T-shirt",
    notes: "Available in multiple colors",
    sku: "TSH456",
    status: {
      id: 2,
      name: "Nieaktywne",
      data: {
        id: 26,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    data: {
      id: 23,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: "prod-3",
    dimensions: 2.0,
    price: 19.99,
    weight: 0.5,
    description: "Bestselling novel",
    name: "Novel Y",
    notes: "Hardcover edition",
    sku: "NOV789",
    status: {
      id: 3,
      name: "Oczekujące",
      data: {
        id: 27,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    data: {
      id: 24,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const statuses = [
  {
    id: 1,
    name: "Aktywny",
    data: {
      id: 25,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    name: "Nieaktywne",
    data: {
      id: 26,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 3,
    name: "Oczekujące",
    data: {
      id: 27,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  }
];

const stockLevels = [
  {
    id: 1,
    product: {
      id: "prod-1",
      dimensions: 15.5,
      price: 999.99,
      weight: 0.2,
      description: "Latest smartphone model",
      name: "Smartphone X",
      notes: "New release",
      sku: "SMX123",
      status: {
        id: 1,
        name: "Aktywny",
        data: {
          id: 25,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 22,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    quantity: 100,
    warehouse: {
      id: 1,
      type: 1,
      address: {
        id: 1,
        apartmentNumber: "12A",
        buildingNumber: "45",
        city: "Warsaw",
        postalCode: "00-001",
        province: "Masovian",
        data: {
          id: 1,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      capacity: 1000,
      data: {
        id: 37,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    data: {
      id: 28,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    product: {
      id: "prod-2",
      dimensions: 0.1,
      price: 29.99,
      weight: 0.15,
      description: "Cotton T-shirt",
      name: "Basic T-shirt",
      notes: "Available in multiple colors",
      sku: "TSH456",
      status: {
        id: 2,
        name: "Nieaktywne",
        data: {
          id: 26,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 23,
        createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
      }
    },
    quantity: 200,
    warehouse: {
      id: 2,
      type: 2,
      address: {
        id: 2,
        apartmentNumber: "7B",
        buildingNumber: "22",
        city: "Krakow",
        postalCode: "30-002",
        province: "Lesser Poland",
        data: {
          id: 2,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      capacity: 2000,
      data: {
        id: 38,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    data: {
      id: 29,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    product: {
      id: "prod-3",
      dimensions: 2.0,
      price: 19.99,
      weight: 0.5,
      description: "Bestselling novel",
      name: "Novel Y",
      notes: "Hardcover edition",
      sku: "NOV789",
      status: {
        id: 3,
        name: "Oczekujące",
        data: {
          id: 27,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 24,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    quantity: 150,
    warehouse: {
      id: 3,
      type: 3,
      address: {
        id: 3,
        apartmentNumber: "3C",
        buildingNumber: "10",
        city: "Gdansk",
        postalCode: "80-003",
        province: "Pomeranian",
        data: {
          id: 3,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      capacity: 1500,
      data: {
        id: 39,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    data: {
      id: 30,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const stockMovements = [
  {
    id: 1,
    relatedOrder: {
      id: `ORD-${1001}`,
      client: {
        id: 1,
        name: "John Doe",
        notes: "Regular customer",
        status: {
          id: 1,
          name: "Aktywny",
          data: {
            id: 25,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        data: {
          id: 7,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      status: {
        id: 1,
        name: "Aktywny"
      },
      totalPrice: "1500",
      data: {
        id: 16,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      },
      deliveryDate: "2025-07-10",
      paymentStatus: "Opłacone",
      address: {
        id: 1,
        apartmentNumber: "12A",
        buildingNumber: "45",
        city: "Warsaw",
        postalCode: "00-001",
        province: "Masovian",
        data: {
          id: 1,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      salePlace: "Online"
    },
    sourceWarehouse: {
      id: 1,
      type: 1,
      address: {
        id: 1,
        apartmentNumber: "12A",
        buildingNumber: "45",
        city: "Warsaw",
        postalCode: "00-001",
        province: "Masovian",
        data: {
          id: 1,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      capacity: 1000,
      data: {
        id: 37,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    targetWarehouse: {
      id: 2,
      type: 2,
      address: {
        id: 2,
        apartmentNumber: "7B",
        buildingNumber: "22",
        city: "Krakow",
        postalCode: "30-002",
        province: "Lesser Poland",
        data: {
          id: 2,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      capacity: 2000,
      data: {
        id: 38,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    note: "Transfer for order fulfillment",
    data: {
      id: 31,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    relatedOrder: {
      id: `ORD-${1002}`,
      client: {
        id: 2,
        name: "Jane Smith",
        notes: "VIP client",
        status: {
          id: 2,
          name: "Nieaktywne",
          data: {
            id: 26,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        data: {
          id: 8,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      status: {
        id: 2,
        name: "Nieaktywne"
      },
      totalPrice: "800",
      data: {
        id: 17,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      },
      deliveryDate: "2025-07-15",
      paymentStatus: "Opłacone",
      address: {
        id: 2,
        apartmentNumber: "7B",
        buildingNumber: "22",
        city: "Krakow",
        postalCode: "30-002",
        province: "Lesser Poland",
        data: {
          id: 2,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      salePlace: "Store"
    },
    sourceWarehouse: {
      id: 2,
      type: 2,
      address: {
        id: 2,
        apartmentNumber: "7B",
        buildingNumber: "22",
        city: "Krakow",
        postalCode: "30-002",
        province: "Lesser Poland",
        data: {
          id: 2,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      capacity: 2000,
      data: {
        id: 38,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    targetWarehouse: {
      id: 3,
      type: 3,
      address: {
        id: 3,
        apartmentNumber: "3C",
        buildingNumber: "10",
        city: "Gdansk",
        postalCode: "80-003",
        province: "Pomeranian",
        data: {
          id: 3,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      capacity: 1500,
      data: {
        id: 39,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    note: "Restocking",
    data: {
      id: 32,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    relatedOrder: {
      id: `ORD-${1003}`,
      client: {
        id: 3,
        name: "Acme Corp",
        notes: "Corporate account",
        status: {
          id: 3,
          name: "Oczekujące",
          data: {
            id: 27,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        data: {
          id: 9,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      status: {
        id: 3,
        name: "Oczekujące"
      },
      totalPrice: "2500",
      data: {
        id: 18,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      },
      deliveryDate: "2025-07-20",
      paymentStatus: "Opłacone",
      address: {
        id: 3,
        apartmentNumber: "3C",
        buildingNumber: "10",
        city: "Gdansk",
        postalCode: "80-003",
        province: "Pomeranian",
        data: {
          id: 3,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      salePlace: "Online"
    },
    sourceWarehouse: {
      id: 3,
      type: 3,
      address: {
        id: 3,
        apartmentNumber: "3C",
        buildingNumber: "10",
        city: "Gdansk",
        postalCode: "80-003",
        province: "Pomeranian",
        data: {
          id: 3,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      capacity: 1500,
      data: {
        id: 39,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    targetWarehouse: {
      id: 1,
      type: 1,
      address: {
        id: 1,
        apartmentNumber: "12A",
        buildingNumber: "45",
        city: "Warsaw",
        postalCode: "00-001",
        province: "Masovian",
        data: {
          id: 1,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      capacity: 1000,
      data: {
        id: 37,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    note: "Return processing",
    data: {
      id: 33,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const stockMovementItems = [
  {
    id: 1,
    product: {
      id: "prod-1",
      dimensions: 15.5,
      price: 999.99,
      weight: 0.2,
      description: "Latest smartphone model",
      name: "Smartphone X",
      notes: "New release",
      sku: "SMX123",
      status: {
        id: 1,
        name: "Aktywny",
        data: {
          id: 25,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 22,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    quantity: 10,
    stockMovement: {
      id: 1,
      relatedOrder: {
        id: `ORD-${1001}`,
        client: {
          id: 1,
          name: "John Doe",
          notes: "Regular customer",
          status: {
            id: 1,
            name: "Aktywny",
            data: {
              id: 25,
              createdAt: "2025-01-01",
              updatedAt: "2025-01-01"
            }
          },
          data: {
            id: 7,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        status: {
          id: 1,
          name: "Aktywny"
        },
        totalPrice: "1500",
        data: {
          id: 16,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        },
        deliveryDate: "2025-07-10",
        paymentStatus: "Opłacone",
        address: {
          id: 1,
          apartmentNumber: "12A",
          buildingNumber: "45",
          city: "Warsaw",
          postalCode: "00-001",
          province: "Masovian",
          data: {
            id: 1,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        salePlace: "Online"
      },
      sourceWarehouse: {
        id: 1,
        type: 1,
        address: {
          id: 1,
          apartmentNumber: "12A",
          buildingNumber: "45",
          city: "Warsaw",
          postalCode: "00-001",
          province: "Masovian",
          data: {
            id: 1,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        capacity: 1000,
        data: {
          id: 37,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      targetWarehouse: {
        id: 2,
        type: 2,
        address: {
          id: 2,
          apartmentNumber: "7B",
          buildingNumber: "22",
          city: "Krakow",
          postalCode: "30-002",
          province: "Lesser Poland",
          data: {
            id: 2,
            createdAt: "2025-02-01",
            updatedAt: "2025-02-01"
          }
        },
        capacity: 2000,
        data: {
          id: 38,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      note: "Transfer for order fulfillment",
      data: {
        id: 31,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    data: {
      id: 34,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    product: {
      id: "prod-2",
      dimensions: 0.1,
      price: 29.99,
      weight: 0.15,
      description: "Cotton T-shirt",
      name: "Basic T-shirt",
      notes: "Available in multiple colors",
      sku: "TSH456",
      status: {
        id: 2,
        name: "Nieaktywne",
        data: {
          id: 26,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 23,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    quantity: 20,
    stockMovement: {
      id: 2,
      relatedOrder: {
        id: `ORD-${1002}`,
        client: {
          id: 2,
          name: "Jane Smith",
          notes: "VIP client",
          status: {
            id: 2,
            name: "Nieaktywne",
            data: {
              id: 26,
              createdAt: "2025-01-01",
              updatedAt: "2025-01-01"
            }
          },
          data: {
            id: 8,
            createdAt: "2025-02-01",
            updatedAt: "2025-02-01"
          }
        },
        status: {
          id: 2,
          name: "Nieaktywne"
        },
        totalPrice: "800",
        data: {
          id: 17,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        },
        deliveryDate: "2025-07-15",
        paymentStatus: "Opłacone",
        address: {
          id: 2,
          apartmentNumber: "7B",
          buildingNumber: "22",
          city: "Krakow",
          postalCode: "30-002",
          province: "Lesser Poland",
          data: {
            id: 2,
            createdAt: "2025-02-01",
            updatedAt: "2025-02-01"
          }
        },
        salePlace: "Store"
      },
      sourceWarehouse: {
        id: 2,
        type: 2,
        address: {
          id: 2,
          apartmentNumber: "7B",
          buildingNumber: "22",
          city: "Krakow",
          postalCode: "30-002",
          province: "Lesser Poland",
          data: {
            id: 2,
            createdAt: "2025-02-01",
            updatedAt: "2025-02-01"
          }
        },
        capacity: 2000,
        data: {
          id: 38,
          createdAt: "2025-02-01",
          updatedAt: "2025-02-01"
        }
      },
      targetWarehouse: {
        id: 3,
        type: 3,
        address: {
          id: 3,
          apartmentNumber: "3C",
          buildingNumber: "10",
          city: "Gdansk",
          postalCode: "80-003",
          province: "Pomeranian",
          data: {
            id: 3,
            createdAt: "2025-03-01",
            updatedAt: "2025-03-01"
          }
        },
        capacity: 1500,
        data: {
          id: 39,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      note: "Restocking",
      data: {
        id: 32,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    data: {
      id: 35,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    product: {
      id: "prod-3",
      dimensions: 2.0,
      price: 19.99,
      weight: 0.5,
      description: "Bestselling novel",
      name: "Novel Y",
      notes: "Hardcover edition",
      sku: "NOV789",
      status: {
        id: 3,
        name: "Oczekujące",
        data: {
          id: 27,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      data: {
        id: 24,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    quantity: 15,
    stockMovement: {
      id: 3,
      relatedOrder: {
        id: `ORD-${1003}`,
        client: {
          id: 3,
          name: "Acme Corp",
          notes: "Corporate account",
          status: {
            id: 3,
            name: "Oczekujące",
            data: {
              id: 27,
              createdAt: "2025-01-01",
              updatedAt: "2025-01-01"
            }
          },
          data: {
            id: 9,
            createdAt: "2025-03-01",
            updatedAt: "2025-03-01"
          }
        },
        status: {
          id: 3,
          name: "Oczekujące"
        },
        totalPrice: "2500",
        data: {
          id: 18,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        },
        deliveryDate: "2025-07-20",
        paymentStatus: "Opłacone",
        address: {
          id: 3,
          apartmentNumber: "3C",
          buildingNumber: "10",
          city: "Gdansk",
          postalCode: "80-003",
          province: "Pomeranian",
          data: {
            id: 3,
            createdAt: "2025-03-01",
            updatedAt: "2025-03-01"
          }
        },
        salePlace: "Online"
      },
      sourceWarehouse: {
        id: 3,
        type: 3,
        address: {
          id: 3,
          apartmentNumber: "3C",
          buildingNumber: "10",
          city: "Gdansk",
          postalCode: "80-003",
          province: "Pomeranian",
          data: {
            id: 3,
            createdAt: "2025-03-01",
            updatedAt: "2025-03-01"
          }
        },
        capacity: 1500,
        data: {
          id: 39,
          createdAt: "2025-03-01",
          updatedAt: "2025-03-01"
        }
      },
      targetWarehouse: {
        id: 1,
        type: 1,
        address: {
          id: 1,
          apartmentNumber: "12A",
          buildingNumber: "45",
          city: "Warsaw",
          postalCode: "00-001",
          province: "Masovian",
          data: {
            id: 1,
            createdAt: "2025-01-01",
            updatedAt: "2025-01-01"
          }
        },
        capacity: 1000,
        data: {
          id: 37,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01"
        }
      },
      note: "Return processing",
      data: {
        id: 33,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    data: {
      id: 36,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

const warehouses = [
  {
    id: 1,
    type: 1,
    address: {
      id: 1,
      apartmentNumber: "12A",
      buildingNumber: "45",
      city: "Warsaw",
      postalCode: "00-001",
      province: "Masovian",
      data: {
        id: 1,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01"
      }
    },
    capacity: 1000,
    data: {
      id: 37,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01"
    }
  },
  {
    id: 2,
    type: 2,
    address: {
      id: 2,
      apartmentNumber: "7B",
      buildingNumber: "22",
      city: "Krakow",
      postalCode: "30-002",
      province: "Lesser Poland",
      data: {
        id: 2,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01"
      }
    },
    capacity: 2000,
    data: {
      id: 38,
      createdAt: "2025-02-01",
      updatedAt: "2025-02-01"
    }
  },
  {
    id: 3,
    type: 3,
    address: {
      id: 3,
      apartmentNumber: "3C",
      buildingNumber: "10",
      city: "Gdansk",
      postalCode: "80-003",
      province: "Pomeranian",
      data: {
        id: 3,
        createdAt: "2025-03-01",
        updatedAt: "2025-03-01"
      }
    },
    capacity: 1500,
    data: {
      id: 39,
      createdAt: "2025-03-01",
      updatedAt: "2025-03-01"
    }
  }
];

export {
  addresses,
  clients,
  clientContacts,
  categories,
  data,
  images,
  orders,
  orderItems,
  products,
  statuses,
  stockLevels,
  stockMovements,
  stockMovementItems,
  warehouses
};