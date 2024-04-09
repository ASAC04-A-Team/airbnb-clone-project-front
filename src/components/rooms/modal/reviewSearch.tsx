import Search from '/public/svgIcons/reviewModalSvgs/search.svg'
import StarRateGenerator from '@/components/rooms/starIcon/starRateGenerator'
import Image from 'next/image'

const isReviewExist = (reviews: Review[]): boolean => {
  return reviews.length > 0
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

export default function ReviewSearch({
  reviews,
  id,
  selectedMenuOption,
}: {
  reviews: Review[]
  id: string
  selectedMenuOption: string
}) {
  const reviewExist = isReviewExist(reviews)
  const initialReviews = reviews.slice(0, 8)

  return (
    <>
      <form
        action={`http://localhost:8080/api/review/reviewSearch/${id}`}
        method='get'
        target='param'
        className='group mt-3 flex h-11 w-[98%] items-center rounded-3xl border border-mainGray px-4 focus-within:border-2'
      >
        <Search className=' flex-none' />

        <input
          className='group ml-2 h-10  w-full text-base text-sm focus:outline-none'
          type='text'
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
    </>
  )
}
