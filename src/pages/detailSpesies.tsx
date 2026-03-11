import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DetailSpesies = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/jelajah" className="inline-flex items-center text-primary mb-6 hover:underline font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Jelajah
      </Link>
      
      <div className="p-8 border border-border rounded-xl bg-card shadow-sm">
        <h1 className="text-3xl font-bold mb-2">Halaman Detail Spesies</h1>
        <p className="text-muted-foreground">
          Sistem berhasil menangkap ID: <span className="font-bold text-primary">{id}</span>
        </p>
        <p className="mt-4 text-sm">
          (Nanti di sini kita masukin foto gede, deskripsi lengkap, sama lokasi kordinat aslinya ya!)
        </p>
      </div>
    </div>
  );
};

export default DetailSpesies;