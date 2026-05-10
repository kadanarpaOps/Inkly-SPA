import z from "zod";

export const registerSchema = z.object({
    title: z.string()
        .nonempty("El título no puede estar vacío")
        .min(2, "El título debe tener al menos 2 letras"),
    description: z.string()
        .nonempty("La sinopsis no puede estar vacía")
        .min(20, "La sinopsis es muy corta")
        .max(500, "La sinopsis debe ser de máximo 500 palabras"),
    genreName: z.string()
        .nonempty("Selecciona un género principal"),
    secondaryGenreName: z.string()
        .nonempty("Selecciona un género secundario"),
    tagNames: z.array(z.string()).default([]),
    image: z.instanceof(File).nullable()
        .refine(f => {
            if (!f) return true;
            return ["image/png", "image/jpeg", "image/webp"].includes(f!.type), "Formato no soportado"
        })
})
