export type GetUserType = {
  email: string
  username: string
  userAvatar?: string
  permission: 'user' | 'moderator' | 'admin'
} | null

export type GetUserInfo = {
  username?: string
  email: string
  birthday?: string
}

export type ChangeProfileInfoType = {
  username: string
  email: string
  birthday: string | undefined
}

export type ChangePasswordType = {
  password: string
  newPassword: string
}
