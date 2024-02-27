import Link from "next/link";
import Logo from "@/components/navigation/logo";
import LanguageImage from "@/components/navigation/languageImage";
import MenuImage from "@/components/navigation/menuImage";
import UserNavigationImge from "@/components/navigation/userNavigationImage";

export default function NavigationBar() {
  // 좌우 패딩? 여백 줄때 사용 할 것
  // 로그 부분 left-숫자 변경
  // 네비게이션 부분 right-숫자 변경

  return (
    <div className="flex w-full h-20 justify-center border border-gray-100">
      <div className="flex w-10/12 h-20 ">
        <div className="flex w-full h-20  justify-center items-center relative">
          {/* div 3객 묶는 구역 */}
          {/* 로그 부분 */}
          <div className="flex w-40 h-20 items-center absolute left-16">
            <Link className="w-[102px] h-[32px]" href="/">
              <Logo />
            </Link>
          </div>

          {/* 중간 검색 구역 */}

          <div className="min-h-20 max-h-40  px-19 grow flex  justify-center items-center absolute translate(-50%, -50%)"></div>

          {/* 네비케이션 부분 */}
          <div className="h-20 w-100 flex-none flex items-center justify-center absolute right-20 top-1">
            <div className="inline-flexv w-full flex flex-row justify-center">
              <div className="items-center justify-center py-2 mt-1">
                <button className="px-3 text-sm text-black rounded-full hover:bg-gray-100 pb-3">
                  당신의 공간을 에어비엔비하세요
                </button>
              </div>
              <div className="items-center  justify-center pt-1 mt-1">
                <button className="px-2 py-2 rounded-full hover:bg-gray-100 text-black">
                  <LanguageImage />
                </button>
              </div>
              <div className="items-center justify-center ml-3">
                <button className="h-[48px] w-[86px] mb-3 items-center flex flex-row border border-gray-300 rounded-full text-black shadow hover:shadow-lg">
                  <MenuImage />
                  <UserNavigationImge />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}