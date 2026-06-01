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
