import FitterButton from '@/components/categroyScroll/fillterButton'
import HorizonScroll from '@/components/categroyScroll/horizonScroll'

export default async function ScrollPage() {
  const result = await fetch(`http://localhost:8080/api/category/`)
  const categoryIconData = await result.json()

  return (
    <div className='flex h-24 w-[91.16%] flex-row items-center justify-center space-x-4 pb-3 pt-5'>
      <div className='flex h-20 w-[91.16%] grow'>
        <HorizonScroll categoryList={categoryIconData} />
      </div>
      <div className='hidden grow-0 sm:visible sm:block md:visible lg:visible xl:visible 2xl:visible'>
        <FitterButton />
      </div>
    </div>
  )
}
