import ScrollPage from '@/components/categroyScroll/scrollPage'
import SmNavibar from '@/components/navigation/navibarComponents/smNavibar'
import NavigationBar from '@/components/navigation/navigation'

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
<<<<<<< HEAD
      <main className='flex flex-col items-center justify-center w-full h-full'>
        <header className='sticky top-0 bg-white w-full min-h-40 h-auto flex flex-col z-50 items-center hidden  sm:flex md:flex lg:flex xl:flex 2xl:flex'>
          <NavigationBar />
          <hr className='w-full  border-mianGray' />
          <ScrollPage />
        </header>
        <header className='sticky top-0 bg-white w-full h-full flex flex-col z-50 items-center black sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden'>
=======
      <main className='flex h-full w-full flex-col items-center justify-center'>
        <header className='sticky top-0 z-50 flex hidden h-auto min-h-40 w-full flex-col items-center bg-white  sm:flex md:flex lg:flex xl:flex 2xl:flex'>
          <NavigationBar />
          <hr className='border-mianGray  w-full' />
          <ScrollPage />
        </header>
        <header className='black sticky top-0 z-50 flex h-full w-full flex-col items-center bg-white sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden'>
>>>>>>> c29d9c7f586f2f0691697f90f739c116f052317a
          <SmNavibar />
          <ScrollPage />
        </header>
        {children}
      </main>
    </>
  )
}
