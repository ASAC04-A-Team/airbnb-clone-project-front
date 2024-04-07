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
  const result = await fetch(`http://localhost:8080/api/users/introduction/${id}`)

  const usersData = await result.json()

  return (
    <section className='relative flex top-[40px] flex-wrap left-[100px]'>
      <div className='relative left-[200px] md:w-1/3 mb-4 md:mb-0'>
        <Information id={id} />

        {usersData.isAuth === true ? (
          <IsAuthinfo name={usersData.name} />
        ) : (
          <Authinfo name={usersData.name} />
        )}
      </div>
      <div className='relative w-full md:w-2/3'>
        <Introduction id={id} />
        <Review name={usersData.name} />
      </div>
    </section>
  )
}
