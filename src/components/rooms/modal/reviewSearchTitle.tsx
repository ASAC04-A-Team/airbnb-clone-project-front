'use client'

import { useEffect, useState } from 'react'
import DownIcon from '/public/svgIcons/reviewModalSvgs/down.svg'

export default function ReviewModalSearchTitle({
  selectedMenuOption,
}: {
  selectedMenuOption: string
}) {
  const [onFocusButton, setOnFocusButton] = useState(false)
  const [onClickSearchMenu, setOnClickSearchMenu] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('최신순')

  useEffect(() => {
    selectedMenuOption = selectedMenu
  }, [selectedMenu])

  return (
    <div className='relative'>
      <button
        className='flex h-[32px] w-auto items-center gap-2 rounded-2xl border bg-white px-3 font-semibold'
        onClick={() => {
          setOnClickSearchMenu(true)
        }}
        onFocus={() => {
          setOnFocusButton(true)
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget) && !onClickSearchMenu) {
            setOnFocusButton(false)
          }
        }}
      >
        <p className=' text-xs'>{selectedMenu}</p>
        <DownIcon />
      </button>
      <div
        className={`absolute right-0 w-40 rounded-sm border bg-white ${onClickSearchMenu && onFocusButton ? 'scale-100' : 'scale-0'}`}
      >
        <ul>
          <li
            className='h-10 w-40 p-3 hover:bg-navigatorOneLayoutColor'
            onClick={() => {
              setSelectedMenu('최신순')
              setOnClickSearchMenu(false)
            }}
          >
            최신순
          </li>
          <li
            className='h-10 w-40 p-3 hover:bg-navigatorOneLayoutColor'
            onClick={() => {
              setSelectedMenu('높은 평점순')
              setOnClickSearchMenu(false)
            }}
          >
            높은 평점순
          </li>
          <li
            className='h-10 w-40 p-3 hover:bg-navigatorOneLayoutColor'
            onClick={() => {
              setSelectedMenu('낮은 평점순')
              setOnClickSearchMenu(false)
            }}
          >
            낮은 평점순
          </li>
        </ul>
      </div>
    </div>
  )
}
