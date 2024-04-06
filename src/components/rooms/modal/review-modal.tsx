'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CloseIcon from '/public/svgIcons/closeIcon.svg'
import Star from '/public/svgIcons/reviewModalSvgs/star.svg'
import Cleanliness from '/public/svgIcons/reviewModalSvgs/cleanliness.svg'
import Accuracy from '/public/svgIcons/reviewModalSvgs/accuracy.svg'
import CheckIn from '/public/svgIcons/reviewModalSvgs/checkIn.svg'
import Interaction from '/public/svgIcons/reviewModalSvgs/interaction.svg'
import Location from '/public/svgIcons/reviewModalSvgs/location.svg'
import Satisfication from '/public/svgIcons/reviewModalSvgs/satisfactionComparedToPrice.svg'
import Search from '/public/svgIcons/reviewModalSvgs/search.svg'
import StarRateGenerator from '@/components/rooms/starIcon/starRateGenerator'
import Image from 'next/image'

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

export default function ReviewModal({
  reviews,
  reviewModalOpen,
  setReviewModalOpen,
}: {
  reviews: Review[]
  reviewModalOpen: boolean
  setReviewModalOpen: (newValue: boolean) => void
}) {
  const handleOpen = () => {
    setReviewModalOpen(true)
  }

  const handleClose = () => {
    setReviewModalOpen(false)
  }

  const [selectedMenu, setSelectedMenu] = useState('최신순')
  const menus = ['최신순', '높은 평점순', '낮은 평점순']
  const handleMenuClick = (menuName: React.SetStateAction<string>) => {
    setSelectedMenu(menuName)
  }

  const reviewExist = isReviewExist(reviews)
  const initialReviews = reviews.slice(0, 8)
  const avgScore = getAvgScore(reviews)

  return (
    <>
      <Modal open={reviewModalOpen} onClose={handleClose}>
        <Box
          className='border-1 relative left-1/2 top-1/2 h-full w-full
          -translate-x-1/2
           -translate-y-1/2 transform border-black bg-white
           p-3 shadow-lg md:mx-3 md:h-[900px]
           md:w-[90%] md:rounded-2xl
           lg:h-[900px] lg:w-[1032px] '
        >
          {/* 닫는 버튼  */}
          <div className='relative flex h-[72px] w-full items-center'>
            <button className='absolute left-7 text-black' onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          {/* 리뷰 및 별점 전체로 묶은 곳 */}
          {/* lg 이전에는 가로로 xl 이후로는 세로로  구역 두개로 묶어서 처리*/}
          <div className='ml-2 mt-8 max-h-[600px] w-[1150px] overflow-y-auto overflow-x-hidden'>
            {/* 별점 및 점수 처리 */}
            <div>
              {reviews.length > 2 ? (
                <div className='flex'>
                  <Star />
                  <div className='pl-3 text-3xl font-semibold'>{`${avgScore}`}</div>
                </div>
              ) : (
                <div className='mb-3'>
                  <span className='text-[14px] text-mainGray'>
                    후기가 3개 이상이면 별점이 표시됩니다.
                  </span>
                </div>
              )}
            </div>
            <div className='relative top-12 flex'>
              <div className='w-44 border-r-2'>
                <div className=''>전체 평점</div>
                <ol>
                  <li>
                    <div className='flex'>
                      <div className='text-sm'>5</div>
                      <div className='ml-4 mt-2 h-1 w-[120px] max-w-xs rounded-xl bg-gray-200'></div>
                    </div>
                  </li>
                  <li>
                    <div className='flex'>
                      <div className='text-sm'>4</div>
                      <div className='ml-4 mt-2 h-1 w-[120px] max-w-xs rounded-xl bg-gray-200'></div>
                    </div>
                  </li>
                  <li>
                    <div className='flex'>
                      <div className='text-sm'>3</div>
                      <div className='ml-4 mt-2 h-1 w-[120px] max-w-xs rounded-xl bg-gray-200'></div>
                    </div>
                  </li>
                  <li>
                    <div className='flex'>
                      <div className='text-sm'>2</div>
                      <div className='ml-4 mt-2 h-1 w-[120px] max-w-xs rounded-xl bg-gray-200'></div>
                    </div>
                  </li>
                  <li>
                    <div className='flex'>
                      <div className='text-sm'>1</div>
                      <div className='ml-4 mt-2 h-1 w-[120px] max-w-xs rounded-xl bg-gray-200'></div>
                    </div>
                  </li>
                </ol>
              </div>

              <div className='w-36 border-r-2 pl-4'>
                <div className='w-16'>청결도</div>
                <div>4.8</div>
                <Cleanliness className='mt-12' />
              </div>

              <div className='w-36 border-r-2 pl-4'>
                <div className='w-16'>정확도</div>
                <div>4.8</div>
                <Accuracy className='mt-12' />
              </div>
              <div className='w-36 border-r-2 pl-4'>
                <div className='w-16'>체크인</div>
                <div>4.8</div>
                <CheckIn className='mt-12' />
              </div>

              <div className='w-36 border-r-2 pl-4'>
                <div className='w-16'>의사소통</div>
                <div>4.8</div>
                <Interaction className='mt-12' />
              </div>

              <div className='w-36 border-r-2 pl-4'>
                <div className='w-16'>위치</div>
                <div>4.8</div>
                <Location className='mt-12' />
              </div>

              <div className='w-36 pl-4'>
                <div>가격 대비 만족도</div>
                <div>4.8</div>
                <Satisfication className='mt-12' />
              </div>
            </div>

            <div className='-ml-8 w-[1200px] divide-y-2 divide-gray-400'>
              <div className='mt-20'></div>
              <div></div>
            </div>

            {/* 리뷰 나오는 곳 */}
            <div>
              <div className='relative top-8 text-2xl font-semibold'>{`후기 ${reviews.length}개`}</div>
              <div className='flex justify-end'>
                <div className='group inline-block'>
                  <button className='flex h-12 max-w-32 items-center rounded-2xl border bg-white pl-2 font-semibold'>
                    <p className='pr-1 font-semibold'>{selectedMenu}</p>
                    <svg
                      className='h-4 w-4 transform fill-current transition
                    duration-150 ease-in-out group-hover:-rotate-180'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </button>
                  <div
                    className='absolute w-40 origin-top-left -translate-x-20 scale-0 transform
                  rounded-sm border bg-white transition duration-150 group-hover:scale-100'
                  >
                    <div>
                      <ul>
                        {menus.map((menu, index) => (
                          <li
                            className='h-10 w-40 hover:bg-slate-200'
                            key={index}
                            onClick={() => handleMenuClick(menu)}
                          >
                            {menu}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-12 h-11 w-full rounded-3xl border-2 border-black'>
              <label className='flex'>
                <div className='ml-4 mt-3'>
                  <Search />
                </div>
                <input
                  className='ml-2 mt-0 h-10 text-xl focus:outline-none'
                  type='text'
                  placeholder='후기 검색'
                />
              </label>
            </div>

            <div className='mt-6'>
              {reviewExist ? (
                initialReviews.map((eachReview, index) => (
                  <section key={index} className='flex flex-col md:h-[226px] lg:h-[150px] '>
                    <div className='mb-2 ml-0 mr-auto flex'>
                      <div className='mr-[14px] h-full w-12'>
                        <div className='relative h-12 w-12'>
                          <Image
                            key={index}
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
                    <div className='mb-1 ml-0 mr-auto flex items-center space-x-1'>
                      <StarRateGenerator score={eachReview.score} />
                    </div>
                    <div className='ml-0 mr-auto overflow-hidden'>
                      <p className='line-break-auto line-height-1.5 h-[72px] w-[450px] break-keep'>
                        {`${eachReview.content}`}
                      </p>
                    </div>
                  </section>
                ))
              ) : (
                <div>리뷰가 없습니다.</div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
