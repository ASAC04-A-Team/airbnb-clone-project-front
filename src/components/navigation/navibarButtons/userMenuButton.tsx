'use client'

import MenuIcon from '/public/images/naviBarIcon/menuIcon.svg'
import UserIcon from '/public/images/naviBarIcon/UserIcon.svg'

import KakaoLogin from '@/components/kakaoLogin/KakaoLogin'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react'

import KakaoLogout from '@/components/kakaoLogin/KakaoLogout'
import SignUpButton from '@/components/navigation/modal/signUp'
import styles from '@/components/navigation/navibarButtons/styles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ResponseCode, ResponseMessage } from '@/components/types'
import { EmailCheckResponseDto } from '@/components/navigation/dto/response/auth'
import { EmailCheckRequestDto } from '@/components/navigation/dto/request'
import { emailCheckRequest } from '@/components/navigation/dto'

// 연습

// 셀렉트 박스 값과 CSS
const options = [
  { value: '한국 (+82)', label: '한국 (+82)' },
  { value: '미국 (+1)', label: '미국 (+1)' },
]

export default function UserMenuButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [loginOpen, setLoginOpen] = React.useState(false)

  const closeModalHandler = () => {
    setLoginOpen(!loginOpen)
  }
  const handleOpen = () => setLoginOpen(true)

  const [selectedOption, setSelectedOption] = React.useState('한국 (+82)') // 셀렉트 박스
  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedOption(event.target.value)
  }

  const [existToken, setExistToken] = useState(false)

  useEffect(() => {
    if (
      localStorage &&
      localStorage.getItem('access_token') &&
      localStorage.getItem('access_token') !== 'undefined'
    ) {
      setExistToken(true)
    }
  })

  const [selectLogin, setSelectLogin] = useState('email')
  const [value, setValue] = useState('') // 사용자 입력값을 저장할 상태

  // 로그인 방식 전환 함수
  const selectLoginMethod = () => {
    setSelectLogin(selectLogin === 'phone' ? 'email' : 'phone')
    setValue('')
  }

  // 사용자 입력 처리 함수
  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setValue(event.target.value)
    setEmail(value)
  }

  // 폰 로그인 방식 선택
  const selectPhoneLogin = () => {
    setSelectLogin('phone')
  }

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isEmailError, setEmailError] = useState<boolean>(false)
  const [isPasswordError, setPasswordError] = useState<boolean>(false)

  const [emailMessage, setEmailMessage] = useState<string>('')
  const [passwordMessage, setPasswordMessage] = useState<string>('')

  // 이메일 정규식
  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/
  const [isEmailCheck, setEmailCheck] = useState<boolean>(false)

  // 이메일 메시지
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    handleInputChange
    setEmail(value)
  }

  // 비밀번호 메시지
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    handleInputChange
    setPassword(value)
  }

  // 이메일 응답
  /* const emailCheckResponse = (responseBody: ResponseMessage<EmailCheckResponseDto>) => {
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
    if (code === ResponseCode.SUCCESS) return

    setEmailError(false)
    setEmailMessage('사용 가능한 이메일입니다')
    setEmailMessage('인증번호가 전송되었습니다.')
    setEmailCheck(true)
  } */

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

    // emailCheckRequest(requestBody).then(emailCheckResponse)
  }

  const onPasswordButtonClickHandler = () => {}

  // onKeyDown : 키를 눌렀을때 이벤트  (shift, alt, controll, capslock 등의 모든 키에 동작한다. 단 한영변환, 한자 등의 특수키는 인식 못한다).
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    if (!passwordRef.current) return
    passwordRef.current.focus()
  }

  const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    onSignInButtonClickHandler()
  }

  const onSignInButtonClickHandler = () => {}

  return (
    <div>
      <button
        className={`ml-2 h-[48px] w-[86px] items-center flex flex-row border border-gray-300 rounded-full text-black ${open ? 'shadow-xl' : ''} hover:shadow-lg`}
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon className='ml-3 mr-3' />
        <div className='w-8 h-8'>
          <UserIcon className='w-8 h-8' />
        </div>
      </button>
      <Menu
        className='mt-2'
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '.MuiPaper-root': {
            borderRadius: 3,
            boxShadow: '0px 3px 5px 2px rgb(0, 0, 0, 0.1)',
          },
        }}
      >
        {/**회원 가입 */}
        <MenuItem
          className={` ${existToken ? 'hidden' : ''}`}
          onClick={() => {
            handleClose()
            handleOpen()
          }}
        >
          회원 가입
        </MenuItem>
        <Link href={'/users/show/1'}>
          <MenuItem className={`${existToken ? '' : 'hidden'}`}>계정</MenuItem>
        </Link>
        {/**로그인 */}
        <MenuItem
          className={` ${existToken ? 'hidden' : ''}`}
          onClick={() => {
            handleClose()
            handleOpen()
          }}
        >
          로그인
        </MenuItem>
        <MenuItem className={` ${existToken ? '' : 'hidden'}`}>{<KakaoLogout />} </MenuItem>
        <hr />
        {/*당신의 공간을 에어비앤비 하세요*/}
        <MenuItem className='pt-3' onClick={handleClose}>
          당신의 공간을 에어비앤비 하세요
        </MenuItem>
        {/*도움말 센터 */}
        <MenuItem onClick={handleClose}>도움말 센터</MenuItem>
      </Menu>

      <Modal
        open={loginOpen}
        onClose={closeModalHandler}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white border-black shadow-lg w-[745px] h-[820px]'>
          {/* 제목 + X버튼 영역 */}
          <div className='p-6 relative w-[745px] flex flex-row'>
            <Button className='justify-start border-none text-black' onClick={closeModalHandler}>
              <Image
                src='/svgIcons/closeIcon.svg'
                alt='My closeIcon SVG'
                width={20}
                height={20}
                className='block h-4 w-4 overflow-visible'
              />
            </Button>
            <Typography className='text-lg text-nowrap absolute left-1/3 ml-9 font-semibold'>
              로그인 또는 회원가입
            </Typography>
          </div>
          {/* 줄 */}
          <hr />

          {/* 전화번호 */}
          <div className='p-6'>
            <div className='text-2xl font-semibold'>에어비앤비에 오신 것을 환영합니다.</div>
            <br />

            <form name='frm' action='/practiceLoginAndSignUp' method='post'>
              <TextField
                select
                label='국가/지역'
                value={selectedOption}
                onChange={handleChange}
                fullWidth
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {selectLogin === 'phone' && (
                <TextField
                  aria-required='true'
                  placeholder='전화번호'
                  value={value}
                  onChange={onEmailChangeHandler}
                  fullWidth
                />
              )}
              {selectLogin === 'email' && (
                <>
                  <TextField
                    ref={emailRef}
                    title='이메일'
                    aria-required='true'
                    placeholder='이메일 입력'
                    value={value}
                    onChange={handleInputChange}
                    onClick={onEmailButtonClickHandler}
                    onKeyDown={onEmailKeyDownHandler}
                    fullWidth
                  />
                  <TextField
                    ref={passwordRef}
                    title='비밀번호'
                    placeholder='비밀번호 입력'
                    type='password'
                    value={password}
                    onChange={onPasswordChangeHandler}
                    onClick={onPasswordButtonClickHandler}
                    onKeyDown={onPasswordKeyDownHandler}
                    // isErrorMessage={isPasswordError}
                    // message={passwordMessage}
                    fullWidth
                  />
                </>
              )}

              <Typography>
                <span className='text-base'>
                  전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터 요금이
                  부과됩니다.{' '}
                  <span className='underline text-black font-bold text-base break-words'>
                    개인정보
                    <br />
                    처리방침
                  </span>
                </span>
              </Typography>

              {/* 여기서 이제 로그인 회원가입 둘 중에 하나 */}
              <SignUpButton />
            </form>

            <Typography className={styles.hrSect}>
              <span className='text-sm text-mainGray'>또는</span>
            </Typography>
            <div className='relative text-black flex flex-row items-center justify-center  border border-solid border-black rounded-lg text-sm font-bold w-full h-[48px]'>
              <Image
                src='/images/kakaoLogin.png'
                alt='KakaoLogin'
                className='absolute left-5'
                width={20}
                height={20}
              />
              <KakaoLogin KakaoLocation='카카오 로그인' /> {/**카카오 로그인하기 */}
            </div>
            <Button
              className='relative text-black flex flex-row items-center justify-center mt-5 border border-solid
               border-black rounded-lg text-sm font-bold w-full h-[48px]'
              onClick={selectLoginMethod}
            >
              <Image
                className='absolute left-5'
                src={'/images/naviBarIcon/email.svg'}
                alt='이메일'
                width={20}
                height={20}
              />

              {selectLogin === 'phone' ? '전화번호로 로그인하기' : '이메일로 로그인하기'}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
