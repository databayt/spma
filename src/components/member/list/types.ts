export interface MemberListItem {
  id: string
  fullNameAr: string
  fullNameEn: string
  email: string
  phone: string
  city: string
  image: string | null
  jobTitle: string | null
  organization: string | null
  certifications: string[]
  committees: string[]
}
