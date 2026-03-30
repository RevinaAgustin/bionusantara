import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogIn, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    
    toast({
      title: "Berhasil Masuk! 🎉",
      description: "Selamat datang kembali, Vina!",
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="container mx-auto flex h-[80vh] w-full items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Masuk ke BioNusantara</CardTitle>
          <CardDescription>
            Silakan masuk untuk mengakses fitur Observasi dan Dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Kata Sandi" required />
            <Button type="submit" className="w-full gap-2 mt-4">
              <LogIn className="h-4 w-4" /> Masuk Sekarang
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;