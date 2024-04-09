// // 'use client'

// import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import Modal from '@mui/material/Modal'
// import TextField from '@mui/material/TextField'
// import Image from 'next/image'
// import OutlinedInput from '@mui/material/OutlinedInput'
// import Visibility from '@mui/icons-material/Visibility'
// import VisibilityOff from '@mui/icons-material/VisibilityOff'
// import InputAdornment from '@mui/material/InputAdornment'
// import Checkbox from '@mui/material/Checkbox'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import ViewMore1 from '@/components/navigation/modal/viewMore1'
// import ViewMore2 from '@/components/navigation/modal/viewMore2'
// import { EmailAuthCodeRequestDto, EmailCheckRequestDto } from '@/components/navigation/request'
// import {
//   EmailAuthCodeResponseDto,
//   EmailCheckResponseDto,
// } from '@/components/navigation/response/auth'
// import { emailAuthCodeRequest, emailCheckRequest } from '@/components/navigation'
// import { ResponseBody } from '@/app/practiceLoginAndSignUp/apis/types'
// import { ResponseCode } from '@/components/types'

// export default function SignUpButton() {
//   const [checked, setChecked] = useState(false)

//   const handleCheckboxChange = (event: {
//     target: { checked: boolean | ((prevState: boolean) => boolean) }
//   }) => {
//     setChecked(event.target.checked)
//   }
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [open, setOpen] = useState(false)

//   const handleOpen = () => {
//     setOpen(true)
//   }
//   const handleClose = () => {
//     setOpen(false)
//   }

//   // 먼저 회원가입에서 이메일, 비밀번호, 이메일 인증코드 부터 진행
//   const emailRef = useRef<HTMLInputElement | null>(null)
//   const passwordRef = useRef<HTMLInputElement | null>(null)
//   const emailAuthCodeRef = useRef<HTMLInputElement | null>(null)

//   const [email, setEmail] = useState<string>('')
//   const [password, setPassword] = useState<string>('')
//   const [emailAuthCode, setEmailAuthCode] = useState<string>('')

//   const [isEmailError, setEmailError] = useState<boolean>(false)
//   const [isPasswordError, setPasswordError] = useState<boolean>(false)
//   const [isEmailAuthCodeError, setEmailAuthCodeError] = useState<boolean>(false)

//   const [emailMessage, setEmailMessage] = useState<string>('')
//   const [passwordMessage, setPasswordMessage] = useState<string>('')
//   const [emailAuthCodeMessage, setEmailAuthCodeMessage] = useState<string>('')

//   // 이메일 정규식
//   const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/
//   const [isEmailCheck, setEmailCheck] = useState<boolean>(false)
//   const [isEmailAuthCodeCheck, setEmailAuthCodeCheck] = useState<boolean>(false)

//   // 이메일 메시지
//   const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target
//     setEmail(value)
//     setEmailMessage('')
//     setEmailCheck(false)
//   }

//   // 비밀번호 메시지
//   const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target
//     setPassword(value)
//     setPasswordMessage('')
//   }

//   // 이메일 인증 코드 메시지
//   const onEmailAuthCodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target
//     setEmailAuthCode(value)
//     setEmailAuthCodeMessage('')
//   }

//   // 이메일 응답
//   const emailCheckResponse = (responseBody: ResponseBody<EmailCheckResponseDto>) => {
//     if (!responseBody) return
//     const { code } = responseBody
//     if (code === ResponseCode.VALIDATION_FAIL) alert('이메일을 입력하세요.')
//     if (code === ResponseCode.DUPLICATE_EMAIL) {
//       setEmailError(true)
//       setEmailMessage('이미 사용 중인 이메일입니다')
//       setEmailCheck(false)
//     }

//     if (code === ResponseCode.MAIL_FAIL) alert('이메일 전송에 실패했습니다')
//     if (code === ResponseCode.DATABASE_ERROR) alert('DB 오류입니다')
//     if (code === ResponseCode.SUCCESS) return

//     setEmailError(false)
//     setEmailMessage('사용 가능한 이메일입니다')
//     setEmailMessage('인증번호가 전송되었습니다.')
//     setEmailCheck(true)
//   }

//   // 이메일 인증 코드 응답
//   const emailAuthCodeResponse = (responseBody: ResponseBody<EmailAuthCodeResponseDto>) => {
//     if (!responseBody) return
//     const { code } = responseBody

//     // 인증 코드 입력할 때 이메일을 입력하지 않으면
//     if (code === ResponseCode.VALIDATION_FAIL) alert('이메일을 입력하세요')

//     if (code === ResponseCode.EMAILAUTHCODE_FAIL) {
//       setEmailAuthCodeError(true)
//       setEmailAuthCodeMessage('인증번호가 일치하지 않습니다.')
//       setEmailAuthCodeCheck(false)
//     }

//     if (code === ResponseCode.DATABASE_ERROR) alert('DB 오류입니다')
//     if (code === ResponseCode.SUCCESS) return

//     setEmailAuthCodeError(false)
//     setEmailAuthCodeMessage('인증번호가 일치합니다..!!!!')
//     setEmailAuthCodeCheck(true)
//   }

//   // 이메일 에러 메시지 (버튼 클릭 시) => 이메일만
//   const onEmailButtonClickHandler = () => {
//     if (!email) return

