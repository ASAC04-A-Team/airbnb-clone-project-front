'use client'

import { useState } from 'react'

export default function RoomDescription({ roomDescription }: { roomDescription: string }) {
  const roomDescriptionArray = roomDescription.split(',\n')

  const [description, setDescription] = useState(roomDescriptionArray)
  const [showMore, setShowMore] = useState(false)
  const [showLine, setShowLine] = useState(0)
  const LineNumber = roomDescriptionArray.length
  const showLineNumber = () => {
    setShowLine(LineNumber * 20)
  }
  const showMoreDescription = () => {
    setShowMore((prevShowMore) => !prevShowMore)
  }

  return (
    <>
      <div>
        <div className='py-6'>
          <div className='flex flex-col flex-start'>
            <div className={`w-full h-[${showMore ? showLine : '144'}px]`}>
              <span className='relative w-full h-full'>
                {description
                  .slice(0, showMore ? description.length : 4)
                  .map((eachDescriptionLine, lineIndex) => (
                    <div key={lineIndex}>{eachDescriptionLine}</div>
                  ))}
                {!showMore && description.length > 4 && (
                  <button
                    onClick={showMoreDescription}
                    className='text-gray-900 text-base font-semibold underline'
                  >
                    더 보기 {'>'}
                  </button>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
