import axios, { AxiosResponse } from 'axios'
import { EmailAuthCodeRequestDto, EmailCheckRequestDto } from './request'
import {
  EmailAuthCodeResponseDto,
  EmailCheckResponseDto,
  SignUpResponseDto,
} from '@/components/navigation/dto/response/auth'
import { ResponseDto } from './response'
import SignUpRequestDto from '@/components/navigation/dto/request/sign-up.request.dto'

const responseHandler = <T,>(response: AxiosResponse<T>) => {
  const responseBody: T = response.data
  return responseBody
}

const errorHandler = (error: any) => {
  if (!error.response || !error.response.data) return null
  const responseBody: ResponseDto = error.response.data
  return responseBody
}

const DOMAIN = 'http://localhost:3000/api'
// const API_DOMAIN = `${DOMAIN}/api`

const EMAIL_CHECK_URL = () => `${DOMAIN}/users/email-check`
const EMAILAUTHCODE_URL = () => `${DOMAIN}/users/email-auth-code`
const SIGN_UP_URL = () => `${DOMAIN}/users/sign-up`

// 이메일 체크 요청
export const emailCheckRequest = async (requestBody: EmailCheckRequestDto) => {
  const result = await axios
    .post(EMAIL_CHECK_URL(), requestBody)
    // .post(DOMAIN, requestBody)
    .then(responseHandler<EmailCheckResponseDto>)

    .catch(errorHandler)
  return result
}

// 이메일 인증 코드 체크 요청
export const emailAuthCodeRequest = async (requestBody: EmailAuthCodeRequestDto) => {
  const result = await axios
    // .post(DOMAIN, requestBody)
    .post(EMAILAUTHCODE_URL(), requestBody)
    .then(responseHandler<EmailAuthCodeResponseDto>)
    .catch(errorHandler)

  return result
}

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then(responseHandler<SignUpResponseDto>)
    .catch(errorHandler)

  return result
}
