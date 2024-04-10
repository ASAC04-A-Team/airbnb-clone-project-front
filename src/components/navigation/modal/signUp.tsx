'use client'

import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import ViewMore1 from '@/components/navigation/modal/viewMore1'
import ViewMore2 from '@/components/navigation/modal/viewMore2'
import { EmailAuthCodeRequestDto, EmailCheckRequestDto } from '@/components/navigation/dto/request'
import {
  EmailCheckResponseDto,
  EmailAuthCodeResponseDto,
  SignUpResponseDto,
} from '@/components/navigation/dto/response/auth'
import { emailAuthCodeRequest, emailCheckRequest, signUpRequest } from '@/components/navigation/dto'
import { ResponseCode, ResponseMessage } from '@/components/types/enums'
import SignUpRequestDto from '@/components/navigation/dto/request/sign-up.request.dto'
import { ResponseBody } from '@/components/types'

export default function SignUpButton() {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setChecked(event.target.checked)
  }
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // 먼저 회원가입에서 이메일, 비밀번호, 이메일 인증코드 부터 진행
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const certificationNumberRef = useRef<HTMLInputElement | null>(null)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [certificationNumber, setCertificationNumber] = useState<string>('')

  const [isEmailError, setEmailError] = useState<boolean>(false)
  const [isPasswordError, setPasswordError] = useState<boolean>(false)
  const [isCertificationNumberError, setCertificationNumberError] = useState<boolean>(false)

  const [emailMessage, setEmailMessage] = useState<string>('')
  const [passwordMessage, setPasswordMessage] = useState<string>('')
  const [certificationMessage, setCertificationMessage] = useState<string>('')

  // 이메일 정규식
  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/
  const [isEmailCheck, setEmailCheck] = useState<boolean>(false) // 이메일 중복 확인
  const [isCertificationCheck, setCertificationCheck] = useState<boolean>(false) // 인증번호 확인

  // 이메일 메시지
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
    setEmailMessage('')
    setEmailCheck(false)
  }

  // 비밀번호 메시지
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPassword(value)
    setPasswordMessage('')
  }

  // 이메일 인증 코드 메시지
  const onCertificationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setCertificationNumber(value)
    setCertificationMessage('')
  }

  // 이메일 응답
  const emailCheckResponse = (responseBody: ResponseBody<EmailCheckResponseDto>) => {
    if (!responseBody) return
    const { code } = responseBody
    if (code === ResponseCode.VALIDATION_FAIL) alert('이메일을 입력하세요.')
    if (code === ResponseCode.DUPLICATE_EMAIL) {
      setEmailError(true)
      setEmailMessage('이미 사용 중인 이메일입니다')
      setEmailCheck(false)
    }

    if (code === ResponseCode.MAIL_FAIL) alert('이메일 전송에 실패했습니다')
    if (code === ResponseCode.DATABASE_ERROR) alert('DB 오류입니다')
    if (code !== ResponseCode.SUCCESS) return

    setEmailError(false)
    setEmailMessage('사용 가능한 이메일입니다')
    setEmailMessage('인증번호가 전송되었습니다.')
    setEmailCheck(true)
  }

  const checkCertificationResponse = (responseBody: ResponseBody<EmailAuthCodeResponseDto>) => {
    if (!responseBody) return
    const { code } = responseBody

    if (code === ResponseCode.VALIDATION_FAIL) alert('이메일, 인증번호를 입력해주세요')
    if (code === ResponseCode.EMAILAUTHCODE_FAIL) {
      setCertificationNumberError(true)
      setCertificationMessage('인증번호가 일치하지 않습니다')
      setCertificationCheck(false)
    }

    if (code === ResponseCode.DATABASE_ERROR) alert('DB 오류입니다')
    if (code !== ResponseCode.SUCCESS) return

    setCertificationNumberError(false)
    setCertificationMessage('인증번호가 확인되었습니다')
    setCertificationCheck(true)
  }

  const signUpResponse = (responseBody: ResponseBody<SignUpResponseDto>) => {
    if (!responseBody) return
    const { code } = responseBody
    if (code === ResponseCode.VALIDATION_FAIL) alert('모든 값을 입력하세요')
    if (code === ResponseCode.EMAILAUTHCODE_FAIL) {
      setCertificationNumberError(true)
      setCertificationMessage('인증번호가 일치하지 않습니다')
      setCertificationCheck(false)
    }

    if (code === ResponseCode.DATABASE_ERROR) alert('DB 에러')
    if (code !== ResponseCode.SUCCESS) return
  }

  // 이메일 에러 메시지 (버튼 클릭 시) => 이메일만
  const onEmailButtonClickHandler = () => {
    if (!email) return

    const checkedEmail = emailPattern.test(email)
    if (!checkedEmail) {
      setEmailError(true)
      setEmailMessage('이메일 형식이 아닙니다.')
      return
    }

    const requestBody: EmailCheckRequestDto = { email }

    emailCheckRequest(requestBody).then(emailCheckResponse)

    setEmailError(false)
    setEmailMessage('사용 가능한 이메일입니다.')
  }

  const onPasswordButtonClickHandler = () => {
    if (!password) {
      setPasswordError(true)
      setPasswordMessage('비밀번호를 입력해야 합니다.')
      return
    }

    setPasswordError(false)
    setPasswordMessage('사용 가능한 비밀번호입니다')
  }

  // 이메일, 인증 코드 에러 메시지 (버튼 클릭 시)
  const onCertificationNumberButtonClickHandler = () => {
    if (!email && !certificationNumber) return

    const requestBody: EmailAuthCodeRequestDto = { email, certificationNumber }
    emailAuthCodeRequest(requestBody).then(checkCertificationResponse)
  }

  const onSignUpButtonClickHandler = () => {
    if (!email && !password && !certificationNumber) return
    if (!isCertificationCheck) {
      alert('이메일 인증은 필수입니다')
      return
    }

    const requestBody: SignUpRequestDto = { email, password, certificationNumber }
    signUpRequest(requestBody).then(signUpResponse)
  }

  const onSignInButtonClickHandler = () => {
    // 사용자가 입력한 로그인 정보 보내기
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
  }

  const onSignInOrSignUpButtonClick = () => {
    if (emailRef.current === null || passwordRef.current === null) {
      handleOpen()
    } else {
      handleClose()
      onSignInButtonClickHandler()
    }
  }

  // onKeyDown : 키를 눌렀을때 이벤트  (shift, alt, controll, capslock 등의 모든 키에 동작한다. 단 한영변환, 한자 등의 특수키는 인식 못한다).
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    if (!emailRef.current) return
    emailRef.current.focus()
  }

  const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    if (!passwordRef.current) return
    passwordRef.current.focus()
  }

  const onCertificationNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    if (!certificationNumberRef.current) return
    certificationNumberRef.current.focus()
  }

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    let month = (today.getMonth() + 1).toString()
    let day = today.getDate().toString()

    // 월에서 한 자리 숫자라면 0을 추가
    if (month.length === 1) {
      month = '0' + month
    }
    if (day.length === 1) {
      day = '0' + day
    }

    // yyyy-mm-dd 형식으로 날짜 설정
    const formattedDate = `${year}-${month}-${day}`
    setCurrentDate(formattedDate)
  }, [])

  return (
    <>
      <Button
        onClick={onSignInOrSignUpButtonClick}
        className='duration-400 mt-5 h-[48px] w-full rounded-lg border-solid border-black bg-mainColor text-base font-bold text-white transition-transform hover:bg-pink-700 active:scale-90'
      >
        계속
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          className='relative left-1/2 top-1/2 h-[820px] w-[745px] -translate-x-1/2 -translate-y-1/2
           transform rounded-2xl border-2 border-black bg-white p-16 shadow-lg'
        >
          <div className='relative left-1/2 top-1/2 w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg p-8'>
            <div className='flex h-full w-[800px] items-center justify-center divide-y-2 divide-gray-400'>
              <header className='relative mb-10 ml-7 flex h-full w-full flex-row items-center'>
                <Button onClick={handleClose}>
                  <Image
                    src='/svgIcons/leftAngle.svg'
                    alt='My leftAngle SVG'
                    width={20}
                    height={20}
                    className='absolute left-0'
                  />
                </Button>
                <div className='absolute left-1/3 text-xl font-semibold'>회원 가입 완료하기</div>
              </header>
            </div>
            <hr className='text-mainGray' />
            <div className='max-h-[600px] overflow-y-auto overflow-x-hidden'>
              <form action='/api/users/signup' method='post'>
                <TextField
                  type='text'
                  className='ml-8 mt-10 w-[650px]'
                  placeholder='이름(예: 길동)'
                ></TextField>
                <TextField type='text' className='ml-8 w-[650px]' placeholder='성(예: 홍)' />

                <Typography className='ml-8 w-[650px]'>
                  정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.
                </Typography>

                <input
                  type='date'
                  className='ml-8 mt-8 h-[60px] w-[650px] rounded-lg border border-slate-400 px-2 text-xl'
                  min='1900-01-01'
                  max={currentDate}
                  placeholder='연도-월-일'
                />

                <Typography className='ml-8 w-[650px]'>
                  18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게
                  공개되지 않습니다.
                </Typography>

                {/* 입력했던 이메일 값이 오도록 함(검증). 그리고 이메일 형식이 아니면 빨강으로 표시 */}
                <TextField
                  ref={emailRef}
                  className='ml-8 mt-8 w-[650px]'
                  title='이메일'
                  placeholder='이메일 입력'
                  type='text'
                  value={email}
                  onChange={onEmailChangeHandler}
                  onClick={onEmailButtonClickHandler}
                  onKeyDown={onEmailKeyDownHandler}
                  error={isEmailError}
                  helperText={emailMessage}
                  fullWidth
                />

                <Typography className='ml-8 w-[650px]'>
                  예약 확인과 영수증을 이메일로 보내드립니다.
                </Typography>

                {/* 비밀번호 검증 필요*/}
                <div className='mt-4 w-[740px] divide-y-2 divide-gray-400'>
                  <div>
                    <OutlinedInput
                      ref={passwordRef}
                      className='ml-8 mt-8 w-[650px]'
                      placeholder='비밀번호'
                      type={showPassword ? 'text' : 'password'}
                      label='패스워드'
                      onChange={onPasswordChangeHandler}
                      onClick={onPasswordButtonClickHandler}
                      onKeyDown={onPasswordKeyDownHandler}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>
                </div>

                <TextField
                  ref={certificationNumberRef}
                  className='ml-8 mt-8 w-[650px]'
                  title='이메일 인증 코드'
                  placeholder='이메일 인증 코드 입력'
                  type='text'
                  value={certificationNumber}
                  onChange={onCertificationChangeHandler}
                  onClick={onCertificationNumberButtonClickHandler}
                  onKeyDown={onCertificationNumberKeyDownHandler}
                  error={isCertificationNumberError}
                  helperText={certificationMessage}
                  fullWidth
                />

                {/* 체크 박스 */}
                <div>
                  <FormControlLabel
                    control={<Checkbox color='primary' onChange={handleCheckboxChange} />}
                    label={
                      <>
                        개인 정보 수집 및 이용에 동의합니다.
                        <br />
                        1. 에어비앤비가 수집하는 개인 정보 에어비앤비 플랫폼을 이용하는 데 필요한
                        정보
                        <br />
                        당사는 회원님이 에어비앤비 플랫폼을 이용할 때 회원님의 개인 정보를
                        수집합니다.
                        <br />
                        그렇지 않은 경우, 에어비앤비는 요청하신 서비스를 회원님께 제공하지 못할 수
                        있습니다.
                        <br />
                        이러한 정보에는 다음이 포함됩니다.
                      </>
                    }
                    labelPlacement='start'
                    className='ml-7 mt-4 w-[670px] justify-between'
                  />

                  {/* 추가 모달 */}
                  <div className='ml-5'>
                    <ViewMore1 />
                  </div>
                </div>

                {/* 체크 박스 */}
                <div>
                  <FormControlLabel
                    control={<Checkbox color='primary' onChange={handleCheckboxChange} />}
                    label={
                      <>
                        마케팅 이메일 수신을 원합니다( 선택).
                        <br />
                        에어비앤비 회원 전용 할인, 추천 여행 정보, 마케팅 이메일, 푸시 알림을
                        보내드립니다.
                        <br />
                        계정 설정 또는 마케팅 알림에서 언제든지 수신을 거부할 수 있습니다.
                      </>
                    }
                    labelPlacement='start'
                    className='ml-7 mt-4 w-[670px] justify-between'
                  />

                  {/* 추가 모달 */}
                  <div className='ml-5'>
                    <ViewMore2 />
                  </div>
                </div>
                <hr />

                <Typography className='ml-5 mt-8'>
                  동의 및 계속하기를 선택하여 에어비앤비 서비스 약관, 결제 서비스 약관,
                  위치기반서비스 이용약관, 차별 금지 정책, 개인정보 처리방침에 동의합니다.
                </Typography>

                <Button
                  onClick={onSignUpButtonClickHandler}
                  className='duration-400 ml-8 mt-5 h-[60px] w-[670px] 
                rounded-lg border-solid border-black bg-pink-700 text-2xl 
                font-bold text-white transition-transform hover:bg-pink-700 active:scale-90'
                >
                  동의 및 계속하기
                </Button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
