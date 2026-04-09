import { StudentRoleNum, UniversityDepartmentRoleEnum } from "@/enums/university.dept.enum"

export interface User {
  uid: string
  email: string | null
  name: string | null
  role: UniversityDepartmentRoleEnum | StudentRoleNum
}

export interface AuthState {
  user: User | null
  token: string
  loading: boolean
  error: string | null
  status: "pending" | "succeed" | "rejected"
}