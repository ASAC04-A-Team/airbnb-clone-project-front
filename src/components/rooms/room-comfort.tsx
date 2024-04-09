import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface RoomComfort {
  name: string
  imageUrl: string
}

export default async function RoomComport({ id }: { id: string }) {
  const result = await fetch(` http://localhost:8080/api/room/roomComfort/${id}`)
  const inner = await result.json()
  const roomComfort = inner.result

  const comfortExist = roomComfort.length > 0
  if (!comfortExist) {
    return <div>편의시설이 존재하지 않는 방 입니다.</div>
  }
  return (
    <>
      <div>
        <div className='pb-6'>
          <div className='flex flex-col justify-between space-y-6'>
            <div className='pt-6 text-[22px] font-semibold'>숙소 편의시설</div>
            <div className='flex flex-wrap'>
              {comfortExist ? (
                roomComfort.map((eachComfort: RoomComfort, index: number) => (
                  <section key={index} className='flex w-1/2 items-center'>
                    <div className='relative flex w-[265px] px-2 pb-4'>
                      <div className='mr-4 h-6 w-6'>
                        <div className='relative h-full w-full'>
                          <Image
                            src={eachComfort.imageUrl}
                            alt={`eachComfort image: ${index}`}
                            fill
                            className='object-contain'
                          />
                        </div>
                      </div>
                      <div className='font-mainBlack text-[16px]'>{eachComfort.name}</div>
                    </div>
                  </section>
                ))
              ) : (
                <section>
                  <div className='flex'>편의시설이 없습니다.</div>
                </section>
              )}
            </div>
            <div className='mt-6'>
              <button className=' rounded-lg border-[1px] border-mainBlack bg-white px-[23px] py-[13px]'>
                <span className='text-[16px] font-semibold text-mainBlack'>
                  {`편의시설 ${roomComfort.length}개 모두 보기`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
