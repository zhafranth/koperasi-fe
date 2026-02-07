import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { loginAccount } from "@/api/auth";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (data: object) => loginAccount(data),
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token);
      toast.success("Login berhasil");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Login gagal");
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/dashboard/dashboard");
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0d3b2c] via-[#145a3f] to-[#1a6b50] relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,transparent_70%)]" />
      <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)]" />

      {/* Diagonal line pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="kp-diag-login"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kp-diag-login)" />
      </svg>

      <div className="kp-scale-in relative z-10 w-full max-w-[420px]">
        <div className="bg-white rounded-2xl shadow-2xl border border-[#e7e5e0] overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#c9a84c] flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-[#0d3b2c]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#1c1917] font-serif">
              Selamat Datang
            </h1>
            <p className="text-sm text-[#a8a29e] mt-1">
              Masuk ke akun koperasi Anda
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-xs font-semibold uppercase tracking-wider text-[#78716c]"
                >
                  Username
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-[#a8a29e]" />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    {...register("username")}
                    className={`pl-11 h-12 rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f] transition-all ${
                      errors.username ? "border-red-400" : ""
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-[#78716c]"
                >
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-[#a8a29e]" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    {...register("password")}
                    className={`pl-11 h-12 rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f] transition-all ${
                      errors.password ? "border-red-400" : ""
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Masuk"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full flex items-center justify-center gap-2 text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f0e8] rounded-xl"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
