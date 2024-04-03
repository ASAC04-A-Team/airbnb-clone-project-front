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

async function fetchRoomComfortData(id: number) {
  try {
    const result = await fetch(` http://localhost:8080/api/room/roomComfort/${id}`)
    const roomComfortData = await result.json()

    return roomComfortData
  } catch (error) {
    console.error('편의시설이 없습니다.', error)
    return []
  }
}

async function fetchRoomAdvantageData(id: number) {
  try {
    const result = await fetch(` http://localhost:8080/api/room/roomAdvantage/${id}`)
    const roomAdvantageData = await result.json()
    console.log(roomAdvantageData)
    return roomAdvantageData
  } catch (error) {
    console.error('편의시설이 없습니다.', error)
    return []
  }
}

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
  const result = await fetch(`http://localhost:8080/api/room/roomDetail/${id}`)
  const roomData = await result.json()

  const reviewsData = await fetchReviewsData(id)
  const roomComfort = await fetchRoomComfortData(id)
  const roomAdvantage = await fetchRoomAdvantageData(id)

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
            <ReservationScreen
              roomData={roomData}
              roomComfort={roomComfort}
              roomAdvantage={roomAdvantage}
            />
          </Screen>
          <Screen>
            <RoomReview reviews={reviewsData} />
          </Screen>
        </div>
      </main>
    </>
  )
}
