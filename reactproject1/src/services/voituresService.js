import { voituresApiUrl } from '../config/apiConfig'

/**
 * Service d'accès à VoituresAPI — calqué sur clientsService.js et VoituresAPIController.
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

export async function getAllVoitures() {
  const response = await fetch(voituresApiUrl)
  return handleResponse(response)
}

export async function getVoiture(matricule) {
  const response = await fetch(`${voituresApiUrl}/${encodeURIComponent(matricule)}`)
  return handleResponse(response)
}

export async function createVoiture(voitureDto) {
  const response = await fetch(voituresApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(voitureDto),
  })
  return handleResponse(response)
}

export async function updateVoiture(matricule, voitureDto) {
  const response = await fetch(`${voituresApiUrl}/${encodeURIComponent(matricule)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(voitureDto),
  })
  return handleResponse(response)
}

export async function deleteVoiture(matricule) {
  const response = await fetch(`${voituresApiUrl}/${encodeURIComponent(matricule)}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}
