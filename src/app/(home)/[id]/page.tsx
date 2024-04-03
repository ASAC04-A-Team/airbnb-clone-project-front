import ItemCardViewGrid from '@/components/itemCardView/itemCardViewGrid'

interface IdParams {
  params: { id: number }
}

export default async function HomePage({ params: { id } }: IdParams) {
  const result = await fetch(`http://localhost:8080/api/home/${id}`)
  const inner = await result.json()
  const roomsData = inner.roomItem

  return (
    <>
      <ItemCardViewGrid roomsData={roomsData} />
    </>
  )
}
