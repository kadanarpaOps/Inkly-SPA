import z from "zod";

// step 1
export const requestSchema = z.object({
  emailOrUsername: z.string()
    .trim()
    .nonempty("Correo o usuario es obligatorio")
});

// step 2
export const verificationSchema = z.object({
  otpCode: z.string()
    .trim()
    .nonempty("El código es obligatorio")
    .regex(/^\d+$/, "El código debe contener solo números")
    .length(6, "El código debe tener 6 dígitos")
});

// step 3
export const newPasswordSchema = z.object({
  newPassword: z.string()
    .trim()
    .nonempty("La contraseña es obligatoria")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{7,30}$/,
      "Debe tener entre 7 y 30 caracteres, mínimo 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial"
    )
});

export type RequestPasswordFormData = z.infer<typeof requestSchema>;
export type OtpFormData = z.infer<typeof verificationSchema>;
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;