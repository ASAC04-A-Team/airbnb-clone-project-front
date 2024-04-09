import Image from 'next/image'

export default async function information({ id }: { id: string }) {
  const result = await fetch(`http://localhost:8080/api/users/information/${id}`)
  const inner = await result.json()
  const userInformation = inner.result

  return (
    <div className='items-cneter  flex h-[240px] w-[342px] justify-center rounded-e-3xl rounded-s-3xl border border-gray-200 bg-white p-6 shadow-xl  drop-shadow-lg '>
      <div className=' flex'>
        {/*flex  첫 번째 가로 칸 */}
        <div className='mr-2 flex w-2/3 flex-col  items-center justify-center'>
          <div>
            <Image
              className='h-[100px] w-[100px] rounded-full'
              src={userInformation.profileImageUrl}
              alt='image description'
              width={120}
              height={120}
            />
          </div>
          <div>
            <h2 className=' text-3xl font-bold '>{userInformation.nickname}</h2>
          </div>

          <h1 className=' text-xs font-bold'>
            {userInformation.isHost === true ? '호스트' : '게스트'}
          </h1>
        </div>

        {/*flex 두 번째 가로 칸 */}
        <div className='ml-2 flex w-1/3 flex-col '>
          {/*flex 첫 번째 세로 칸 */}
          <div className='mb-2 h-1/2'>
            <h2 className='text-2xl'>{userInformation.reviewsNum}</h2>
            <p className='text-xs'>후기</p>
            <hr />
          </div>
          {/*flex 두 번째 세로 칸 */}
          <div className='mb-4 h-1/2'>
            <h2 className='text-2xl'>{userInformation.sinceRegistration}</h2>
            <p className='text-xs'>
              {userInformation.separator === 'month'
                ? '에어비앤비 가입 기간(월)'
                : '에어비앤비 가입 기간(년)'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
