import ReservationCard from '@/components/rooms/reservation-card'
import RoomAdvantage from '@/components/rooms/room-advantage'
import RoomComport from '@/components/rooms/room-comfort'
import RoomDescription from '@/components/rooms/room-description'
import RoomHost from '@/components/rooms/room-host'
import RoomIntroduction from '@/components/rooms/room-introduction'

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

export default function ReservationScreen({ roomData, id }: { roomData: Room; id: string }) {
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
              <RoomHost id={id} />
              <hr />
              <RoomAdvantage id={id} />
              <hr />
              <RoomDescription roomDescription={roomData.description} />
              <hr />
              <RoomComport id={id} />
              <hr />
            </div>
          </div>
          <div className='flex w-2/5'>
            <div className='ml-auto mr-0'>
              s
              <ReservationCard price={roomData.price} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
