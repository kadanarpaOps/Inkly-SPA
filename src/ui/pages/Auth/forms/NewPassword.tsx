import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newPasswordSchema, type NewPasswordFormData } from "./zodSchemas/zodRecoveryPass";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

type Props = {
  onSuccess: () => void;
};

function NewPassword({ onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const [showNewPassword, setShowNewPassword] = useState(false);

  const onSubmit = async (data: NewPasswordFormData) => {
    console.log("data=", data);
    setTimeout(() => console.log("Respuesta simulada: 2xx OK"), 1500);
    onSuccess();
  };

  return (
    <div>
      <h1 className="text-4xl text-global font-bold">Actualizar contraseña</h1>
      <p className="text-several-light mt-2 w-[80%]">
        Ingresa tu nueva contraseña y confírmala para continuar con la recuperación de tu cuenta.
      </p>

      <form className="flex flex-col gap-8 my-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Contraseña nueva */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
            CONTRASEÑA
          </label>
          <div className="relative mt-2">
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword")}
              placeholder="••••••••••••"
              className="w-full bg-inputs-bg border-none text-global rounded-xl px-5 py-4 focus:ring-2 focus:ring-high-enfasis focus:outline-none transition-all"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-several-light"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
        </div>

        {/* Confirmar nueva contraseña */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
            CONFIRMAR NUEVA CONTRASEÑA
          </label>
          <div className="relative mt-2">
            <input
              type={"password"}
              {...register("confirmPassword")}
              placeholder="••••••••••••"
              className="w-full bg-inputs-bg border-none text-global rounded-xl px-5 py-4 focus:ring-2 focus:ring-high-enfasis focus:outline-none transition-all"
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-several-light"
            >
              <Lock size={20}/>
            </button>
          </div>
        </div>

        <button
          className="flex items-center justify-center w-full hover:scale-[0.98] duration-300 ease-in-out transition-all mt-2 font-bold py-4 rounded-full cursor-pointer bg-primary-container text-on-primary-fixed hover:shadow-lg hover:shadow-high-enfasis/20"
          type="submit"
        >
          Actualizar contraseña
        </button>
      </form>
    </div>
  );
}

export default NewPassword
