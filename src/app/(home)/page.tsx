import ItemCardViewGrid from '@/components/itemCardView/itemCardViewGrid'

export default async function HomePage() {
  const result = await fetch(`http://localhost:8080/api/home/1`)
  const inner = await result.json()
  let roomsData = inner.result

  if (inner.code !== 0) {
    roomsData = []
    return <div>카테고리에 해당하는 에러가 없습니다.</div>
  }

  if (result.status === 501) {
    roomsData = []
    return <div>카테고리에 해당하는 에러가 없습니다.</div>
  }

  return (
    <>
      <ItemCardViewGrid roomsData={roomsData} />
    </>
  )
}
