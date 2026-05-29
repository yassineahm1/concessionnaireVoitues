import { comptesApiUrl } from '../config/apiConfig'

/**
 * Service ComptesAPI — cookies de session (credentials: 'include').
 */

const fetchOptions = {
  credentials: 'include',
}

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Erreur HTTP ${response.status}`)
  }
  if (response.status === 204) {
    return null
  }
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export async function authentifier(compteDto) {
  const response = await fetch(`${comptesApiUrl}/authentifier`, {
    ...fetchOptions,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(compteDto),
  })
  return handleResponse(response)
}

export async function register(compteDto) {
  const response = await fetch(`${comptesApiUrl}/register`, {
    ...fetchOptions,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(compteDto),
  })
  return handleResponse(response)
}

export async function signOut() {
  const response = await fetch(`${comptesApiUrl}/signout`, {
    ...fetchOptions,
    method: 'POST',
  })
  return handleResponse(response)
}

export async function getComptes() {
  const response = await fetch(comptesApiUrl, fetchOptions)
  return handleResponse(response)
}
