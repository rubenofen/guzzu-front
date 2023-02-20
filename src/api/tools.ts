let token = typeof window !== 'undefined' && localStorage.getItem('apikey')

export function updateApiToken(t: string) {
  localStorage.setItem('apikey', t)
  token = t
}

export function isTokenAvailable(): boolean {
  const t = localStorage.getItem('apikey')
  if (t) return true
  return false
}

export async function postApi(url: string, payload: any) {
  const headers: any = {
    'Content-Type': 'application/json'
  }

  if (payload?.did || token) headers.Authorization = `Bearer ${payload?.did || token}`

  const response = await fetch(`${process.env.BASE_URL}${url}`, {
    method: 'POST',
    mode: 'cors',
    headers,
    body: JSON.stringify(payload)
  })

  if (response.status === 204) return true
  if (response.status - 399 > 0) throw await response.json()
  return response.json()
}

export async function putApi(url: string, payload: any) {
  const headers: any = {
    'Content-Type': 'application/json'
  }

  if (payload?.did || token) headers.Authorization = `Bearer ${payload?.did || token}`

  const response = await fetch(`${process.env.BASE_URL}${url}`, {
    method: 'PUT',
    mode: 'cors',
    headers,
    body: JSON.stringify(payload)
  })

  // eslint-disable-next-line no-throw-literal
  if (response.status === 404) throw 'Not found'

  if (response.status === 204) return true
  if (response.status - 399 > 0) throw await response.json()
  return response.json()
}

export async function getApi(url: string) {
  const headers: any = {
    'Content-Type': 'application/json'
  }

  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${process.env.BASE_URL}${url}`, {
    headers
  })

  // eslint-disable-next-line no-throw-literal
  if (response.status - 399 > 0) throw await response.json()

  return await response.json()
}
