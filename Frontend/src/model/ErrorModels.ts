export interface ErrorData {
  ErrorId: string
  Exception: string
  Messages: string[]
  Source: string
  StatusCode: number
  SupportMessage: string
}

export interface ValidationErrorData {
  type: string
  title: string
  status: number
  traceId: string
  errors: Record<string, string[]>
}
