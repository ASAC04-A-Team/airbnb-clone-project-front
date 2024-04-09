import axios, { AxiosResponse } from 'axios'
import { EmailAuthCodeRequestDto, EmailCheckRequestDto } from './request'
import {
  EmailAuthCodeResponseDto,
  EmailCheckResponseDto,
} from '@/components/navigation/response/auth'
import { ResponseDto } from './response'

const responseHandler = <T,>(response: AxiosResponse<T>) => {
  const responseBody: T = response.data
  return responseBody
}

const errorHandler = (error: any) => {
  if (!error.response || !error.response.data) return null
  const responseBody: ResponseDto = error.response.data
  return responseBody
}

const DOMAIN = 'http://localhost:3000/practiceLoginAndSignUp'
const API_DOMAIN = `${DOMAIN}/api`

// const EMAIL_CHECK_URL = () => `${API_DOMAIN}/auth/email-check`
// const EMAILAUTHCODE_URL = () => `${API_DOMAIN}/auth/email-auth-code`

// 이메일 체크 요청
export const emailCheckRequest = async (requestBody: EmailCheckRequestDto) => {
  const result = await axios
    // .post(EMAIL_CHECK_URL(), requestBody)
    .post(DOMAIN, requestBody)
    .then(responseHandler<EmailCheckResponseDto>)

    .catch(errorHandler)
  return result
}

// 이메일 인증 코드 체크 요청
export const emailAuthCodeRequest = async (requestBody: EmailAuthCodeRequestDto) => {
  const result = await axios
    .post(DOMAIN, requestBody)
    .then(responseHandler<EmailAuthCodeResponseDto>)
    .catch(errorHandler)

  return result
}
