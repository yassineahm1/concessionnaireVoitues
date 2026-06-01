import { locationsApiUrl } from '../config/apiConfig';

const fetchOptions = {
  credentials: 'include',
};

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Erreur HTTP ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getLocations() {
  const response = await fetch(locationsApiUrl, fetchOptions);
  return handleResponse(response);
}

export async function createLocation(locationCreateDto) {
  const response = await fetch(locationsApiUrl, {
    ...fetchOptions,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locationCreateDto),
  });
  return handleResponse(response);
}

export async function cancelLocation(id) {
  const response = await fetch(`${locationsApiUrl}/${id}`, {
    ...fetchOptions,
    method: 'DELETE',
  });
  return handleResponse(response);
}

/**
 * Télécharge la facture PDF d'une réservation.
 * Déclenche automatiquement le téléchargement dans le navigateur.
 */
export async function downloadFacture(id) {
  const response = await fetch(`${locationsApiUrl}/${id}/facture`, {
    credentials: 'include',
  });
  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg || `Erreur HTTP ${response.status}`);
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `facture-${String(id).padStart(5, '0')}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

