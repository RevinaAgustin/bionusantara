import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { stats } from "@/lib/mock-data";
import { Camera, Map, Users, Leaf, Search, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-light via-background to-amber-light">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Leaf className="h-4 w-4 text-primary" />
              Citizen Science Indonesia
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Jelajahi & Lindungi{" "}
              <span className="text-primary">Biodiversitas</span>{" "}
              Nusantara
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Bergabunglah dengan ribuan warga dan ilmuwan Indonesia untuk mendokumentasikan kekayaan hayati lokal. 
              Setiap observasi Anda berkontribusi pada konservasi.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/observasi">
                <Button size="lg" className="gap-2 text-base">
                  <Camera className="h-5 w-5" />
                  Mulai Berkontribusi
                </Button>
              </Link>
              <Link to="/jelajah">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  <Map className="h-5 w-5" />
                  Jelajahi Peta
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container mx-auto grid grid-cols-1 gap-0 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { label: "Total Observasi", value: stats.totalObservations.toLocaleString(), icon: Camera },
            { label: "Spesies Teridentifikasi", value: stats.totalSpecies.toLocaleString(), icon: Search },
            { label: "Kontributor", value: stats.totalContributors.toLocaleString(), icon: Users },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center justify-center gap-4 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold">Bagaimana Cara Kerjanya?</h2>
            <p className="text-muted-foreground">Tiga langkah sederhana untuk berkontribusi</p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Temukan & Foto",
                desc: "Temukan flora atau fauna di sekitar Anda dan ambil fotonya.",
                icon: Camera,
                color: "bg-emerald-light text-primary",
              },
              {
                step: "2",
                title: "Upload & Identifikasi",
                desc: "Upload foto Anda. AI kami akan membantu mengidentifikasi spesiesnya.",
                icon: Search,
                color: "bg-amber-light text-secondary",
              },
              {
                step: "3",
                title: "Validasi & Publikasi",
                desc: "Observasi divalidasi lalu tampil di peta dan galeri publik.",
                icon: CheckCircle,
                color: "bg-terra-light text-accent",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              >
                <Card className="relative overflow-hidden border-none shadow-md">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${step.color}`}>
                      <step.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold font-sans">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Leaf className="h-4 w-4 text-primary" />
            BioNusantara
          </div>
          <p>Platform citizen science untuk biodiversitas Indonesia</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;