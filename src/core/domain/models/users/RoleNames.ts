
export const rolesNames = {
    INKLY_ADMIN: "INKLY_ADMIN",
    INKLY_USE: "INKLY_USER",
} as const;

export type RolesNames = typeof rolesNames[keyof typeof rolesNames];