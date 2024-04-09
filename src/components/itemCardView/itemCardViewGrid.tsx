import ItemCardView from '@/components/itemCardView/itemCardView'
import ItemSkelton from '@/app/(home)/itemsLoading'

interface roomItem {
  id: number
  roomImageUrls: string[]
  host: string
  guestPreference: boolean
  price: string
  address: string
  nation: string
}

interface Props {
  roomsData: roomItem[]
}

export default function ItemCardViewGrid({ roomsData }: Props) {
  const itemsMap = roomsData.map((item: roomItem, index: number) => (
    <ItemCardView
      key={index}
      roomImageUrls={item.roomImageUrls}
      id={item.id}
      host={item.host}
      guestPreference={item.guestPreference}
      price={item.price}
      address={item.address}
      nation={item.nation}
    />
  ))

  return (
    <div className='z-0 grid h-full w-11/12 auto-cols-max grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-2  sm:gap-x-2 sm:gap-y-2 md:grid-cols-3 md:gap-x-3 md:gap-y-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-4 xl:grid-cols-5 xl:gap-x-5 xl:gap-y-5 2xl:grid-cols-6'>
      {!roomsData ? <ItemSkelton /> : itemsMap}
    </div>
  )
}
