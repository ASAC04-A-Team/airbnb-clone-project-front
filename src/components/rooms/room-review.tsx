'use client'

import ReviewModal from '@/components/rooms/modal/reviewModal'
import StarRateGenerator from '@/components/rooms/starIcon/starRateGenerator'
import Image from 'next/image'
import { useState } from 'react'

interface Review {
  reviewId: number
  content: string
  writeAt: string
  reviewerName: string
  reviewerProfileImageUrl: string
  score: number
  nation: string
}

const isReviewExist = (reviews: Review[]): boolean => {
  return reviews.length > 0
}

/**
 * 평균 별점 계산
 * @param 해당 room의 리뷰데이터 전부
 * @returns 평균 별점
 */
const getAvgScore = (reviews: Review[]): number => {
  if (reviews.length === 0) {
    return 0
  }

  let totalScore = 0
  for (const review of reviews) {
    totalScore += review.score
  }
  const avgScore = totalScore / reviews.length
  return Math.round(avgScore * 10) / 10
}

export default function RoomReview({ reviews, id }: { reviews: Review[]; id: string }) {
  const reviewExist = isReviewExist(reviews)
  const initialReviews = reviews.slice(0, 8)
  const avgScore = getAvgScore(reviews)

  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  const handleOpen = () => {
    setReviewModalOpen(!reviewModalOpen)
    console.log(reviewModalOpen)
  }

  return (
    <>
      <div className='py-12'>
        <div className='flex flex-col justify-between space-y-6 px-20 md:w-[800px] lg:w-[1250px]'>
          <div className='mb-12 flex flex-col'>
            <div>
              <span className='text-[26px] font-semibold text-mainBlack'>
                {`후기 ${reviews.length}개`}
              </span>
              {reviews.length > 2 ? (
                <div className='mb-3'>{`평점: ⭐${avgScore}`}</div>
              ) : (
                <div className='mb-3'>
                  <span className='text-[14px] text-mainGray'>
                    후기가 3개 이상이면 별점이 표시됩니다.
                  </span>
                </div>
              )}
            </div>
            <div className='flex flex-wrap'>
              {reviewExist ? (
                initialReviews.map((eachReview, index) => (
                  <section
                    key={index}
                    className='flex w-1/2 flex-col items-center md:h-[226px] lg:h-[226px] '
                  >
                    <div className='mb-2 ml-0 mr-auto flex md:w-[470px] lg:w-[470xpx]'>
                      <div className='relative flex h-12 w-full'>
                        <div className='mr-[14px] h-full w-12'>
                          <div className='relative h-12 w-12'>
                            <Image
                              src={eachReview.reviewerProfileImageUrl}
                              alt={`${index}. reviewer profileImage`}
                              fill
                              className='rounded-full object-cover'
                            />
                          </div>
                        </div>
                        <div className='flex flex-col justify-center space-y-[2px]'>
                          <div className='text-[16px] font-semibold text-mainBlack'>
                            {`${eachReview.reviewerName}`}
                          </div>
                          <div className='text-[14px] text-mainGray'>{`${eachReview.nation}`}</div>
                        </div>
                      </div>
                    </div>
                    <div className='mb-1 ml-0 mr-auto flex items-center space-x-1'>
                      <StarRateGenerator score={eachReview.score} />
                    </div>
                    <div className='ml-0 mr-auto overflow-hidden'>
                      <p className='line-break-auto line-height-1.5 h-[72px] w-[450px] break-keep'>
                        {`${eachReview.content}`}
                      </p>
                    </div>
                    <div className='ml-0 mr-auto mt-2'>
                      <button
                        onClick={() => {
                          handleOpen()
                        }}
                        className='text-[16px] text-mainBlack underline'
                      >
                        더 보기
                      </button>
                    </div>
                  </section>
                ))
              ) : (
                <div>리뷰가 없습니다.</div>
              )}
            </div>
            <div className='mt-3'>
              <button
                onClick={handleOpen}
                className=' rounded-lg border-[1px] border-mainBlack bg-white px-[23px] py-[13px]'
              >
                <span className='text-base font-semibold text-mainBlack'>
                  {`리뷰 ${reviews.length}개 모두 보기`}
                </span>
              </button>
              <ReviewModal
                reviews={reviews}
                reviewModalOpen={reviewModalOpen}
                setReviewModalOpen={setReviewModalOpen}
                id={id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
