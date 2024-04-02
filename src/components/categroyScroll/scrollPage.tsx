import FitterButton from '@/components/categroyScroll/fillterButton'
import HorizonScroll from '@/components/categroyScroll/horizonScroll'

export default async function ScrollPage() {
  const result = await fetch(`http://localhost:8080/api/category/`)
  const categoryIconData = await result.json()

  return (
    <div className='flex flex-row items-center justify-center space-x-4 pb-3 pt-5 w-[91.16%] h-24'>
      <div className='flex w-[91.16%] h-20 grow'>
        <HorizonScroll categoryList={categoryIconData} />
      </div>
      <div className='grow-0 hidden sm:block sm:visible md:visible lg:visible xl:visible 2xl:visible'>
        <FitterButton />
      </div>
    </div>
  )
}
