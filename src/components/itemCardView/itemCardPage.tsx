import ItemCardViewGrid from '@/components/itemCardView/itemCardViewGrid'

export default async function ItemCardPage() {
<<<<<<< HEAD
  const result = await fetch(`http://localhost:3000/api/home`)
  // const result = await fetch(`http://localhost:8080/api/home`)
  const inner = await result.json()
  const roomsData = JSON.parse(inner.data)
=======
  const result = await fetch(`http://localhost:8080/api/home/1`)
  const roomsData = await result.json()
>>>>>>> f8d02c30e3b25773693651781215da8e8ea97d2b

  return <ItemCardViewGrid roomsData={roomsData} />
}
