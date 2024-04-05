'use client'
import StarIcon from '/public/images/star.svg'

interface Props {
  introduction: string
  guestCapacity: number
  bedroomCount: number
  bedCount: number
  bathroomCount: number
  roomReviewTotal: ReviewTotalCount
}

interface ReviewTotalCount {
  reviewsCount: number
  reviewsAvg: number
}

export default async function RoomIntroduction({
  introduction,
  guestCapacity,
  bedCount,
  bedroomCount,
  bathroomCount,
  roomReviewTotal,
}: Props) {
  const result =
    roomReviewTotal.reviewsAvg === 50 ? (
      <div>후기가 없습니다.</div>
    ) : (
      <div className='flex items-center flex-row pt-2 gap-1 text-base font-semibold '>
        <StarIcon style={{ width: '16px', height: '16px' }} />
        <span className='flex items-center '>{roomReviewTotal.reviewsAvg}</span>
        <span>·</span>
        <button className='text-gray-900 underline'>후기 {roomReviewTotal.reviewsCount}개</button>
      </div>
    )

  let openModal = false
  const buttonHandler = () => {
    !openModal
  }

  return (
    <>
      <div>
        <div className='py-8'>
          <section>
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                <span className='text-gray-900 text-xl font-semibold'>{introduction}</span>
              </div>
              <div className='flex flex-row pt-1'>
                <span className='text-gray-900 text-base flex'>
                  {bedCount > 0
                    ? `최대 인원${guestCapacity}명, 침대 ${bedCount}개, 욕실 ${bathroomCount}개`
                    : `최대 인원${guestCapacity}명, 침실 ${bedroomCount}개, 욕실 ${bathroomCount}개`}
                </span>
              </div>
              {result}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
