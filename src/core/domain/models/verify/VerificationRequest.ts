export interface VerificationRequest {
  userNameOrEmail: string,
  verificationType: string,
  code?: string 
}