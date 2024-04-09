import ItemCardViewGrid from '@/components/itemCardView/itemCardViewGrid'

interface IdParams {
  params: { id: number }
}

export default async function HomePage({ params: { id } }: IdParams) {
  const result = await fetch(`http://localhost:8080/api/home/${id}`)
  const inner = await result.json()

  let roomsData = inner.roomItem

  if (result.status === 501) {
    roomsData = []
    console.log('카테고리에 해당하는 에러는 없습니다.')
    return <div>카테고리에 해당하는 에러가 없습니다.</div>
  }

  return (
    <>
      <ItemCardViewGrid roomsData={roomsData} />
    </>
  )
}
