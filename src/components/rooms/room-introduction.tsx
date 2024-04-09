'use client'
import { useState } from 'react'
import StarIcon from '/public/images/star.svg'
import ReviewModal from '@/components/rooms/modal/reviewModal'

interface Props {
  introduction: string
  guestCapacity: number
  bedroomCount: number
  bedCount: number
  bathroomCount: number
  roomReviewTotal: ReviewTotalCount
  reviews: Review[]
  id: string
}

interface ReviewTotalCount {
  reviewsCount: number
  reviewsAvg: number
}

interface Review {
  reviewId: number
  content: string
  writeAt: string
  reviewerName: string
  reviewerProfileImageUrl: string
  score: number
  nation: string
}

export default async function RoomIntroduction({
  introduction,
  guestCapacity,
  bedCount,
  bedroomCount,
  bathroomCount,
  roomReviewTotal,
  reviews,
  id,
}: Props) {
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const handleOpen = () => {
    setReviewModalOpen(!reviewModalOpen)
  }
  const result =
    roomReviewTotal.reviewsAvg === 50 ? (
      <div>후기가 없습니다.</div>
    ) : (
      <div className='flex flex-row items-center gap-1 pt-2 text-base font-semibold '>
        <StarIcon style={{ width: '16px', height: '16px' }} />
        <span className='flex items-center '>{roomReviewTotal.reviewsAvg}</span>
        <span>·</span>
        <button className='text-gray-900 underline' onClick={handleOpen}>
          후기 {roomReviewTotal.reviewsCount}개
        </button>
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
                <span className='text-xl font-semibold text-gray-900'>{introduction}</span>
              </div>
              <div className='flex flex-row pt-1'>
                <span className='flex text-base text-gray-900'>
                  {bedCount > 0
                    ? `최대 인원${guestCapacity}명, 침대 ${bedCount}개, 욕실 ${bathroomCount}개`
                    : `최대 인원${guestCapacity}명, 침실 ${bedroomCount}개, 욕실 ${bathroomCount}개`}
                </span>
              </div>
              {result}
              <ReviewModal
                reviews={reviews}
                reviewModalOpen={reviewModalOpen}
                setReviewModalOpen={setReviewModalOpen}
                id={id}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
