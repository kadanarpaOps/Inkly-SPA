import z from "zod";

export const registerSchema = z.object({
    username: z.string()
        .nonempty("Tu Usuario es obligatorio")
        .regex(/^[A-ZÑ][A-Za-zÀ-ÿ]+(\s[A-Za-zÀ-ÿ]+){0,4}$/, "Nombre inválido"),
    email: z.string()
        .nonempty("Tu Correo es obligatorio")
        .regex(/^[\w.%+-]+@[A-Za-z\d.-]{2,}\.[a-z]{2,6}$/, "Email inválido"),
    password: z.string()
        .nonempty("To Contraseña es obligatoria")
        .regex(
            /^(?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[^a-zA-Z\d]+)[a-zA-Z0-9].{7,30}$/,
            "Ingresa una Contraseña entre 7 y 30 carácteres, mínimo 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial"
        )
})
