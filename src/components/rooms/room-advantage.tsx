import Image from 'next/image'

interface Advantage {
  name: string
  imageUrl: string
  description: string
}

export default async function RoomAdvantage({ id }: { id: string }) {
  const result = await fetch(` http://localhost:8080/api/room/roomAdvantage/${id}`)
  const inner = await result.json()
  const advantages = inner

  const advantageExist = advantages.length > 0
  if (!advantageExist) {
    return <div>장점이 존재하지 않습니다.</div>
  }

  return (
    <>
      <div>
        <div className='py-6'>
          <div className='flex flex-col justify-between space-y-6'>
            {advantages.map((eachAdvantage: Advantage, index: number) => (
              <section key={index} className='flex items-center'>
                <div className='flex flex-start items-center'>
                  <div className='w-10 h-10 mr-6'>
                    <div className='relative w-full h-full'>
                      <Image
                        src={eachAdvantage.imageUrl}
                        alt={'advantages image'}
                        fill
                        className='object-contain rounded-full'
                      />
                    </div>
                  </div>
                  <div className='flex flex-col justify-between space-y-1'>
                    <div className='text-[16px] font-semibold'>{eachAdvantage.name}</div>
                    <div className='text-[14px] text-mainGray'>{`추가정보: 더미에 데이터 추가 필요`}</div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
