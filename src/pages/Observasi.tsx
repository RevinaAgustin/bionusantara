import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, MapPin, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import exifr from "exifr";

const Observasi = () => {
  const { toast } = useToast();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    speciesName: "",
    scientificName: "",
    latitude: "",
    longitude: "",
    date: "",
    habitat: "",
    notes: "",
  });
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const handlePhotoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);

    // EXIF extraction
    try {
      const exif = await exifr.parse(file, ["GPSLatitude", "GPSLongitude", "DateTimeOriginal"]);
      if (exif) {
        setFormData((prev) => ({
          ...prev,
          latitude: exif.latitude?.toString() || prev.latitude,
          longitude: exif.longitude?.toString() || prev.longitude,
          date: exif.DateTimeOriginal
            ? new Date(exif.DateTimeOriginal).toISOString().split("T")[0]
            : prev.date,
        }));
        if (exif.latitude) {
          toast({ title: "EXIF Ditemukan!", description: "Koordinat & tanggal berhasil diekstrak dari foto." });
        }
      }
    } catch {
      // EXIF not available
    }

    // Mock AI identification
    setLoading(true);
    setTimeout(() => {
      setAiSuggestion("Elang Jawa (Nisaetus bartelsi)");
      setFormData((prev) => ({
        ...prev,
        speciesName: "Elang Jawa",
        scientificName: "Nisaetus bartelsi",
      }));
      setLoading(false);
    }, 2000);
  }, [toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Observasi Terkirim! 🎉",
      description: "Observasi Anda sedang menunggu validasi. Terima kasih atas kontribusinya!",
    });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Form Observasi</h1>
      <p className="mb-6 text-muted-foreground">Dokumentasikan temuan biodiversitas Anda</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-sans">
              <Camera className="h-5 w-5" /> Upload Foto
            </CardTitle>
          </CardHeader>
          <CardContent>
            {photo ? (
              <div className="relative">
                <img src={photo} alt="Preview" className="w-full rounded-lg object-cover" style={{ maxHeight: 300 }} />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={() => setPhoto(null)}
                >
                  Ganti Foto
                </Button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed p-10 transition-colors hover:border-primary hover:bg-muted">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Klik atau seret foto ke sini</span>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            )}

            {loading && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                AI sedang mengidentifikasi spesies...
              </div>
            )}

            {aiSuggestion && !loading && (
              <div className="mt-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="text-sm">Saran AI:</span>
                <Badge variant="secondary">{aiSuggestion}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Species info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-sans">Informasi Spesies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Nama Umum</Label>
                <Input
                  value={formData.speciesName}
                  onChange={(e) => setFormData({ ...formData, speciesName: e.target.value })}
                  placeholder="Contoh: Elang Jawa"
                />
              </div>
              <div>
                <Label>Nama Ilmiah</Label>
                <Input
                  value={formData.scientificName}
                  onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                  placeholder="Contoh: Nisaetus bartelsi"
                  className="italic"
                />
              </div>
            </div>
            <div>
              <Label>Habitat</Label>
              <Input
                value={formData.habitat}
                onChange={(e) => setFormData({ ...formData, habitat: e.target.value })}
                placeholder="Contoh: Hutan hujan tropis"
              />
            </div>
            <div>
              <Label>Catatan Observasi</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Deskripsikan pengamatan Anda..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-sans">
              <MapPin className="h-5 w-5" /> Lokasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label>Latitude</Label>
                <Input
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="-6.200"
                  type="number"
                  step="any"
                />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="106.816"
                  type="number"
                  step="any"
                />
              </div>
              <div>
                <Label>Tanggal</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Koordinat & tanggal akan otomatis terisi jika foto memiliki data EXIF
            </p>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full gap-2">
          <Upload className="h-5 w-5" />
          Kirim Observasi
        </Button>
      </form>
    </div>
  );
};

export default Observasi;
