import Image from 'next/image'

export default async function information({ id }: { id: string }) {
  const result = await fetch(`http://localhost:8080/api/users/information/${id}`)
  const userInformation = await result.json()

  return (
    <span className='relative block w-[342px] h-[240px] p-6 bg-white border border-gray-200 rounded-s-3xl rounded-e-3xl shadow-xl drop-shadow-lg  right-[-10px] '>
      <div className='relative flex bottom-[-20px]'>
        {/*flex  첫 번째 가로 칸 */}
        <div className='w-2/3 mr-2 flex flex-col  items-center justify-center'>
          <div>
            <Image
              className='w-[100px] h-[100px] rounded-full'
              src={userInformation.profileImageUrl}
              alt='image description'
              width={120}
              height={120}
            />
          </div>
          <div>
            <h2 className='relative text-3xl font-bold bottom-[-5px] '>
              {userInformation.nickname}
            </h2>
          </div>

          <h1 className='relative text-xs font-bold bottom-[-5px]'>
            {userInformation.isHost === true ? '호스트' : '게스트'}
          </h1>
        </div>

        {/*flex 두 번째 가로 칸 */}
        <div className='w-1/3 ml-2 flex flex-col '>
          {/*flex 첫 번째 세로 칸 */}
          <div className='h-1/2 mb-2'>
            <h2 className='text-2xl'>{userInformation.reviewsNum}</h2>
            <p className='text-xs'>후기</p>
            <hr />
          </div>
          {/*flex 두 번째 세로 칸 */}
          <div className='h-1/2 mb-4'>
            <h2 className='text-2xl'>{userInformation.sinceRegistration}</h2>
            <p className='text-xs'>
              {userInformation.separator === 'month'
                ? '에어비앤비 가입 기간(월)'
                : '에어비앤비 가입 기간(년)'}
            </p>
          </div>
        </div>
      </div>
    </span>
  )
}
