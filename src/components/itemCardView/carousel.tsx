'use client'
import { useState } from 'react'
import LeftButtonIcon from '/public/images/LeftButtonIcon.svg'
import RightButtonIcon from '/public/images/RightButtonIcon.svg'
import Like from '/public/images/like.svg'
import Link from 'next/link'

interface Props {
  roomImageUrls: Array<string>
  id: number
  guestPreference: boolean
}

export default function Carousel({ roomImageUrls, id, guestPreference }: Props) {
  const [current, setCurrent] = useState(0)
  const [heart, setHeart] = useState(false)

  const previousSlide = () => {
    if (current === 0) setCurrent(roomImageUrls.length - 1)
    else setCurrent(current - 1)
  }

  const nextSlide = () => {
    if (current === roomImageUrls.length - 1) setCurrent(0)
    else setCurrent(current + 1)
  }
  const handleHeart = () => {
    setHeart(!heart)
  }
  return (
    <div className='group relative h-full w-full overflow-hidden'>
      <Link href={`/rooms/${id}`} className='flex  w-full transition '>
        <div
          className='duration-40 flex w-full flex-row transition ease-out'
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {roomImageUrls.map((path, index) => {
            return (
              <img
                key={index}
                src={path}
                alt=''
                className='aspect-custom h-auto w-full rounded-lg object-cover'
              />
            )
          })}
        </div>
      </Link>

      <span
        className={`absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-sm ${guestPreference ? '' : 'hidden'}`}
      >
        게스트 선호
      </span>
      <button
        className='hover:-translate-all absolute right-3  top-3 stroke-white stroke-1 hover:scale-110'
        onClick={handleHeart}
      >
        <Like className={`${heart ? 'fill-mainColor' : ''}`} />
      </button>
      <button
        className={`absolute left-3 top-1/2 rounded-full bg-transparent p-2 group-hover:bg-transparent-70 ${current === 0 ? 'hidden' : ''}`}
        onClick={previousSlide}
      >
        <LeftButtonIcon className='text-transparent group-hover:text-black' />
      </button>
      <button
        className={`absolute right-3 top-1/2 rounded-full bg-transparent p-2 group-hover:bg-transparent-70 ${current === roomImageUrls.length - 1 ? 'hidden' : ''}`}
        onClick={nextSlide}
      >
        <RightButtonIcon className='text-transparent group-hover:text-black' />
      </button>

      <div className='absolute bottom-0 flex w-full items-center justify-center gap-1 py-1'>
        {roomImageUrls.slice(Math.max(0, current - 2), current + 3).map((s, i) => {
          const index = i + Math.max(0, current - 2)
          return (
            <div
              key={'circle' + index}
              className={`rounded-full ${index === current ? 'h-1.5 w-1.5' : 'h-1 w-1'} ${index === current ? 'bg-white' : 'bg-transparent-70'}`}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
