'use client'
import ScrollCardView from '@/components/categroyScroll/scrollCardView'
import React, { useEffect, useRef, useState } from 'react'
import LeftButtonIcon from '/public/images/LeftButtonIcon.svg'
import RightButtonIcon from '/public/images/RightButtonIcon.svg'

interface Props {
  categoryList: {
    categoryId: number
    imageUrl: string
    name: string
  }[]
}
export default function HorizonScroll({ categoryList }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, SetScrollPosition] = useState(0)
  const [selectedIconId, setSelectedIconId] = useState(0)

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
        SetScrollPosition(0)
        scrollRef.current.scrollLeft = 0
      } else if (
        scrollRef.current.scrollLeft + scrollRef.current.offsetWidth * 0.8 >
          scrollRef.current.scrollWidth - scrollRef.current.offsetWidth * 1.1 &&
        plusMinus === 1
      ) {
        SetScrollPosition(1)
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth - scrollRef.current.offsetWidth
      } else {
        SetScrollPosition(2)
      }
    }
  }

  return (
    <div className=' h-20 flex w-full grow items-center relative'>
      {/* 왼쪽 버튼 */}
      <div
        className={`h-20 w-[70px] flex items-center absolute left-0 ${
          scrollPosition === 0
            ? 'hidden'
            : 'bg-gradient-to-l from-transparent-70 from-10% via-white to-white'
        }`}
      >
        <button
          className='flex items-center rounded-full border bg-white border-gray-300 p-2'
          onClick={() => scroll(0)}
        >
          <LeftButtonIcon />
        </button>
      </div>
      {/* 스크롤 */}
      <div
        className=' h-full scroll-smooth overflow-y-hidden overflow-x-hidden  flex items-center gap-x-8 grid-rows-1 grid-flow-col scroll-pr-10'
        ref={scrollRef}
      >
        {listmap}
      </div>

      {/* 오른 버튼 */}
      <div
        className={`h-20 w-[70px] flex flex-row-reverse items-center absolute right-0 ${
          scrollPosition === 1
            ? 'hidden'
            : 'bg-gradient-to-r from-transparent-70 from-10% via-white to-white'
        }`}
      >
        <button className='border border-gray-300 rounded-full p-2' onClick={() => scroll(1)}>
          <RightButtonIcon />
        </button>
      </div>
    </div>
  )
}
