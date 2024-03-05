import HeaderComponent from '@/app/(home)/header'
import ItemCardPage from '@/components/itemCardView/itemCardPage'
import GestNumber from '@/components/navigation/navibarButtons/gestNumber'

export default async function HomePage() {
  return (
    <>
      <main className='flex flex-col items-center justify-center w-full h-full'>
        <HeaderComponent />
        <ItemCardPage />
        <GestNumber />
      </main>
    </>
  )
}
