export interface DashboardUser {
  id: string
  username: string
  nickname: string
  email: string
  emailConfirmed: boolean
  isPermanentlyBanned: boolean
  blockedUntil: string | null
  roles: string[]
}

export interface DashboardPost {
  id: string
  title: string
  slug: string
  postType: 0
  description: string
  content: string
  createdAt: string
  likesCount: 0
  dislikesCount: 0
}

export interface Statistics {
  totalTitles: number
  totalEpisodes: number
  totalUsers: number
  currentOnline: number
  dailyMaxOnline: number
}

export interface OnlineGraph {
  period: string
  startDate: string
  endDate: string
  averageOnline: number
  peakOnline: number
  data: {
    date: string
    maxOnline: number
  }[]
}
