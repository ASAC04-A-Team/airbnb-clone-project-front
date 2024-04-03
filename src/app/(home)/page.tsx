import ItemCardViewGrid from '@/components/itemCardView/itemCardViewGrid'

export default async function HomePage() {
  const result = await fetch(`http://localhost:8080/api/home/1`)
  const roomsData = await result.json()

  return (
    <>
      <ItemCardViewGrid roomsData={roomsData} />
    </>
  )
}
