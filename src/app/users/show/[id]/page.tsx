import Authinfo from '@/components/profile/authinfo'
import Information from '@/components/profile/information'
import Introduction from '@/components/profile/introduction'
import IsAuthinfo from '@/components/profile/isAuthinfo'
import Review from '@/components/profile/review'
//유저 버튼에 추가하기
interface IdParams {
  params: { id: string }
}

export default async function UserProfilePage({ params: { id } }: IdParams) {
  const result = await fetch(`http://localhost:8080/api/users/authInformation/${id}`)

  const inner = await result.json()
  const usersData=inner.result

  return (
    <main className='flex h-full w-full  justify-center'>
      <section className='mt-12 flex h-full w-10/12   justify-center gap-[70px]'>
        <div className=' h-full w-auto flex-col items-center justify-center'>
          <Information id={id} />

          {usersData.isAuth === true ? (
            <IsAuthinfo name={usersData.nickname} />
          ) : (
            <Authinfo name={usersData.nickname} />
          )}
        </div>

        <div className='w-[740px]'>
          <Introduction id={id} />
          <hr />
          <Review name={usersData.nickname} id={id} />
        </div>
      </section>
    </main>
  )
}
