import { ImageBase } from './image.types'

export type Roles =
  | 'User'
  | 'Admin'
  | 'Moderator'
  | 'Actor'
  | 'Creator'
  | 'Donator'
  | 'Smm'
  | 'Sound-designer'

export type UserType = {
  email: string
  username?: string
  avatar: string
  birthday?: string
  roles: Roles[]
}

export type GetUserInfo = {
  username?: string
  email: string
  birthday?: string
}

export type ChangeProfileInfoType = {
  username: string
  birthday: string | undefined
}

export type ChangePasswordType = {
  password: string
  newPassword: string
}

export type UserInfo = {
  id: string
  nickname: string
  email: string
  emailConfirmed: boolean
  status: number
  createdAt: string
  avatar: ImageBase | null
  blockedUntil: string | null
  blockReason: string | null
  isPermanentlyBanned: boolean
  canUploadFiles: boolean
  canSendMessages: boolean
  roles: string[]
  favoriteTitles: null
  watchedTitles: null
}
