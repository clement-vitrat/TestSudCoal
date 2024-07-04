import { ApiResponse } from '@/lib/entities/utils.entity'
import { AuthResponse } from '@/lib/auth/user.auth'
import { API_URL } from '@/lib/helpers/config.env'
import axios from 'axios'

export async function associationLogin(input: {
  email: string
  password: string
}): Promise<ApiResponse<AuthResponse>> {
  // Verification

  // Send request
  const res = await axios.post<ApiResponse<AuthResponse>>(
    API_URL + '/asso/login',
    input
  )
  return res.data
}

interface AssoRegisterInput {
  name: string
  email: string
  rna: string
  description: string
  password: string
  passwordConfirmation: string
  regionId: string | number
}
export async function associationRegister(
  input: AssoRegisterInput
): Promise<ApiResponse<Partial<AuthResponse>>> {
  // Verification
  input.regionId = parseInt(input.regionId as string)

  // Request
  const res = await axios.post<ApiResponse<AuthResponse>>(
    API_URL + '/asso/signup',
    input
  )
  return res.data
}
