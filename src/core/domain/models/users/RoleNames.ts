
export const rolesNames = {
    INKLY_ADMIN: "INKLY_ADMIN",
    INKLY_USER: "INKLY_USER",
} as const;

export type RolesNames = typeof rolesNames[keyof typeof rolesNames];
