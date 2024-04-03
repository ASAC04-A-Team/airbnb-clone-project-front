import NavigationBar from '@/components/navigation/roomsNavigation'
import ReservationScreen from '@/components/rooms/reservation-screen'
import RoomAlbum from '@/components/rooms/room-album'
import RoomReview from '@/components/rooms/room-review'
import RoomTitle from '@/components/rooms/room-title'
import Screen from '@/components/rooms/screen'

interface IdParams {
  params: { id: number }
}

// room data :  http://localhost:8080/api/room/roomDetail/{roomId}
// room comfort : http://localhost:8080/api/room/roomComfort/{roomId}
// rom advantage : http://localhost:8080/api/room/roomAdvantage/{roomId}
// review : http://localhost:8080/api/review/{roomId}

async function fetchReviewsData(id: number) {
  try {
    const result = await fetch(`http://localhost:8080/api/review/${id}`)
    const reviewsData = await result.json()
    return reviewsData
  } catch (error) {
    console.error('리뷰가 없습니다.', error)
    return []
  }
}

export default async function RoomDetailPage({ params: { id } }: IdParams) {
  const result = await fetch(`http://localhost:3000/api/room/${id}`)
  const inner = await result.json()
  const roomData = inner.data

  const reviewsData = await fetchReviewsData(id)

  if (!roomData) {
    return <div>존재하지 않는 방입니다.</div>
  }

  return (
    <>
      <div>
        <Screen>
          <NavigationBar />
        </Screen>
      </div>
      <hr />
      <main>
        <div className='flex flex-col'>
          <Screen>
            <RoomTitle roomName={roomData.name} />
          </Screen>
          <Screen>
            <RoomAlbum images={roomData.images} />
          </Screen>
          <Screen>
            <ReservationScreen roomData={roomData} />
          </Screen>
          <Screen>
            <RoomReview reviews={reviewsData} />
          </Screen>
        </div>
      </main>
    </>
  )
}
