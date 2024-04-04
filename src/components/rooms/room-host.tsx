import Image from 'next/image'

export default async function RoomHost({ id }: { id: string }) {
  const result = await fetch(` http://localhost:8080/api/room/roomHost/${id}`)
  const inner = await result.json()
  console.log(result.status)
  if (result.status === 500) {
    return <div>host가 없습니다.</div>
  }
  const host = inner
  console.log(host)

  const hostExist = host.length > 0
  if (!hostExist) {
    return <div>호스트가 존재하지않습니다.</div>
  }
  return (
    <>
      <div>
        <div className='py-6'>
          <section>
            <div className='flex flex-start items-center'>
              <div className='w-10 h-10 mr-6'>
                <button className='relative w-full h-full'>
                  <Image
                    src={host.hostProfileImageUrl}
                    alt={'host profile image'}
                    fill
                    className='object-contain rounded-full'
                  />
                </button>
              </div>
              <div className='flex flex-col justify-between space-y-1'>
                <div className='text-[16px] font-semibold'>
                  {host.grade
                    ? `슈퍼 호스트 - 호스트: ${host.hostName}`
                    : `호스트: ${host.hostName}`}
                </div>
                <div className='text-[14px] text-mainGray'>{`호스팅 경력 ${host.hostCareer}`}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
