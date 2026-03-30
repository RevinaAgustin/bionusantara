import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockObservations, mockSpecies } from "@/lib/mock-data";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map, Grid3X3, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const validated = mockObservations.filter((o) => o.status === "validated");

// Daftar kategori sesuai model AI
const CATEGORIES = ["Semua", "Hoya", "Kayu", "Plankton"];

const Jelajah = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredSpecies = mockSpecies.filter((s) => {
    const matchSearch =
      s.commonName.toLowerCase().includes(search.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(search.toLowerCase());
    
    const matchCategory = selectedCategory === "Semua" || s.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Jelajah Biodiversitas</h1>
      <p className="mb-6 text-muted-foreground">Eksplorasi observasi yang sudah divalidasi</p>

      <Tabs defaultValue="peta" className="space-y-4">
        <TabsList>
          <TabsTrigger value="peta" className="gap-2">
            <Map className="h-4 w-4" /> Peta Interaktif
          </TabsTrigger>
          <TabsTrigger value="galeri" className="gap-2">
            <Grid3X3 className="h-4 w-4" /> Galeri Spesies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="peta">
          <div className="overflow-hidden rounded-lg border" style={{ height: "500px" }}>
            <MapContainer
              center={[-2.5, 118]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {validated.map((obs) => (
                <Marker key={obs.id} position={[obs.latitude, obs.longitude]}>
                  <Popup>
                    <div className="w-52">
                      <img
                        src={obs.photoUrl}
                        alt={obs.speciesName}
                        className="mb-2 h-32 w-full rounded object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                      />
                      <p className="font-bold">{obs.speciesName}</p>
                      <p className="text-xs italic text-gray-500">{obs.scientificName}</p>
                      <p className="mt-1 text-xs">📅 {obs.date}</p>
                      <p className="text-xs">👤 {obs.observer}</p>
                     <Button 
                      size="sm" 
                      className="w-full mt-2 gap-2" 
                      onClick={() => navigate(`/detailSpesies/${obs.id}`)} 
                    >
                      Lihat Detail
                    </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </TabsContent>

        <TabsContent value="galeri">
          {/* Baris Pencarian dan Filter Kategori */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Kotak Pencarian */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama spesies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Tombol-tombol Filter Kategori */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="h-4 w-4 text-muted-foreground mr-1 hidden sm:block" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Galeri */}
          {filteredSpecies.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSpecies.map((species) => (
                <Card key={species.id} className="overflow-hidden transition-all hover:shadow-md">
                  <img
                    src={species.photoUrl}
                    alt={species.commonName}
                    className="h-48 w-full object-cover transition-transform hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">{species.commonName}</h3>
                    <p className="text-sm italic text-muted-foreground mb-3">{species.scientificName}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={
                        species.category === 'Hoya' ? 'default' : 
                        species.category === 'Kayu' ? 'secondary' : 'outline'
                      }>
                        {species.category}
                      </Badge>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {species.observationCount} obs
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-2 gap-2" 
                      onClick={() => navigate(`/detailSpesies/${species.id}`)} 
                    >
                      Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /*  jika data tidak ditemukan */
            <div className="py-12 text-center border rounded-lg bg-muted/20">
              <p className="text-muted-foreground">Tidak ada spesies yang cocok dengan filter tersebut.</p>
              <button 
                onClick={() => {setSearch(""); setSelectedCategory("Semua");}}
                className="mt-4 text-primary hover:underline font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Jelajah;