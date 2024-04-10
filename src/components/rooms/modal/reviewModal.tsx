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
import DownIcon from '/public/svgIcons/reviewModalSvgs/down.svg'
import Search from '/public/svgIcons/reviewModalSvgs/search.svg'
import StarRateGenerator from '@/components/rooms/starIcon/starRateGenerator'
import Image from 'next/image'
import { Content } from 'next/font/google'

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

const getScorePersent = (reviews: Review[]): string[] => {
  let oneReviewScore = 0
  let twoReviewScore = 0
  let threeReviewScore = 0
  let fourReviewScore = 0
  let fiveReviewScore = 0

  let fiveScorePercent = ``
  let fourScorePercent = ``
  let threeScorePercent = ``
  let twoScorePercent = ``
  let oneScorePercent = ``

  if (reviews.length > 0) {
    for (const reviewscore of reviews) {
      if (reviewscore.score === 1) {
        oneReviewScore += 1
      } else if (reviewscore.score === 2) {
        twoReviewScore += 1
      } else if (reviewscore.score === 3) {
        threeReviewScore += 1
      } else if (reviewscore.score === 4) {
        fourReviewScore += 1
      } else if (reviewscore.score === 5) {
        fiveReviewScore += 1
      }
    }

    fiveScorePercent = `${(fiveReviewScore / reviews.length) * 100}%`
    fourScorePercent = `${(fourReviewScore / reviews.length) * 100}%`
    threeScorePercent = `${Math.round((threeReviewScore / reviews.length) * 100)}%`
    twoScorePercent = `${Math.round((twoReviewScore / reviews.length) * 100)}%`
    oneScorePercent = `${Math.round((oneReviewScore / reviews.length) * 100)}%`
  } else {
    fiveScorePercent = `0%`
    fourScorePercent = `0%`
    threeScorePercent = `0%`
    twoScorePercent = `0%`
    oneScorePercent = `0%`
  }

  return [fiveScorePercent, fourScorePercent, threeScorePercent, twoScorePercent, oneScorePercent]
}

