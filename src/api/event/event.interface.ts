export interface EventProps {
  id: number;
  title: string;
  description: string | null;
  tanggal: string;
  waktu: string | null;
  location: string | null;
  kategori: string;
  createdAt: string;
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  tanggal: string;
  waktu?: string;
  location?: string;
  kategori: string;
}