//     const checkedEmail = emailPattern.test(email)
//     if (!checkedEmail) {
//       setEmailError(true)
//       setEmailMessage('이메일 형식이 아닙니다.')
//       return
//     }

//     const requestBody: EmailCheckRequestDto = { email }

//     emailCheckRequest(requestBody).then(emailCheckResponse)
//   }

//   const onPasswordButtonClickHandler = () => {}

//   // 이메일, 인증 코드 에러 메시지 (버튼 클릭 시)
//   const onEmailAuthCodeButtonClickHandler = () => {
//     if (!email && !emailAuthCode) return

//     const requestBody: EmailAuthCodeRequestDto = { email, emailAuthCode }
//     emailAuthCodeRequest(requestBody).then(emailAuthCodeResponse)
//   }

//   const onSignUpAndInButtonClickHandler = () => {}

//   // onKeyDown : 키를 눌렀을때 이벤트  (shift, alt, controll, capslock 등의 모든 키에 동작한다. 단 한영변환, 한자 등의 특수키는 인식 못한다).
//   const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key !== 'Enter') return
//     if (!emailRef.current) return
//     emailRef.current.focus()
//   }

//   const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key !== 'Enter') return
//     if (!passwordRef.current) return
//     passwordRef.current.focus()
//   }

//   const onEmailAuthCodeKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key !== 'Enter') return
//     if (!emailAuthCodeRef.current) return
//     emailAuthCodeRef.current.focus()
//   }

//   const [showPassword, setShowPassword] = React.useState(false)

//   const handleClickShowPassword = () => setShowPassword((show) => !show)

//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault()
//   }

//   const [currentDate, setCurrentDate] = useState<string>('')

//   useEffect(() => {
//     const today = new Date()
//     const year = today.getFullYear()
//     let month = (today.getMonth() + 1).toString()
//     let day = today.getDate().toString()

//     // 월에서 한 자리 숫자라면 0을 추가
//     if (month.length === 1) {
//       month = '0' + month
//     }
//     if (day.length === 1) {
//       day = '0' + day
//     }

//     // yyyy-mm-dd 형식으로 날짜 설정
//     const formattedDate = `${year}-${month}-${day}`
//     setCurrentDate(formattedDate)
//   }, [])

//   return (
//     <>
//       <Button
//         onClick={handleOpen}
//         className='text-white bg-mainColor hover:bg-pink-700 mt-5 transition-transform duration-400 active:scale-90 border-solid border-black rounded-lg text-base font-bold w-full h-[48px]'
//       >
//         계속
//       </Button>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           className='relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl
//            bg-white border-2 border-black shadow-lg p-16 w-[745px] h-[820px]'
//         >
//           <div className='relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] rounded-lg p-8'>
//             <div className='divide-y-2 divide-gray-400 flex justify-center h-full items-center w-[800px]'>
//               <header className='flex flex-row items-center h-full mb-10 ml-7 relative w-full'>
//                 <Button onClick={handleClose}>
//                   <Image
//                     src='/svgIcons/leftAngle.svg'
//                     alt='My leftAngle SVG'
//                     width={20}
//                     height={20}
//                     className='absolute left-0'
//                   />
//                 </Button>
//                 <div className='text-xl font-semibold absolute left-1/3'>회원 가입 완료하기</div>
//               </header>
//             </div>
//             <hr className='text-mainGray' />
//             <div className='max-h-[600px] overflow-y-auto overflow-x-hidden'>
//               <form action='/' method='post'>
//                 <div>
//                   <div className='sign-up-content-input-box'>
//                     {/* 이름, 성, 생년월일, 이메일, 비밀번호, 인증번호 */}

//                     <TextField
//                       ref={emailRef}
//                       title='이메일'
//                       placeholder='이메일 입력'
//                       type='text'
//                       value={email}
//                       onChange={onEmailChangeHandler}
//                       onClick={onEmailButtonClickHandler}
//                       onKeyDown={onEmailKeyDownHandler}
//                       error={isEmailError}
//                       helperText={emailMessage}
//                       fullWidth
//                     />
//                     <TextField
//                       ref={passwordRef}
//                       title='비밀번호'
//                       placeholder='비밀번호 입력'
//                       type='password'
//                       value={password}
//                       onChange={onPasswordChangeHandler}
//                       onClick={onPasswordButtonClickHandler}
//                       onKeyDown={onPasswordKeyDownHandler}
//                       error={isPasswordError}
//                       helperText={passwordMessage}
//                       fullWidth
//                     />
//                     <TextField
//                       ref={emailAuthCodeRef}
//                       title='이메일 인증 코드'
//                       placeholder='이메일 인증 코드 입력'
//                       type='text'
//                       value={emailAuthCode}
//                       onChange={onEmailAuthCodeChangeHandler}
//                       onClick={onEmailAuthCodeButtonClickHandler}
//                       onKeyDown={onEmailAuthCodeKeyDownHandler}
//                       error={isEmailAuthCodeError}
//                       helperText={emailAuthCodeMessage}
//                       fullWidth
//                     />
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handleOpen}
//                   className='text-white bg-pink-700 hover:bg-pink-700 mt-5 ml-8
//                 transition-transform duration-400 active:scale-90 border-solid border-black
//                 rounded-lg text-2xl font-bold w-[670px] h-[60px]'
//                 >
//                   동의 및 계속하기
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </Box>
//       </Modal>
//     </>
//   )
// }
