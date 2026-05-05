import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { verificationSchema, type OtpFormData } from "./zodSchemas/zodRecoveryPass";

type Props = {
  onSuccess: () => void;
}

function OtpValidator({ onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<OtpFormData>({
    resolver: zodResolver(verificationSchema),
  });
  
  const onSubmit = async (data: OtpFormData) => {
    console.log(`data=${data}`);
    setTimeout(() => console.log('Respuesta simulada: 2xx OK'), 1500);
    onSuccess();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("otpCode")}
        placeholder="••••••"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      {errors.otpCode && <p>{errors.otpCode.message}</p>}
      <button type="submit">Verificar</button>
    </form>
  );
}

export default OtpValidator
