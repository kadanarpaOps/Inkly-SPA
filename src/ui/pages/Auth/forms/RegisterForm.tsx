import type z from "zod";
import { registerSchema } from "../../../schemas/user/user.schema";
import { useUsers } from "../../../hooks/useUsers";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { RegisterUserRequest } from "../../../../core/domain/models/users/UserModel";

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  // Use Navigate
  const navigate = useNavigate();
  // Use Users
  const { registerUser, error, loading } = useUsers();
  // Use Form
  const { register, handleSubmit, formState: { errors, isSubmitted }, reset } = useForm({
    resolver: zodResolver(registerSchema)
  })

  // On Submit
  const onSubmit = async (data: RegisterFormValues) => {
    const registerRequest: RegisterUserRequest = data;
    await registerUser(registerRequest);
    if (!error) {
      const authAction = "LOGIN";
      navigate("/auth", {
        state: { authAction }
      });
      reset();
    }
  }

  return (
    <>
      <div className="w-full max-w-md flex flex-col">
        <div className="mt-1 mb-10">
          <h2 className="text-3xl font-semibold text-global tracking-tight">
            Bienvenido a Inkly
          </h2>
          <p className="text-several-light mt-2 font-light">
            Crea tu biblioteca personal y comienza a escribir hoy mismo
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
              Nombre de usuario
            </label>
            <div className="relative group">
              <input
                type="text"
                className="w-full bg-inputs-bg/30 border-none rounded-xl py-4 px-5 text-global placeholder-several-light/40 focus:ring-2 focus:ring-high-enfasis transition-all outline-none focus:outline-none mt-2"
                placeholder="ej. Scriptor_Inkly"
                {...register("userName")}
              />
              {errors.userName && <p>{errors.userName.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
              Correo Electrónico
            </label>
            <div className="relative group">
              <input
                type="email"
                className="w-full bg-inputs-bg/30 border-none rounded-xl py-4 px-5 text-global placeholder-several-light/40 focus:ring-2 focus:ring-high-enfasis transition-all outline-none focus:outline-none mt-2"
                placeholder="ejemplo@inkly.com"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
              Contraseña
            </label>
            <div className="relative group">
              <input
                type="password"
                className="w-full bg-inputs-bg/30 border-none rounded-xl py-4 px-5 text-global placeholder-several-light/40 focus:ring-2 focus:ring-high-enfasis transition-all outline-none focus:outline-none mt-2"
                placeholder="Pon tu Clave"
                autoComplete="off"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <button className="w-full bg-high-enfasis hover:bg-high-enfasis/90 text-on-primary-fixed font-semibold py-4 rounded-full transition-all duration-300 shadow-lg shadow-high-enfasis/20 active:scale-[0.98] mt-4 cursor-pointer" type="submit">
            Crear Cuenta
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
