export type UserType = {
  email: string
  username?: string
  userAvatar?: string
  birthday?: string
  permission: 'user' | 'moderator' | 'admin'
}

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
