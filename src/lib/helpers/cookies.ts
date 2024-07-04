'use client'

import { getDecryptedData } from '@/lib/helpers/data.encrypt'
import { AuthResponse } from '@/lib/auth/user.auth'

export async function checkAndSetAuthFromCookie() {
  const data = (await getDecryptedData('auth-info')) as Partial<AuthResponse>
  if (data && data.token) {
    return data
  }
}