export default function ReviewModal({
  reviews,
  reviewModalOpen,
  setReviewModalOpen,
  id,
}: {
  reviews: Review[]
  reviewModalOpen: boolean
  setReviewModalOpen: (newValue: boolean) => void
  id: string
}) {
  const handleClose = () => {
    setReviewModalOpen(false)
  }

  const reviewExist = isReviewExist(reviews)
  const initialReviews = reviews.slice(0, 8)

  const [onFocusButton, setOnFocusButton] = useState(false)
  const [onClickSearchMenu, setOnClickSearchMenu] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('최신순')
  const [content, setContent] = useState('')
  const avgScore = getAvgScore(reviews)
  const scorePersent = getScorePersent(reviews)

  // const http = require('http')

  // http
  //   .createServer((req: any, res: any) => {
  //     res.writeHead(200, {
  //       'Access-Control-Allow-Origin': '*', // 모든 출처 허용
  //       // 특정 출처만 허용하려면 '*' 대신 'http://example.com'과 같이 설정
  //     })
  //     res.end('CORS policy enabled')
  //   })
  //   .listen(8080)

  const handleSubmit = async (event: any) => {
    event.preventDefault() // 폼 제출 기본 동작 방지
    const formData = new FormData(event.target) // 폼 데이터 수집

    // GET 요청 대신 POST 요청 사용
    const response = await fetch(`http://localhost:8080/api/review/reviewSearch/${id}`, {
      method: 'POST', // GET -> POST로 변경
      body: formData,
    })
    const result = await response.json() // 서버 응답 처리
    console.log(result)
  }

  return (
    <>
      <Modal open={reviewModalOpen} onClose={handleClose}>
        <Box
          className='border-1 relative left-1/2 top-1/2 h-full w-full
          -translate-x-1/2
           -translate-y-1/2 transform overflow-hidden border-black bg-white
           pb-10 shadow-lg md:mx-3
           md:h-[900px] md:w-[90%]
           md:rounded-2xl lg:h-[900px]
           lg:w-[1032px]'
        >
          {/* 닫는 버튼  */}
          <div className='relative flex h-[72px] w-full items-center'>
            <button className='absolute left-4 text-black' onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          {/* 리뷰 및 별점 전체로 묶은 곳 */}
          {/* lg 이전에는 가로로 xl 이후로는 세로로  구역 두개로 묶어서 처리*/}
          <div className=' flex h-full w-full flex-col overflow-y-auto xl:flex-row xl:justify-center'>
            {/* 별점 및 점수 처리 */}
            <div className='p-4 xl:w-[277px]  xl:flex-col xl:p-8'>
              <div className='xl:h-[37px] xl:w-full'>
                {reviews.length > 2 ? (
                  <div className='flex items-center gap-2'>
                    <Star style={{ width: '24px', height: '24px' }} />
                    <div className=' text-3xl font-semibold'>{`${avgScore}`}</div>
                  </div>
                ) : (
                  <div className='mb-3'>
                    <span className='text-base text-mainGray'>
                      후기가 3개 이상이면 별점이 표시됩니다.
                    </span>
                  </div>
                )}
              </div>
              <div className='flex flex h-[128px] w-full items-center justify-center text-xs xl:mt-5 xl:flex-col xl:items-baseline xl:justify-normal xl:gap-3'>
                <div className=' h-[95px] w-40 flex-col items-center justify-center border-r-2 px-3 xl:w-full xl:border-r-0 xl:px-0'>
                  <div className='text-xs xl:text-sm'>전체 평점</div>
                  <div className='flex items-center'>
                    <span className='text-[10px] text-gray-500 xl:text-black'>5</span>
                    <div className='ml-2  h-1 w-[94px] max-w-xs rounded-xl bg-gray-200 xl:w-full'>
                      <div className={`h-1 bg-black`} style={{ width: scorePersent[0] }}></div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-[10px] text-gray-500 xl:text-black'>4</span>
                    <div className='ml-2 h-1 w-[94px] max-w-xs rounded-xl bg-gray-200  xl:w-full'>
                      <div className={`h-1 bg-black`} style={{ width: scorePersent[1] }}></div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-[10px] text-gray-500 xl:text-black'>3</span>
                    <div className='ml-2 h-1 w-[94px] max-w-xs rounded-xl bg-gray-200  xl:w-full'>
                      <div className={`h-1 bg-black`} style={{ width: scorePersent[2] }}></div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-[10px] text-gray-500 xl:text-black'>2</span>
                    <div className='ml-2  h-1 w-[94px] max-w-xs rounded-xl bg-gray-200  xl:w-full'>
                      <div className={`h-1  bg-black`} style={{ width: scorePersent[3] }}></div>
                    </div>
                  </div>
                  <div className='flex flex-nowrap items-center'>
                    <span className='text-[10px] text-gray-500 xl:text-black'>1</span>
                    <div className='ml-2 h-1 w-[94px] max-w-xs rounded-xl bg-gray-200  xl:w-full'>
                      <div className={`h-1 bg-black`} style={{ width: scorePersent[4] }}></div>
                    </div>
                  </div>
                </div>

                <div className='relative  h-[95px] w-36 border-r-2 px-3  xl:mt-5 xl:w-full xl:border-b-2 xl:border-r-0 xl:p-5 xl:px-0'>
                  <span className='w-16 xl:absolute xl:bottom-4 xl:left-10'>청결도</span>
                  <div className='xl:absolute xl:bottom-4 xl:right-0'>{avgScore}</div>

                  <Cleanliness className='absolute bottom-3' />
                </div>

                <div className='relative  h-[95px] w-36 border-r-2 px-3 xl:w-full xl:border-b-2 xl:border-r-0 xl:p-5 xl:px-0'>
                  <span className='w-16 xl:absolute xl:bottom-4 xl:left-10'>정확도</span>
                  <div className='xl:absolute xl:bottom-4 xl:right-0'>{avgScore}</div>
                  <Accuracy className='absolute bottom-3' />
                </div>
                <div className='relative  h-[95px] w-36 border-r-2 px-3 xl:w-full xl:border-b-2 xl:border-r-0 xl:p-5 xl:px-0'>
                  <span className='w-16 xl:absolute xl:bottom-4 xl:left-10'>체크인</span>
                  <div className='xl:absolute xl:bottom-4 xl:right-0'>{avgScore}</div>
                  <CheckIn className='absolute bottom-3' />
                </div>

                <div className='relative  h-[95px] w-36 border-r-2 px-3 xl:w-full xl:border-b-2 xl:border-r-0 xl:p-5 xl:px-0'>
                  <span className='w-16 xl:absolute xl:bottom-4 xl:left-10'>의사소통</span>
                  <div className='xl:absolute xl:bottom-4 xl:right-0'>{avgScore}</div>
                  <Interaction className='absolute bottom-3' />
                </div>

                <div className='relative  h-[95px] w-36 border-r-2 px-3 xl:w-full xl:border-b-2 xl:border-r-0 xl:p-5 xl:px-0'>
                  <span className='w-16 xl:absolute xl:bottom-4 xl:left-10'>위치</span>
                  <div className='xl:absolute xl:bottom-4 xl:right-0'>{avgScore}</div>
                  <Location className='absolute bottom-3' />
                </div>

                <div className='relative  h-[95px] w-36  break-keep pl-3 xl:w-full xl:border-b-2 xl:border-r-0 xl:p-5 xl:px-0'>
                  <span className='xl:absolute xl:bottom-4 xl:left-10'>가격 대비 만족도</span>
                  <div className='xl:absolute xl:bottom-4 xl:right-0'>{avgScore}</div>
                  <Satisfication className='absolute bottom-3' />
                </div>
              </div>
            </div>
            <hr className='mt-2' />

            {/* 리뷰 나오는 곳 */}
            <div className='w-full flex-col items-center p-5 xl:w-[600px]'>
              <div className='flex h-[32px] w-full items-center justify-between '>
                <div className='text-xl font-semibold'>{`후기 ${reviews.length}개`}</div>

                <div className='relative'>
                  <button
                    className='flex h-[32px] w-auto items-center gap-2 rounded-2xl border bg-white px-3 font-semibold'
                    onClick={() => {
                      setOnClickSearchMenu(true)
                    }}
                    onFocus={() => {
                      setOnFocusButton(true)
                    }}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget) && !onClickSearchMenu) {
                        setOnFocusButton(false)
                      }
                    }}
                  >
                    <p className=' text-xs'>{selectedMenu}</p>
                    <DownIcon />
                  </button>
                  <div
                    className={`absolute right-0 w-40 rounded-sm border bg-white ${onClickSearchMenu && onFocusButton ? 'scale-100' : 'scale-0'}`}
                  >
                    <ul>
                      <li
                        className='h-10 w-40 p-3 hover:bg-navigatorOneLayoutColor'
                        onClick={() => {
                          setSelectedMenu('최신순')
                          setOnClickSearchMenu(false)
                        }}
                      >
                        최신순
                      </li>
                      <li
                        className='h-10 w-40 p-3 hover:bg-navigatorOneLayoutColor'
                        onClick={() => {
                          setSelectedMenu('높은 평점순')
                          setOnClickSearchMenu(false)
                        }}
                      >
                        높은 평점순
                      </li>
                      <li
                        className='h-10 w-40 p-3 hover:bg-navigatorOneLayoutColor'
                        onClick={() => {
                          setSelectedMenu('낮은 평점순')
                          setOnClickSearchMenu(false)
                        }}
                      >
                        낮은 평점순
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                target='param'
                className='group mt-3 flex h-11 w-[98%] items-center rounded-3xl border border-mainGray px-4 focus-within:border-2'
              >
                <Search className=' flex-none' />

                <input
                  className='group ml-2 h-10  w-full text-base text-sm focus:outline-none'
                  type='text'
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value)
                  }}
                  placeholder='후기 검색'
                />
              </form>

              <iframe id='if' name='param' style={{ display: 'none' }}></iframe>

              <div className='mt-6'>
                {reviewExist ? (
                  initialReviews.map((eachReview, index) => (
                    <section key={index} className='mb-7 flex flex-col gap-3'>
                      <div className='flex flex-row gap-3'>
                        <div className='relative h-12 w-12'>
                          <Image
                            key={index}
                            src={eachReview.reviewerProfileImageUrl}
                            alt={`${index}. reviewer profileImage`}
                            fill
                            className='rounded-full object-cover'
                          />
                        </div>

                        <div className='flex flex-col justify-center space-y-[2px]'>
                          <div className='text-[16px] font-semibold text-mainBlack'>
                            {`${eachReview.reviewerName}`}
                          </div>
                          <div className='text-[14px] text-mainGray'>{`${eachReview.nation}`}</div>
                        </div>
                      </div>
                      <div>
                        <div className='flex items-center space-x-1'>
                          <StarRateGenerator score={eachReview.score} />
                        </div>
                        <div className='mt-1 overflow-hidden'>
                          <p className='line-break-auto line-height-1.5 break-keep'>
                            {`${eachReview.content}`}
                          </p>
                        </div>
                      </div>
                    </section>
                  ))
                ) : (
                  <div>리뷰가 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
