import Link from 'next/link'
import StarIcon from '/public/images/star.svg'
import Carousel from '@/components/itemCardView/carousel'

interface Props {
  roomImageUrls: Array<string>
  id: number
  host: String
  guestPreference: boolean
  price: String
  address: String
  nation: String
}

export default function ItemCardView({
  roomImageUrls,
  id,
  host,
  guestPreference,
  price,
  address,
  nation,
}: Props) {
  return (
    <div className='flex h-auto   min-w-[87px] max-w-[486px] flex-col items-center justify-center space-y-2'>
      <div className='relative m-auto h-auto w-full rounded-lg'>
        <Carousel
          key={id}
          roomImageUrls={roomImageUrls}
          id={id}
          guestPreference={guestPreference}
        />
      </div>
      <Link className='h-100 grid w-full grid-cols-8' href={`/rooms/${id}`}>
        <span className='col-span-7 line-clamp-1 text-sm font-semibold'>
          {' '}
          {nation} {address}
        </span>
        <span className='col-span-1 flex flex-row items-center'>
          <StarIcon /> <span className='ml-1 text-sm'>5.0</span>
        </span>
        <span className='col-span-8 text-sm text-mainGray'>{host}</span>
        <span className='col-span-8 text-sm text-mainGray'>3월 30일 ~ 4월 10일</span>
        <span className='col-span-8 pt-2 text-sm font-medium'>
          ₩{price} <span className='text-sm font-extralight'>/박</span>
        </span>
      </Link>
    </div>
  )
}
