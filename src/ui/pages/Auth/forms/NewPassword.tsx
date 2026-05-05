import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newPasswordSchema, type NewPasswordFormData } from "./zodSchemas/zodRecoveryPass";

type Props = {
  onSuccess: () => void;
}

function NewPassword({ onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    console.log(`data=${data}`);
    setTimeout(() => console.log('Respuesta simulada: 2xx OK'), 1500);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="newPassword" {...register("newPassword")} placeholder="••••••••••••" />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}
      <button type="submit">Actualizar contraseña</button>
    </form>
  );
}

export default NewPassword
