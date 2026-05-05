import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { requestSchema, type RequestPasswordFormData } from "./zodSchemas/zodRecoveryPass";

type Props = {
  onSuccess: () => void;
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("emailOrUsername")} placeholder="Escribe aquí..." />
      {errors.emailOrUsername && <p>{errors.emailOrUsername.message}</p>}
      <button type="submit">Continuar</button>
    </form>
  );
}

export default RequestPassword
