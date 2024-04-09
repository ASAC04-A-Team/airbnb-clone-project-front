import Image from 'next/image'

export default function authinfo({ name }: { name: string }) {
  return (
    <div className=' mt-4  h-[300px] w-[342px] rounded-e-3xl rounded-s-3xl border border-gray-200 bg-white  p-6 shadow  '>
      <div className='flex flex-col'>
        <div className='h-1/3'>
          {/* flex 세로 칸 위 */}
          <h2 className='mt-2 text-2xl font-bold  '>{name} 님의 인증 정보</h2>
        </div>

        {/** 신분증 */}
        <div className='mt-4 flex items-center'>
          <Image
            src='/images/profile3.png'
            alt='프로필1'
            className='mr-4 text-center'
            width={15}
            height={15}
          />
          <span className='mr-20 text-center '>신분증</span>
          {/**이메일 주소 */}
        </div>
        <div className='mt-4 flex items-center'>
          <Image
            src='/images/profile3.png'
            alt='프로필1'
            className='mr-4 text-center'
            width={15}
            height={15}
          />
          <span className='mr-20 text-center '>이메일 주소</span>
        </div>
        {/**전화 번호 */}
        <div className='mt-4 flex items-center'>
          <Image
            src='/images/profile3.png'
            alt='프로필1'
            className='mr-4 text-center'
            width={15}
            height={15}
          />
          <span className='mr-20 text-center '> 전화 번호</span>
        </div>
        <p className=' font-semibold text-gray-900 underline decoration-black'>
          본인 인증 절차 자세히 알아보기
        </p>
      </div>
    </div>
  )
}
