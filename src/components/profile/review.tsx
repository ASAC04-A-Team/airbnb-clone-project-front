export default async function review({ name, id }: { name: string; id: string }) {
  const result = await fetch(`http://localhost:8080/api/users/hostReview/${id}`)

  const usersData = await result.json()

  console.log('여기 값->' + usersData)

  usersData.map((user: any) => {
    console.log('Nickname:', user.nickname)
    console.log('Content:', user.content)
    console.log('year:', user.year)
    console.log('month:', user.month)
  })

  return (
    <div>
      <h3 className='font-bold text-2xl mt-10'>{name} 님에 대한 호스트 후기</h3>
      <br />
      <div className='flex'>
        <div className='flex'>
          {/* userData 배열을 순회하며 후기를 생성 */}
          {usersData.map((userData: any, index: any) => (
            <span
              key={index}
              className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow'
              style={{ marginRight: '10px' }}
            >
              <h5 className='mb-2 text-base tracking-tight text-gray-900'>{userData.content}</h5>
              <p className='font-bold'>{userData.nickname}</p>
              <p>{userData.year}</p>
              <p>{userData.month}</p>
            </span>
          ))}
        </div>
      </div>
      <button
        type='button'
        className='font-bold rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2 mt-5 border border-gray-800 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 '
      >
        후기 표시하기
      </button>
      <br />
      <br />
      <hr />
      <p className='relative font-semibold underline text-gray-900 decoration-black bottom-[-30px]'>
        내가 작성한 후기
      </p>
    </div>
  )
}
