'use client'
import OnSearchButton from '@/components/navigation/navibarButtons/onSearchButton'
import SearchButton from '@/components/navigation/navibarButtons/searchButton'
import { useEffect, useRef, useState } from 'react'
import GestNumber from '@/components/navigation/navibarButtons/gestNumber'
import CloseIcon from '/public/svgIcons/CloseIcon.svg'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'

import { ko } from 'date-fns/locale'
import CalenderMenu from '@/components/navigation/navibarButtons/calenderMenu'
import TravelDesButton from '@/components/navigation/navibarButtons/travelDesButton'

function useCounter(initialValue: number) {
  const [number, setNumber] = useState<number>(initialValue)

  const increaseNumber = () => {
    setNumber((prev: number) => prev + 1)
  }

  const decreaseNumber = () => {
    setNumber((prev: number) => prev - 1)
  }

  return [number, increaseNumber, decreaseNumber]
}

export type PersonType = 'adult' | 'child' | 'baby' | 'pet'

export interface Person {
  adult: number
  child: number
  baby: number
  pet: number
}
// named type ->
export default function HomeNavigation() {
  const buttonsizeboolen = true
  const [searchButtonHover, setSearchButtonHover] = useState(false)
  const [activeButton, setActiveButton] = useState(0)
  const [topActivityMenu, setTopActivityMenu] = useState(true)
  const ref = useRef<any>(null)
  const [inputValue, setInputValue] = useState('')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)

  // 1st refactoring
  const [child, increaseChild, decreaseChild] = useCounter(0)
  const [adult, increaseAdult, decreaseAdult] = useCounter(0)
  // 2nd refactoring
  const [person, setPerson] = useState<Person>({
    adult: 0,
    child: 0,
    baby: 0,
    pet: 0,
  })
  const personSetter = (type: PersonType) => {
    return {
      plus: () => {
        const newperson = { ...person }
        if (type !== 'adult' && newperson.adult === 0) {
          newperson.adult += 1
        }
        newperson[type] += 1
        setPerson(newperson)
      },
      minus: () => {
        const newperson = { ...person }
        newperson[type] -= 1
        setPerson(newperson)
      },
    }
  }

  //달력 로직
  const [calenderOpen, setCalenderOpen] = useState(false)
  const defaultSelected: DateRange = {
    from: undefined,
    to: undefined,
  }
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
  const [plusDate, setPlusDate] = useState('')
  const [plusdateClick, setPlusDateClick] = useState(0)

  const handleCalender = () => {
    setRange(defaultSelected)
    setPlusDate('')
    setPlusDateClick(0)
  }

  const handleNumber = () => {
    const resetNumber = { adult: 0, child: 0, baby: 0, pet: 0 }

    setPerson(resetNumber)
  }

  // 4개의 버튼을 다닫는 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActiveButton(0)
        setIsMenuOpen(false)
        setCalenderOpen(false)
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex flex-col h-40'>
      <div className='flex flex-row h-20 justify-center items-center' role='group'>
        <button
          type='button'
          className={`px-4 h-8 p-3 text-gray-900 flex items-center rounded-full ${
            topActivityMenu ? 'hover:bg-inherit' : 'hover:bg-gray-100'
          }`}
          onClick={() => setTopActivityMenu(true)}
        >
          <span className={`${topActivityMenu ? 'text-black' : 'text-gray-400'}`}>숙소</span>
        </button>

        <button
          type='button'
          className={`px-4 h-8 text-gray-900 rounded-full  ${
            topActivityMenu ? 'hover:bg-gray-100' : 'hover:bg-inherit'
          }`}
          onClick={() => setTopActivityMenu(false)}
        >
          <span className={`${topActivityMenu ? 'text-gray-400' : 'text-black'}`}>체험</span>
        </button>
        <button type='button' className='px-4 h-8 text-gray-900 rounded-full'>
          온라인 체험
        </button>
      </div>

      {/* 두번쨰 버튼층 */}
      <div className={`flex flex-row h-[79px] justify-center items-center pb-3`}>
        <div
          className={`border border-gray-300 rounded-full shadow-lg flex h-full items-center  ${
            activeButton ? 'bg-navigatorOneLayoutColor' : ''
          }`}
          ref={ref}
        >
          <button
            className={`h-full w-[282px] rounded-full flex flex-col pl-4 pt-3 pb-3 group ${
              activeButton === 1
                ? 'bg-white border border-gray-300 shadow'
                : 'hover:bg-navigatorTwoLayoutColor'
            }`}
            onClick={() => {
              setActiveButton(1)
              setIsOpen(true)
            }}
            ref={buttonRef}
          >
            <span className='text-xs ml-4'>여행지</span>
            <div ref={ref}>
              <TravelDesButton
                setInputValue={setInputValue}
                activeButton={activeButton}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttonRef={buttonRef}
              />
            </div>
            {/* <span className="text-sm mt-1 ml-4 text-gray-400">여행지 검색</span> */}

            <input
              placeholder='여행지 검색'
              type='text'
              value={inputValue}
              onChange={(e) => inputValue}
              className={`text-sm mt-1 ml-4 w-52 bg-inherit group-focus:active focus:outline-none text-gray-400 ${
                activeButton === 1 ? 'active' : ''
              }`}
            />
          </button>
          <span
            className={`text-xl ${
              activeButton === 1 ||
              activeButton === 2 ||
              (topActivityMenu === false && activeButton === 3)
                ? 'text-navigatorOneLayoutColor'
                : 'text-navigatorOneLayoutColor '
            }`}
          >
            |
          </span>
          <div
            className={`h-full w-72 flex flex-row items-center ${topActivityMenu ? '' : 'hidden'}`}
          >
            <button
              className={`h-full w-36 rounded-full flex flex-col pl-4 pt-3 pb-3 ${
                activeButton === 2
                  ? 'bg-white border border-gray-300 shadow'
                  : 'hover:bg-navigatorTwoLayoutColor'
              }`}
              onClick={() => {
                setActiveButton(2)
                setCalenderOpen(true)
              }}
            >
              {/* 체크인 */}
              <div className='w-full h-full grid grid-cols-3 grid-rows-2'>
                <span className='text-xs flex justify-start col-span-2'>체크인</span>
                <div
                  className={`rounded-full row-span-2 flex items-center  ${activeButton === 2 ? '' : 'hidden'}`}
                  onClick={handleCalender}
                >
                  <CloseIcon className={`flex items-center rounded-full  `} />
                </div>
                <span
                  className={`text-sm  col-span-2 flex justify-start ${range?.from ? 'text-black' : 'text-gray-400'} `}
                >
                  {range?.from
                    ? format(range.from, 'MMM dd', { locale: ko }) + '일 ' + plusDate
                    : '날짜 추가'}
                </span>
              </div>
            </button>
            <span
              className={`text-lg ${
                activeButton === 2 || activeButton === 3 ? 'text-gray-200' : 'text-gray-300 '
              }`}
            >
              |
            </span>
            <button
              className={`h-full w-36 rounded-full flex flex-col pl-4 pt-3 pb-3 ${
                activeButton === 3
                  ? 'bg-white border border-gray-300 shadow'
                  : 'hover:bg-navigatorTwoLayoutColor'
              }`}
              onClick={() => {
                setActiveButton(3)
                setCalenderOpen(true)
              }}
            >
              {/* 체크 아웃 */}
              <div className='w-full h-full grid grid-cols-3 grid-rows-2'>
                <span className='text-xs flex justify-start col-span-2'>체크아웃</span>
                <div
                  className={`rounded-full row-span-2 flex items-center  ${activeButton === 3 ? '' : 'hidden'}`}
                  onClick={handleCalender}
                >
                  <CloseIcon className={`flex items-center rounded-full  `} />
                </div>
                <span
                  className={`text-sm col-span-2 flex justify-start ${range?.to ? 'text-black' : 'text-gray-400'} `}
                >
                  {range?.to
                    ? format(range.to, 'MMM dd', { locale: ko }) + '일 ' + plusDate
                    : '날짜 추가'}
                </span>
              </div>
            </button>
          </div>
          <div
            className={`h-full w-72 flex flex-row items-center ${topActivityMenu ? 'hidden' : ''}`}
            onClick={() => {
              setCalenderOpen(true)
              console.log(calenderOpen)
            }}
          >
            <button
              className={`h-full w-full rounded-full flex flex-col pl-4 pt-3 pb-3 ${
                activeButton === 3
                  ? 'bg-white border border-gray-300 shadow'
                  : 'hover:bg-navigatorTwoLayoutColor'
              }`}
              onClick={() => {
                setActiveButton(3)
              }}
            >
              <div className='w-full h-full grid grid-cols-3 grid-rows-2'>
                <span className='text-xs flex justify-start col-span-2'>날짜</span>
                <div
                  className={`rounded-full flex items-center justify-end pr-3 row-span-2  ${activeButton === 3 ? '' : 'hidden'}`}
                  onClick={handleCalender}
                >
                  <CloseIcon className={`flex items-center rounded-full  `} />
                </div>
                <span
                  className={`text-sm col-span-2 flex justify-start ${range?.from ? 'text-black' : 'text-gray-400'}`}
                >
                  {range?.from ? format(range.from, 'MMM dd', { locale: ko }) + '일 ' : '날짜 추가'}{' '}
                  {range?.to
                    ? '- ' + format(range.to, 'MMM dd', { locale: ko }) + '일 ' + plusDate
                    : ''}
                </span>
              </div>
            </button>
          </div>
          {/* 날짜 선택 메뉴*/}

          <div ref={ref}>
            <CalenderMenu
              range={range}
              setRange={setRange}
              activeButton={activeButton}
              calenderOpen={calenderOpen}
              setCalenderOpen={setCalenderOpen}
              setPlusDate={setPlusDate}
              setPlusDateClick={setPlusDateClick}
              plusdateClick={plusdateClick}
            />
          </div>
          {/* 날짜 선택 끝 */}

          <span
            className={`text-lg ${
              activeButton === 3 || activeButton === 4 ? 'text-gray-200' : 'text-gray-300'
            }`}
          >
            |
          </span>

          <div className='flex flex-row h-full w-64 items-center rounded-full pt-3 pb-3 relative'>
            {/* 첫 번째 버튼 그룹 - 여행자 메뉴 */}
            <button
              className={`flex-grow pt-1 pb-1 pl-3 flex rounded-full group ${
                activeButton === 4
                  ? 'bg-white border border-gray-300 shadow'
                  : 'hover:bg-navigatorTwoLayoutColor'
              }`}
              onClick={() => {
                setActiveButton(4)
                setIsMenuOpen(!isMenuOpen)
              }}
              id='menu-button'
            >
              {/* gestNumber grid */}
              <span
                className={`flex ml-1 flex-col mb-1 w-[70%] h-full grid grid-cols-4 grid-rows-2  ${
                  activeButton === 4
                    ? 'group-hover:bg-white'
                    : 'group-hover:bg-navigatorTwoLayoutColor'
                }`}
              >
                <span className={`text-xs flex pt-3 justify-start col-span-3`}>여행자</span>
                <div
                  className={`rounded-full mr-2 row-span-2 flex items-center  ${activeButton === 0 ? 'hidden' : ''}`}
                  onClick={handleNumber}
                >
                  <CloseIcon
                    className={`flex items-center rounded-full  ${person.adult + person.child === 0 ? 'text-transparent hover:none' : 'hover:bg-navigatorOneLayoutColor'}`}
                  />
                </div>

                <span
                  className={`text-sm mt-1 w-[90%] flex justify-start col-span-3 line-clamp-1 ${person.adult + person.child === 0 ? 'text-gray-400' : 'text-black'}`}
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  게스트 {person.adult + person.child === 0 ? '추가' : person.adult + person.child}
                  {person.adult + person.child === 16 ? ' 이상' : ''}
                  {person.baby === 0 ? '' : ', 유아 ' + person.baby + '명'}
                  {person.pet === 0 ? '' : ', 반려동물 ' + person.pet + '마리'}
                </span>
              </span>
            </button>

            {/* 게스트 버튼 끝 */}
            <div ref={ref}>
              <GestNumber
                isMenuOpen={isMenuOpen}
                setPerson={personSetter}
                person={person}
                activeButton={activeButton}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
            <div className='absolute right-3 '>
              <div
                className={`${activeButton === 0 ? '' : 'hidden'}`}
                onMouseEnter={() => {
                  setSearchButtonHover(true)
                }}
                onMouseLeave={() => {
                  setSearchButtonHover(false)
                }}
              >
                <SearchButton
                  buttonsizeboolen={buttonsizeboolen}
                  searchButtonHover={searchButtonHover}
                />
              </div>
              <div className={`${activeButton === 0 ? 'hidden' : ''}`}>
                <OnSearchButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
