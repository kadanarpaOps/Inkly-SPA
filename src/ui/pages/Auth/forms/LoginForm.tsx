import z from "zod";
import { loginSchema } from "../../../schemas/user/user.schema";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    const { username, password } = data;
    const success = await login(username, password);
    if (success) {
      navigate("/explore");
      reset();
    }
  };

  return (
    <div className="flex flex-col justify-center w-full mt-4 sm:mt-8 md:mt-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-global mb-2">Bienvenido</h1>
        <p className="text-several-light text-sm sm:text-base">¿Preparado para entintarte?</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
        {/* Usuario */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
            Usuario o Correo
          </label>
          <input
            type="text"
            className="w-full bg-inputs-bg border-none text-global placeholder-several-light rounded-xl px-5 py-3.5 sm:py-4 mt-2 focus:ring-2 focus:ring-high-enfasis focus:outline-none transition-all"
            placeholder="ejemplo@inkly.dev"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-high-enfasis text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
              Contraseña
            </label>
            <a
              onClick={() => navigate("/recovery-pass")}
              className="text-xs font-medium text-several-light hover:text-high-enfasis transition-colors cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-inputs-bg border-none text-global placeholder-several-light rounded-xl px-5 py-3.5 sm:py-4 mt-2 focus:ring-2 focus:ring-high-enfasis focus:outline-none transition-all"
              placeholder="Ingresa tu contraseña"
              autoComplete="off"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-high-enfasis text-xs mt-1">{errors.password.message}</p>
            )}
            <button
              className="text-several-light hover:text-high-enfasis absolute top-6 sm:top-6.5 right-4"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword
                ? <EyeClosed size={18} className="cursor-pointer" />
                : <Eye size={18} className="cursor-pointer" />
              }
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          className={`w-full hover:scale-[0.98] duration-300 ease-in-out transition-all mt-2 font-bold py-3.5 sm:py-4 rounded-full ${
            !loading
              ? "cursor-pointer bg-primary-container text-on-primary-fixed hover:shadow-lg hover:shadow-high-enfasis/20"
              : "cursor-default opacity-70"
          }`}
          type="submit"
          disabled={loading}
        >
          {!loading ? (
            "Iniciar Sesión"
          ) : (
            <div className="flex items-center justify-center w-full h-6">
              <div className="loading-button" />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;