import ItemCardViewGrid from '@/components/itemCardView/itemCardViewGrid'

export default async function HomePage() {
  const result = await fetch(`http://localhost:8080/api/home/1`)
  const inner = await result.json()
  const roomsData = inner.roomItem

  return (
    <>
      <ItemCardViewGrid roomsData={roomsData} />
    </>
  )
}
