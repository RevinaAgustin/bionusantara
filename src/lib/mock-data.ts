export interface Observation {
  id: string;
  speciesName: string;
  scientificName: string;
  latitude: number;
  longitude: number;
  photoUrl: string;
  observer: string;
  date: string;
  habitat: string;
  notes: string;
  status: "validated" | "pending";
}

export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  photoUrl: string;
  observationCount: number;
  category: string;
}

export const mockObservations: Observation[] = [
  {
    id: "1",
    speciesName: "Elang Jawa",
    scientificName: "Nisaetus bartelsi",
    latitude: -6.75,
    longitude: 106.98,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nisaetus_bartelsi.jpg/640px-Nisaetus_bartelsi.jpg",
    observer: "Andi Pratama",
    date: "2025-12-15",
    habitat: "Hutan pegunungan",
    notes: "Terlihat di kanopi pohon tinggi",
    status: "validated",
  },
  {
    id: "2",
    speciesName: "Rafflesia Arnoldii",
    scientificName: "Rafflesia arnoldii",
    latitude: -3.48,
    longitude: 102.25,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rafflesia_arnoldi_Bengkulu_01.jpg/640px-Rafflesia_arnoldi_Bengkulu_01.jpg",
    observer: "Siti Nurhaliza",
    date: "2026-01-08",
    habitat: "Hutan hujan tropis",
    notes: "Diameter sekitar 80cm, sedang mekar penuh",
    status: "validated",
  },
  {
    id: "3",
    speciesName: "Orangutan Sumatera",
    scientificName: "Pongo abelii",
    latitude: 3.5,
    longitude: 98.0,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Orang_Utan%2C_Bukit_Lawang.jpg/640px-Orang_Utan%2C_Bukit_Lawang.jpg",
    observer: "Budi Santoso",
    date: "2026-01-20",
    habitat: "Hutan dataran rendah",
    notes: "Betina dengan anak, sedang makan buah",
    status: "validated",
  },
  {
    id: "4",
    speciesName: "Komodo",
    scientificName: "Varanus komodoensis",
    latitude: -8.55,
    longitude: 119.49,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/z/z0/Komodo_dragon_%28Varanus_komodoensis%29.jpg/640px-Komodo_dragon_%28Varanus_komodoensis%29.jpg",
    observer: "Dewi Lestari",
    date: "2026-02-01",
    habitat: "Savana",
    notes: "Jantan dewasa sedang berjemur",
    status: "validated",
  },
  {
    id: "5",
    speciesName: "Cendrawasih Merah",
    scientificName: "Paradisaea rubra",
    latitude: -0.86,
    longitude: 131.25,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Paradisaea_rubra_-Papua_New_Guinea-8.jpg/640px-Paradisaea_rubra_-Papua_New_Guinea-8.jpg",
    observer: "Rizky Amelia",
    date: "2026-02-10",
    habitat: "Hutan hujan tropis",
    notes: "Jantan menari di pohon display",
    status: "validated",
  },
  {
    id: "6",
    speciesName: "Harimau Sumatera",
    scientificName: "Panthera tigris sumatrae",
    latitude: 0.5,
    longitude: 101.5,
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Sumatran_Tiger_Berlin_Tierpark.jpg/640px-Sumatran_Tiger_Berlin_Tierpark.jpg",
    observer: "Andi Pratama",
    date: "2026-02-15",
    habitat: "Hutan hujan tropis",
    notes: "Jejak kaki ditemukan, kamera trap menangkap gambar",
    status: "pending",
  },
];

export const mockSpecies: Species[] = [
  { id: "1", commonName: "Elang Jawa", scientificName: "Nisaetus bartelsi", photoUrl: mockObservations[0].photoUrl, observationCount: 12, category: "Aves" },
  { id: "2", commonName: "Rafflesia Arnoldii", scientificName: "Rafflesia arnoldii", photoUrl: mockObservations[1].photoUrl, observationCount: 5, category: "Plantae" },
  { id: "3", commonName: "Orangutan Sumatera", scientificName: "Pongo abelii", photoUrl: mockObservations[2].photoUrl, observationCount: 23, category: "Mammalia" },
  { id: "4", commonName: "Komodo", scientificName: "Varanus komodoensis", photoUrl: mockObservations[3].photoUrl, observationCount: 18, category: "Reptilia" },
  { id: "5", commonName: "Cendrawasih Merah", scientificName: "Paradisaea rubra", photoUrl: mockObservations[4].photoUrl, observationCount: 7, category: "Aves" },
];

export const stats = {
  totalObservations: 1247,
  totalSpecies: 328,
  totalContributors: 562,
};
