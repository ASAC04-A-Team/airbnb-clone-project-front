import Image from 'next/image'

export default async function introduction({ id }: { id: string }) {
  const result = await fetch(`http://localhost:8080/api/users/introduction/${id}`)
  const inner = await result.json()
  const usersIntroduction = inner.result

  return (
    <section className='h-[240px] w-full flex-col '>
      <h1 className='text-3xl font-extrabold '>{usersIntroduction.nickname} 님 소개</h1>
      <button
        type='button'
        className='mb-2 me-2 mt-5 rounded-lg border border-gray-800 px-3 py-1.5 text-center text-sm font-black font-bold hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 '
      >
        프로필 수정하기
      </button>
      <br />
      <br />

      <div className='flex items-center'>
        <Image src='/images/profile1.png' className='mr-1' alt='프로필1' width={25} height={25} />
        <span className='mr-20 text-center'>거주지: {usersIntroduction.residence}</span>

        <Image
          src='/images/profile2.png'
          alt='프로필2'
          className='ml-20 mr-2'
          width={25}
          height={25}
        />

        <span>취미: {usersIntroduction.hobby}</span>
      </div>
      <br />
      <br />
    </section>
  )
}
