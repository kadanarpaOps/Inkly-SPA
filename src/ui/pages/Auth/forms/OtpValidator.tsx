import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, MailCheck } from "lucide-react";
import { verificationSchema } from "../../../schemas/user/recovery.schema";

type Props = {
  onSuccess: () => void;
  onBack: () => void;
}

function OtpValidator({ onSuccess, onBack }: Props) {
  const { register, handleSubmit, watch } = useForm();
  
  const onSubmit = async () => {
    const otpCode = Array.from({ length: 6 }, (_, i) => watch(`digit${i}`)).join("");
    const result = verificationSchema.safeParse({ otpCode });
    if (!result.success) {
      console.log("Errores:", result.error.format());
      return;
    }
    setTimeout(() => console.log('Respuesta simulada: 2xx OK'), 1500);
    onSuccess();
  };

  // Manejador para mover foco automáticamente
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const target = e.currentTarget;
    if (target.value && index < 5) {
      // Si escribe un número, pasa al siguiente
      const next = target.form?.elements[index + 1] as HTMLInputElement;
      next?.focus();
    } else if (e.key === "Backspace" && !target.value && index > 0) {
      // Si borra y está vacío, regresa al anterior
      const prev = target.form?.elements[index - 1] as HTMLInputElement;
      prev?.focus();
    }
  };
  
  return (
    <div>
      <div className="bg-surface-bright p-6 rounded mb-4 w-fit mx-auto text-primary"><MailCheck size={28}/></div>
      <h1 className="text-4xl text-global font-bold text-center">Verifica tu identidad</h1>
      <p className="text-several-light mt-2 mx-auto w-[80%] text-center">Introduce el código enviado a tu correo para continuar con la recuperación de tu cuenta Inkly.</p>
      <form className="flex flex-col gap-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center gap-4 my-2">
          {Array.from({ length: 6 }).map((_, i) => (
              <input
                className="w-14 h-14 text-center text-2xl bg-inputs-bg border-none text-global placeholder-several-light rounded-xl focus:ring-2 focus:ring-high-enfasis focus:outline-none transition-all"
                key={i}
                {...register(`digit${i}`)}
                maxLength={1}
                placeholder="•"
                inputMode="numeric"
                pattern="[0-9]*"
                onKeyUp={(e) => handleKeyUp(e, i)}
              />
          ))}
        </div>
        <button className="flex items-center justify-center w-full hover:scale-[0.98] duration-300 ease-in-out transition-all mt-2 font-bold py-4 rounded-full cursor-pointer bg-primary-container text-on-primary-fixed hover:shadow-lg hover:shadow-high-enfasis/20}" type="submit">Verificar<ArrowRight/></button>
      </form>
      <p className="text-center mt-4">¿No has recibido nada?</p>
      <p className="flex items-center justify-center text-sm text-primary cursor-pointer" onClick={onBack}><ArrowLeft size={16}/>Reenviar código</p>
    </div>
  );
}

export default OtpValidator
