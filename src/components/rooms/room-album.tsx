import Image from 'next/image'

export default function RoomAlbum({ images }: { images: string[] }) {
  // const roomAlbum = getRoomAlbum(id);

  if (!images) {
    return []
  }
  return (
    <>
      <div>
        {/* 이미지 그리드 */}
        <div className='flex justify-center'>
          <div className='grid grid-cols-4 grid-rows-2 gap-4 px-20 pt-6 md:h-[340px] md:w-[800px] lg:h-[450px] lg:w-[1250px]'>
            <div className='aspect-w-1 aspect-h-1 col-span-2 row-span-2'>
              <button className='relative h-full w-full'>
                <Image
                  src={images[0]}
                  alt={'image1'}
                  fill
                  priority={true}
                  className='rounded-bl-lg rounded-tl-md object-cover'
                />
              </button>
            </div>
            <div className='aspect-w-1 aspect-h-1 col-span-1 row-span-1'>
              <button className='relative h-full w-full'>
                <Image
                  src={images[1]}
                  priority={true}
                  alt={'image2'}
                  fill
                  className='object-cover '
                />
              </button>
            </div>
            <div className='aspect-w-1 aspect-h-1 col-span-1 row-span-1'>
              <button className='relative h-full w-full'>
                <Image
                  src={images[2]}
                  alt={'image3'}
                  fill
                  priority={true}
                  className='rounded-br-lg rounded-tr-md object-cover'
                />
              </button>
            </div>
            <div className='aspect-w-1 aspect-h-1 col-span-1 row-span-1'>
              <button className='relative h-full w-full'>
                <Image
                  src={images[3]}
                  priority={true}
                  alt={'image4'}
                  fill
                  className='object-cover'
                />
              </button>
            </div>
            <div className='aspect-w-1 aspect-h-1 col-span-1 row-span-1'>
              <button className='relative h-full w-full'>
                <Image
                  src={images[4]}
                  alt={'image5'}
                  fill
                  priority={true}
                  className='rounded-br-lg rounded-tr-md object-cover'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
