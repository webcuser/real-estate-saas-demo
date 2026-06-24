/*
  Mock Property Management API
  Provides CRUD operations for property data including photos, floor plans, and status.
*/

export type Property = {
  id: string;
  title: string;
  address: string;
  status: 'available' | 'sold' | 'pending';
  photos: string[];
  floorPlans: string[];
  description: string;
};

// In-memory mock data
let properties: Property[] = [
  {
    id: '1',
    title: 'Modern Family Home',
    address: '123 Main St, Springfield',
    status: 'available',
    photos: [
      'https://via.placeholder.com/400x300?text=Photo+1',
      'https://via.placeholder.com/400x300?text=Photo+2'
    ],
    floorPlans: [
      'https://via.placeholder.com/400x300?text=Floor+Plan+1'
    ],
    description: 'A beautiful modern family home with 4 bedrooms and 3 bathrooms.'
  },
  {
    id: '2',
    title: 'Downtown Apartment',
    address: '456 City Ave, Metropolis',
    status: 'sold',
    photos: [
      'https://via.placeholder.com/400x300?text=Photo+1'
    ],
    floorPlans: [
      'https://via.placeholder.com/400x300?text=Floor+Plan+1',
      'https://via.placeholder.com/400x300?text=Floor+Plan+2'
    ],
    description: 'Cozy downtown apartment close to all amenities.'
  }
];

function delay<T>(result: T, ms = 300): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(result), ms));
}

export const mockPropertyApi = {
  // Get all properties
  getProperties: async (): Promise<Property[]> => {
    return delay([...properties]);
  },

  // Get property by ID
  getProperty: async (id: string): Promise<Property | undefined> => {
    const property = properties.find(p => p.id === id);
    return delay(property);
  },

  // Create a new property
  createProperty: async (property: Omit<Property, 'id'>): Promise<Property> => {
    const newProperty: Property = {
      ...property,
      id: (Date.now() + Math.random()).toString()
    };
    properties.push(newProperty);
    return delay(newProperty);
  },

  // Update an existing property
  updateProperty: async (id: string, updates: Partial<Omit<Property, 'id'>>): Promise<Property | undefined> => {
    const idx = properties.findIndex(p => p.id === id);
    if (idx === -1) return delay(undefined);
    properties[idx] = { ...properties[idx], ...updates };
    return delay(properties[idx]);
  },

  // Delete a property
  deleteProperty: async (id: string): Promise<boolean> => {
    const idx = properties.findIndex(p => p.id === id);
    if (idx === -1) return delay(false);
    properties.splice(idx, 1);
    return delay(true);
  }
};
