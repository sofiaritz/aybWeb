const toBool = (input: string) => input === "1" || input === "true" || input === "yes"

export const AYB_WEB_VERSION = "0.0.0-alpha"
export const AYB_HOST = import.meta.env["VITE_AYB_HOST"] || undefined
export const AYB_HOST_DOCS = import.meta.env["VITE_AYB_HOST_DOCS"] || undefined
export const AYB_DISABLE_SUPPORT = toBool(import.meta.env["VITE_AYB_DISABLE_SUPPORT"])
