export default async function review({ name, id }: { name: string; id: string }) {
  const result = await fetch(`http://localhost:8080/api/users/hostReview/${id}`)
  const inner = await result.json()
  const usersData = inner.result

  return (
    <div>
      <h3 className='mt-10 text-2xl font-bold'>{name} 님에 대한 호스트 후기</h3>
      <br />
      <div className='flex'>
        <div className='flex'>
          {/* userData 배열을 순회하며 후기를 생성 */}
          {usersData.map((userData: any, index: any) => (
            <span
              key={index}
              className='block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow'
              style={{ marginRight: '10px' }}
            >
              <h5 className='mb-2 text-base tracking-tight text-gray-900'>{userData.content}</h5>
              <p className='font-bold'>{userData.nickname}</p>
              <p>
                {userData.year}년 {userData.month}월
              </p>
            </span>
          ))}
        </div>
      </div>
      <button
        type='button'
        className='mb-2 me-2 mt-5 rounded-lg border border-gray-800 px-3 py-1.5 text-center text-sm font-bold hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 '
      >
        후기 표시하기
      </button>
      <br />
      <br />
      <hr />
      <p className='relative bottom-[-30px] font-semibold text-gray-900 underline decoration-black'>
        내가 작성한 후기
      </p>
    </div>
  )
}
