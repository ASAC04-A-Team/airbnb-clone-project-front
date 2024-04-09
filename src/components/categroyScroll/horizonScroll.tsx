'use client'
import ScrollCardView from '@/components/categroyScroll/scrollCardView'
import React, { useEffect, useRef, useState } from 'react'
import LeftButtonIcon from '/public/images/LeftButtonIcon.svg'
import RightButtonIcon from '/public/images/RightButtonIcon.svg'
import { usePathname } from 'next/navigation'

interface Props {
  categoryList: {
    categoryId: number
    imageUrl: string
    name: string
  }[]
}
export default function HorizonScroll({ categoryList }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [selectedIconId, setSelectedIconId] = useState(1)

  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      setSelectedIconId(1)
      if (scrollRef.current!) {
        scrollRef.current.scrollLeft = 0
        setScrollPosition(0)
      }
    }
  }, [pathname])

  const listmap = categoryList.map((listIndex) => (
    <ScrollCardView
      key={listIndex.categoryId}
      iconId={listIndex.categoryId}
      iconPath={listIndex.imageUrl}
      iconName={listIndex.name}
      selectedIconId={selectedIconId}
      onSelectIcon={setSelectedIconId}
    />
  ))

  const scroll = (plusMinus: number) => {
    if (scrollRef.current) {
      if (plusMinus === 1) {
        scrollRef.current.scrollLeft += scrollRef.current.offsetWidth * 0.8
      } else {
        scrollRef.current.scrollLeft -= scrollRef.current.offsetWidth * 0.8
      }

      if (
        scrollRef.current.scrollLeft - scrollRef.current.offsetWidth * 0.8 <
          scrollRef.current.offsetWidth * 0.7 &&
        plusMinus === 0
      ) {
        setScrollPosition(0)
        scrollRef.current.scrollLeft = 0
      } else if (
        scrollRef.current.scrollLeft + scrollRef.current.offsetWidth * 0.8 >
          scrollRef.current.scrollWidth - scrollRef.current.offsetWidth * 1.1 &&
        plusMinus === 1
      ) {
        setScrollPosition(1)
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth - scrollRef.current.offsetWidth
      } else {
        setScrollPosition(2)
      }
    }
  }

  return (
    <div className=' relative flex h-20 w-full grow items-center'>
      {/* 왼쪽 버튼 */}
      <div
        className={`absolute left-0 flex h-20 w-[70px] items-center ${
          scrollPosition === 0
            ? 'hidden'
            : 'bg-gradient-to-l from-transparent-70 from-10% via-white to-white'
        }`}
      >
        <button
          className='flex items-center rounded-full border border-gray-300 bg-white p-2'
          onClick={() => scroll(0)}
        >
          <LeftButtonIcon />
        </button>
      </div>
      {/* 스크롤 */}
      <div
        className=' flex h-full scroll-pr-10 grid-flow-col  grid-rows-1 items-center gap-x-8 overflow-x-hidden overflow-y-hidden scroll-smooth'
        ref={scrollRef}
      >
        {listmap}
      </div>

      {/* 오른 버튼 */}
      <div
        className={`absolute right-0 flex h-20 w-[70px] flex-row-reverse items-center ${
          scrollPosition === 1
            ? 'hidden'
            : 'bg-gradient-to-r from-transparent-70 from-10% via-white to-white'
        }`}
      >
        <button className='rounded-full border border-gray-300 p-2' onClick={() => scroll(1)}>
          <RightButtonIcon />
        </button>
      </div>
    </div>
  )
}
