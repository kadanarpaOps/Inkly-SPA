import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { requestSchema, type RequestPasswordFormData } from "./zodSchemas/zodRecoveryPass";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

type Props = {
  onSuccess: () => void;
  onBack: () => void;
}

function RequestPassword({ onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<RequestPasswordFormData>({
      resolver: zodResolver(requestSchema),
    });
    
    const onSubmit = async (data: RequestPasswordFormData) => {
      console.log(`data=${data}`);
      setTimeout(() => console.log('Respuesta simulada: 2xx OK'), 1500);
      onSuccess();
    };

  return (
    <div>
      <h1 className="text-4xl text-global font-bold">Recuperar acceso</h1>
      <p className="text-several-light mt-2 w-[80%]">Inicia el proceso para restablecer tu contraseña. Te enviaremos un código de seguridad para verificar tu identidad.</p>
      <form className="flex flex-col gap-8 my-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">CORREO ELECTRÓNICO O NOMBRE DE USUARIO</label>
          <input className="w-full bg-inputs-bg border-none text-global placeholder-several-light rounded-xl px-5 py-4 mt-2 focus:ring-2 focus:ring-high-enfasis focus:outline-none transition-all" {...register("emailOrUsername")} placeholder="Escribe aquí..." />
          {errors.emailOrUsername && <p>{errors.emailOrUsername.message}</p>}
        </div>
        <button className="flex items-center justify-center w-full hover:scale-[0.98] duration-300 ease-in-out transition-all mt-2 font-bold py-4 rounded-full cursor-pointer bg-primary-container text-on-primary-fixed hover:shadow-lg hover:shadow-high-enfasis/20}" type="submit">Continuar<ArrowRight/></button>
      </form>
      <Link className="flex items-center justify-center text-sm" to="/auth"><ArrowLeft size={16}/> Volver al inicio de sesión</Link>
    </div>
  );
}

export default RequestPassword
