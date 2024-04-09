import NavigationBar from '@/components/navigation/roomsNavigation'
import ReservationScreen from '@/components/rooms/reservation-screen'
import RoomAlbum from '@/components/rooms/room-album'
import RoomReview from '@/components/rooms/room-review'
import RoomTitle from '@/components/rooms/room-title'
import Screen from '@/components/rooms/screen'

interface IdParams {
  params: { id: string }
}

async function fetchReviewsData(id: string) {
  try {
    const result = await fetch(`http://localhost:3000/api/room/${id}/review`)
    const inner = await result.json()
    const reviewsData = inner

    return reviewsData
  } catch (error) {
    console.error('리뷰가 없습니다.', error)
    return []
  }
}

export default async function RoomDetailPage({ params: { id } }: IdParams) {
  const result = await fetch(`http://localhost:3000/api/room/${id}`)
  const inner = await result.json()
  const roomData = inner.result
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
            <RoomTitle roomName={roomData.roomName} />
          </Screen>
          <Screen>
            <RoomAlbum images={roomData.roomImageUrls} />
          </Screen>
          <Screen>
            <ReservationScreen roomData={roomData} id={id} reviews={reviewsData} />
          </Screen>
          <Screen>
            <RoomReview reviews={reviewsData} id={id} />
          </Screen>
        </div>
      </main>
    </>
  )
}
