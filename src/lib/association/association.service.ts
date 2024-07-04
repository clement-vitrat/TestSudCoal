import { ApiResponse } from '@/lib/entities/utils.entity'
import axios from 'axios'
import { API_URL } from '@/lib/helpers/config.env'

export interface Association {
  id: number
  name: string
  email: string
  rna: string
  description: string
  regionId: number
  createdAt: Date
  updatedAt: Date
  post: Post[]
}

interface Post {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  typePostId: number
  authorId: number
}

export async function getAssoInfo(
  token: string
): Promise<ApiResponse<Partial<Association>>> {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const whoami = await axios.get<ApiResponse<Partial<Association>>>(
    API_URL + '/asso/whoami',
    config
  )
  return whoami.data
}

export async function getAssoById(
  id: number
): Promise<ApiResponse<Partial<Association>>> {
  const res = await axios.get<ApiResponse<Partial<Association>>>(
    API_URL + `/asso/searchById/${id}`
  )
  return res.data
}

export async function getAssociations() {
  const res = await axios.get<ApiResponse<Association[]>>(API_URL + '/asso')
  return res.data
}

export async function searchAssociation(filter: {
  keyword: string
  sort: 'asc' | 'desc'
}) {
  const res = await axios.post<ApiResponse<Association[]>>(
    API_URL + '/asso/search',
    filter
  )
  return res.data
}

export async function deleteAssociationById(id: number, token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.delete<ApiResponse<string>>(
    API_URL + `/asso/${id}`,
    config
  )
  return res.status
}

export async function updateAssociation(
  token: string,
  aid: number,
  input: { name: string; description: string; email: string }
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.post<ApiResponse<Association>>(
    API_URL + '/asso/update',
    { aid, ...input },
    config
  )
  return res.data
}
