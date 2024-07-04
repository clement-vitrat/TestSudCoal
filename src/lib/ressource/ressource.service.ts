import { ApiResponse } from '@/lib/entities/utils.entity'
import axios from 'axios'
import { API_URL } from '@/lib/helpers/config.env'

export interface Ressource {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  typePostId: number
  authorId: number
}

export interface RessourceSearch extends Ressource {
  author: Author
  typePost: TypePost
  postReaction: PostReaction[]
}

export interface RessourceById extends RessourceSearch {
  postComment: PostComment[]
}

export interface PostComment {
  id: number
  content: string
  createdAt: Date
  updatedAt: Date
  attachedToType: string
  userId: number | null
  associationId: number | null
  postId: number
  parentId: number | null
  childComments: PostComment[]
  user: AuthorUser | null
}

interface AuthorUser {
  id: number
  firstName: string
  lastName: string
}

interface Author {
  id: number
  name: string
}

interface TypePost {
  id: number
  libelle: string
}

interface PostReaction {
  id: number
  postId: number
  userId: number
}

export interface FilterRessource {
  keyword: string
  sort: 'asc' | 'desc'
  authorId?: number
  regionId?: number
}

export async function searchRessource(
  filter: FilterRessource
): Promise<ApiResponse<RessourceSearch[]>> {
  const res = await axios.post<ApiResponse<RessourceSearch[]>>(
    API_URL + '/ressource/search',
    filter
  )
  return res.data
}

export async function getAllRessources(): Promise<
  ApiResponse<RessourceById[]>
> {
  const res = await axios.get<ApiResponse<RessourceById[]>>(
    API_URL + '/ressource'
  )
  return res.data
}

export async function getRessourceById(
  id: number
): Promise<ApiResponse<RessourceById>> {
  const res = await axios.get<ApiResponse<RessourceById>>(
    API_URL + '/ressource/' + id
  )
  return res.data
}

interface CommentInput {
  attachedToId: number | null
  content: string
  attachedToType: string
}

interface RessourceInput {
  title: string
  content: string
  typePostId: number
}

export async function createRessource(input: RessourceInput, token: string) {
  input.typePostId = parseInt(input.typePostId.toString())
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.post<ApiResponse<string>>(
    API_URL + '/ressource/createPost',
    input,
    config
  )
  return res.status
}

export async function createComment(input: CommentInput, token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.post(API_URL + '/comments', input, config)
  return res.status
}

export async function deleteRessourceById(id: number, token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.delete<ApiResponse<string>>(
    API_URL + '/ressource/' + id,
    config
  )
  return res.status
}

export async function udpateRessource(
  token: string,
  rid: number,
  input: { title: string; content: string }
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.post<ApiResponse<RessourceById>>(
    API_URL + '/ressource/update',
    { rid, ...input },
    config
  )
  return res.data
}
