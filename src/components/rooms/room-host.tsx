import Image from 'next/image'

interface Host {
  hostName: string
  hostProfileImageUrl: string
  grade: boolean
  hostCareer: number
}

export default function RoomHost({ host }: { host: Host }) {
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
