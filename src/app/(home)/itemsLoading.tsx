export default function ItemSkelton() {
  const item = (
    <div className='flex h-auto min-w-[260px] max-w-[486px] animate-pulse flex-col space-y-2'>
      <div className=' m-auto h-auto w-full rounded-lg'>
        <div className='duration-40 flex aspect-custom w-full flex-row  bg-slate-200 transition ease-out'></div>
      </div>

      <div className='  bg-slate-200 ' />

      <div className=' h-3 bg-slate-200 '></div>
      <div className=' h-3 w-[30%] bg-slate-200 '></div>
      <div className=' h-3 w-[60%] bg-slate-200 '></div>
      <div className=' h-3 w-[40%] bg-slate-200  '></div>
    </div>
  )
  return (
    <div className='z-0 grid h-full w-11/12 auto-cols-max grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-2  sm:gap-x-2 sm:gap-y-2 md:grid-cols-3 md:gap-x-3 md:gap-y-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-4 xl:grid-cols-5 xl:gap-x-5 xl:gap-y-5 2xl:grid-cols-6'>
      {item}
      {item}
      {item}
      {item}
      {item}
    </div>
  )
}
