export interface Region {
  id: number
  name: string
  nutsCode: string
}

export interface UserRole {
  id: number
  libelle: string
}

export interface TypePost {
  id: number
  libelle: string
}

export interface ApiResponse<T> {
  code: number
  data: T
}
