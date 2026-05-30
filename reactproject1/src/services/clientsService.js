import { clientsApiUrl } from '../config/apiConfig'

/**
 * Service d'accès à ClientsAPI — calqué sur ClientsAPIController.
 * Utilise fetch natif (pas de librairie HTTP externe).
 */

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

export async function getAllClients() {
  const response = await fetch(clientsApiUrl)
  return handleResponse(response)
}

export async function getClient(cine) {
  const response = await fetch(`${clientsApiUrl}/${encodeURIComponent(cine)}`)
  return handleResponse(response)
}

export async function createClient(clientDto) {
  const response = await fetch(clientsApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clientDto),
  })
  return handleResponse(response)
}

export async function updateClient(cine, clientDto) {
  const response = await fetch(`${clientsApiUrl}/${encodeURIComponent(cine)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clientDto),
  })
  return handleResponse(response)
}

export async function deleteClient(cine) {
  const response = await fetch(`${clientsApiUrl}/${encodeURIComponent(cine)}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}

export async function getMonProfil() {
  const response = await fetch(`${clientsApiUrl}/mon-profil`, {
    credentials: 'include',
  })
  return handleResponse(response)
}

export async function updateMonProfil(clientDto) {
  const response = await fetch(`${clientsApiUrl}/mon-profil`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clientDto),
  })
  return handleResponse(response)
}
