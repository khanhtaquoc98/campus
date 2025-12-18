// Cookie utility functions

const COOKIE_NAME = 'admin_auth'

export const setCookie = (name, value, days = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`
}

export const getCookie = (name) => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(c.substring(nameEQ.length, c.length))
      } catch (e) {
        return c.substring(nameEQ.length, c.length)
      }
    }
  }
  return null
}

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// Auth cookie helpers
export const saveAuthToCookie = (user, token) => {
  setCookie(COOKIE_NAME, { user, token }, 7) // 7 days
}

export const getAuthFromCookie = () => {
  return getCookie(COOKIE_NAME)
}

export const removeAuthFromCookie = () => {
  deleteCookie(COOKIE_NAME)
}

