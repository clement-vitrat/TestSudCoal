import { Region, UserRole } from '@/lib/entities/utils.entity'

export interface User {
  id: number | null
  firstName: string
  lastName: string
  email: string
  regionId: number | null
  userRoleId: number | null
}

export interface UserFromDB extends User {
  createdAt: Date | null
  updatedAt: Date | null
  region: Region | null
  userRole: UserRole | null
  userFollowAssociation: UserFollowAssociation[] | null
}

export interface UserFollowAssociation {
  id: number
  userId: number
  associationId: number
  association: {
    id: number
    name: string
  }
}
