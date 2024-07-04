import { User, UserFromDB } from '@/lib/entities/user.entity'
import axios from 'axios'
import { API_URL } from '@/lib/helpers/config.env'
import { ApiResponse } from '@/lib/entities/utils.entity'

export async function getUserInfo(
  token: string
): Promise<ApiResponse<UserFromDB>> {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const whoami = await axios.get<ApiResponse<UserFromDB>>(
    API_URL + '/users/whoami',
    config
  )
  return whoami.data
}

export async function updateUser(
  token: string,
  uid: number,
  user: { firstName: string; lastName: string; email: string }
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const data = {
    uid,
    ...user
  }
  console.log(data)
  const response = await axios.post<ApiResponse<string>>(
    API_URL + '/users/update',
    data,
    config
  )
  if (response.data.code == 200) {
    return response.data
  }
}

export async function addAssoToFavorites(token: string, assoId: number) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get<ApiResponse<string>>(
    API_URL + '/users/followAction/' + assoId,
    config
  )
  if (response.data.code == 200) {
    return response.data.code
  }
}

export async function getAllUsers() {
  const res = await axios.get<ApiResponse<UserFromDB[]>>(API_URL + '/users')
  return res.data
}

export async function deleteUser(userId: number, token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.delete<ApiResponse<string>>(
    API_URL + '/users/' + userId,
    config
  )
  if (res.data.code == 200) {
    return res.data.code
  }
}
