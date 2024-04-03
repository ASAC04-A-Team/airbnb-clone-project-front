'use client'
import { useState, useEffect } from 'react'
import ItemCardView from '@/components/itemCardView/itemCardView'

interface Room {
  id: number
  slides: string[]
  host: string
  guestPreference: boolean
  price: string
  address: string
  nation: string
}

interface Props {
  roomsData: Room[]
}

export default function ItemCardViewGrid({ roomsData }: Props) {
  const itemsMap =
    Array.isArray(roomsData) &&
    roomsData.map((item: Room, index: number) => (
      <ItemCardView
        key={index}
        slides={item.slides}
        id={item.id}
        host={item.host}
        guestPreference={item.guestPreference}
        price={item.price}
        address={item.address}
        nation={item.nation}
      />
    ))

  return (
    <div className='w-11/12 h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  auto-cols-max gap-x-1 sm:gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-5 gap-y-1 sm:gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5 z-0'>
      {itemsMap}
    </div>
  )
}
