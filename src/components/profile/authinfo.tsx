import Image from 'next/image'

export default function authinfo({ name }: { name: string }) {
  return (
    <div className=' mt-4  h-[380px] w-[342px] rounded-e-3xl rounded-s-3xl border border-gray-200 bg-white  p-6 shadow '>
      <div className='flex flex-col'>
        <div className='h-1/3'>
          {/* flex 세로 칸 위 */}
          <h2 className='mt-2 text-2xl font-bold'>{name} 님의 인증 정보</h2>
        </div>
        <div className='mt-4 flex items-center'>
          {/* 인증 정보 아이콘 */}
          <Image
            src='/images/profile3.png'
            alt='프로필1'
            className='mr-4 text-center'
            width={15}
            height={15}
          />
          <span className='mr-20 text-center '>이메일 주소</span>
        </div>

        <br />
        <hr />

        <div>
          {/*flex 세로 칸 아래 */}
          <h2 className='mt-10 text-2xl font-bold'>본인 인증을 해주세요</h2>

          <h1 className='mt-6 text-sm'>
            에어비앤비를 통해 예약하거나 호스팅하려면 이 단계를 완료하셔야 합니다.
          </h1>

          <button
            type='button'
            className='mb-2 mt-5 rounded-lg border border-gray-800 px-6 py-3 text-center  text-lg font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300'
          >
            본인 인증하기
          </button>
        </div>
      </div>
    </div>
  )
}
