export interface IUser {
  uuid: string
  name: string
  firstName: string
  lastName: string
  email: string
  imageUrl?: string
  phone?: string
  isSuperAdmin: boolean
}
