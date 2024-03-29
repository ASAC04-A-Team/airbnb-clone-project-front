'use client'
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { ko } from 'date-fns/locale'

/**
 * 부모에서 작성할 것
 *
 * 기본 날짜 지정
 * const defaultSelected: DateRange = {
 * from: undefined,
 * to: undefined,
 * }
 *
 * 날짜 범위 가져오기, Props로 넘길 것
 * const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
 *
 * 날짜 초기화
 * const handleCalendar = () => {
 * setRange(defaultSelected)
 * setPlusDate('')
 * setPlusDateClick(0)
 * }
 *
 * 시작 날짜 / 날짜가 있다면 날짜가 나오고 없으면 '날짜 추가'가 나옴
 * {range?.from ? format(range.from, 'MMM dd', { locale: ko }) + '일 ' + plusDate : '날짜 추가'}
 *
 * 마지막 날짜 / 날짜가 있다면 마지막 날짜가 나오고 없다면 '날짜 추가'가 나옴
 * {range?.to ? format(range.to, 'MMM dd', { locale: ko }) + '일 ' + plusDate : '날짜 추가'}
 */

interface Props {
  range: any
  setRange: any
}

const css = `

.my-selected {
  color: white;
  background-color: black;
}

.range-start {
  background-color: black;
  border-radius: 50%;
}

.range-end {
  background-color: black;
  border-radius: 50%;
}

.range-middle {
  background-color: #F7F7F7;
  border-radius: 0;
  color: black;
}
`

const pastMonth = new Date()

export default function CalendarPicker({ range, setRange }: Props) {
  const defaultSelected: DateRange = {
    from: undefined,
    to: undefined,
  }

  const [disabledDays, setDisabledDays] = useState({ before: new Date() })
  useEffect(() => {
    setDisabledDays({ before: new Date() })
  }, [range])

  return (
    <div className='CalendarPicker'>
      <style>{css}</style>
      <DayPicker
        mode='range'
        locale={ko}
        selected={range}
        onSelect={setRange}
        disabled={disabledDays}
        numberOfMonths={2}
        modifiersClassNames={{
          selected: 'my-selected',
          range_end: 'range-end',
          range_middle: 'range-middle',
          range_start: 'range-start',
        }}
      />
    </div>
  )
}
