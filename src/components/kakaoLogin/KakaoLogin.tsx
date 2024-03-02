import { getToken } from '@/components/kakaoLogin/getToken'
import { useEffect } from 'react'
import Button from '@mui/material/Button'
import Image from 'next/image'

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_API_KEY
const client_id = KAKAO_API_KEY || ''
const redirect_uri = 'http://localhost:3000/kakaoLogin'
const response_type = 'code'

const KakaoLogin = () => {
  useEffect(() => {
    const search = new URLSearchParams(window.location.search) //인가 코드 요청시 redirect로 받는 값 http://localhost:3000/login?code= 인가 코드 (매번 바뀌는 값임)
    const code = search.get('code') // code부분인 인가 코드 추츨

    const accessToken = localStorage.getItem('access_token')

    //카카오로부터 redirect 당한 경우 code가 들어있을 것이다!
    if (code && (!accessToken || accessToken === 'undefined')) {
      //post로 aouth/token 토큰 요청하는 부분
      handleGetToken()
    }
  }, []) //최초 진입시 발동 (1.실제 최초인 경우 2. 카카오로부터 redirect 당해서 진입한 경우)

  const handleGetToken = async () => {
    const { token_type, access_token, expires_token, refresh_token, refresh_token_expires_in } =
      await getToken()

    localStorage.setItem('access_token', access_token)
    window.close()
  }

  //authParam은 카카오에 인가코드 요청할 떄 필요한 파라미터 값임
  const authParam = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type,
  })

  const handleLoginClick = () => {
    const authCodeUrl = `https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`
    window.open(authCodeUrl, '_blank', 'width=500,height=600,left=500,top=50')
  }

  return (
    <Button
      type='button'
      className='text-black -mt-5 border border-solid border-black rounded-lg text-2xl font-bold w-[620px] h-[60px]'
      onClick={handleLoginClick}
    >
      <Image
        src='/images/kakaoLogin.png'
        alt='KakaoLogin'
        width={80}
        height={80}
        className='-ml-40 mr-20'
      />
      카카오로 로그인하기
    </Button>
  )
}
export default KakaoLogin