// src/api/mockClientiApi.ts

export interface Cliente {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Mock data
let clienti: Cliente[] = [
  { id: 1, name: "Mario Rossi", email: "mario.rossi@email.com", phone: "123-456-7890" },
  { id: 2, name: "Luca Bianchi", email: "luca.bianchi@email.com", phone: "234-567-8901" },
];
let nextId = 3;

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockClientiApi = {
  async getClienti(): Promise<Cliente[]> {
    await delay(200);
    return [...clienti];
  },

  async getClienteById(id: number): Promise<Cliente | undefined> {
    await delay(150);
    return clienti.find(c => c.id === id);
  },

  async addCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    await delay(200);
    const newCliente: Cliente = { ...cliente, id: nextId++ };
    clienti.push(newCliente);
    return newCliente;
  },

  async updateCliente(id: number, updates: Partial<Omit<Cliente, 'id'>>): Promise<Cliente | undefined> {
    await delay(200);
    const idx = clienti.findIndex(c => c.id === id);
    if (idx === -1) return undefined;
    clienti[idx] = { ...clienti[idx], ...updates };
    return clienti[idx];
  },

  async deleteCliente(id: number): Promise<boolean> {
    await delay(150);
    const idx = clienti.findIndex(c => c.id === id);
    if (idx === -1) return false;
    clienti.splice(idx, 1);
    return true;
  }
};
