import ItemCardViewGrid from '@/components/itemCardView/itemCardViewGrid'

interface IdParams {
  params: { id: number }
}
export default async function HomePage({ params: { id } }: IdParams) {
  const result = await fetch(`http://localhost:8080/api/home/${id}`)
  const roomsData = await result.json()

  return (
    <>
      <ItemCardViewGrid roomsData={roomsData} />
    </>
  )
}
