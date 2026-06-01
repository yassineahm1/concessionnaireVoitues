/**
 * Configuration centralisée de l'API backend.
 * La valeur provient de .env.development (VITE_API_BASE_URL).
 */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7202'

export const clientsApiUrl = `${apiBaseUrl}/api/ClientsAPI`
export const voituresApiUrl = `${apiBaseUrl}/api/VoituresAPI`
export const comptesApiUrl = `${apiBaseUrl}/api/ComptesAPI`
export const locationsApiUrl = `${apiBaseUrl}/api/LocationsAPI`
