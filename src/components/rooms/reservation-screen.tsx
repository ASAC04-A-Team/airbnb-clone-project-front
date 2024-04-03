import ReservationCard from '@/components/rooms/reservation-card'
import RoomAdvantage from '@/components/rooms/room-advantage'
import RoomAlbum from '@/components/rooms/room-album'
import RoomComport from '@/components/rooms/room-comfort'
import RoomDescription from '@/components/rooms/room-description'
import RoomHost from '@/components/rooms/room-host'
import RoomIntroduction from '@/components/rooms/room-introduction'
import RoomTitle from '@/components/rooms/room-title'
import Screen from '@/components/rooms/screen'

interface Room {
  roomId: number
  RoomName: string
  roomImageUrls: string[]
  nation: string
  address: string
  bathroomCount: number
  bedroomCount: number
  bedCount: number
  capacity: number
  reviewCount: number
  hostName: String
  introduction: string
  price: string
  description: string
  guestPreference: boolean
}

interface roomAdvantage {
  name: string
  imageUrl: string
  description: string
}

interface RoomComfort {
  name: string
  imageUrl: string
}

interface roomHost {
  hostName: string
  hostProfileImageUrl: string
  grade: boolean
  hostCareer: number
}

export default function ReservationScreen({
  roomData,
  roomComfort,
  roomAdvantage,
  roomHost,
}: {
  roomData: Room
  roomComfort: RoomComfort[]
  roomAdvantage: roomAdvantage[]
  roomHost: roomHost
}) {
  return (
    <>
      <div className='md:h-[1030px] lg:h-[1030px] md:w-[800px] lg:w-[1250px]'>
        <div className='relative flex px-20'>
          <div className='relative flex w-3/5'>
            <div className='w-full'>
              <RoomIntroduction
                introduction={roomData.introduction}
                guestCapacity={roomData.capacity}
                bedCount={roomData.bedCount}
                bedroomCount={roomData.bedroomCount}
                bathroomCount={roomData.bathroomCount}
              />
              <hr />
              <RoomHost host={roomHost} />
              <hr />
              <RoomAdvantage advantages={roomAdvantage} />
              <hr />
              <RoomDescription />
              <hr />
              <RoomComport roomComfort={roomComfort} />
              <hr />
            </div>
          </div>
          <div className='flex w-2/5'>
            <div className='ml-auto mr-0'>
              <ReservationCard price={roomData.price} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
