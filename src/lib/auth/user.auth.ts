import axios, { AxiosResponse } from 'axios'
import { API_URL } from '@/lib/helpers/config.env'
import { ApiResponse } from '@/lib/entities/utils.entity'

export async function userLogin(input: {
  email: string
  password: string
}): Promise<{
  data: {
    token: string
    identity: 'isuser' | 'isassociation'
    role: number
    message: string
  }
  code: number
}> {
  // Verification

  // Send request
  const res: AxiosResponse<
    ApiResponse<AuthResponse>,
    { code: number; message: string }
  > = await axios.post(API_URL + '/users/login', input)
  if (!res.data) throw Error(`Unable to log in: ${JSON.stringify(res.data)}`)
  return res.data
}

interface UserRegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
  regionId: string | number
}

export interface AuthResponse {
  token: string
  identity: 'isuser' | 'isassociation'
  role: number
  message: string
}
export async function userRegister(input: UserRegisterInput): Promise<{
  data: {
    token: string
    identity: 'isuser' | 'isassociation'
    role: number
    message: string
  }
  code: number
}> {
  // Verification
  input.regionId = parseInt(input.regionId as string)

  // Request
  const res = await axios.post<ApiResponse<AuthResponse>>(
    API_URL + '/users/signup',
    input
  )

  return res.data
}
