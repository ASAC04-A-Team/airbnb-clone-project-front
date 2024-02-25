"use client";
import HomeToolbar from "@/app/(home)/homeToolbar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
    /* api 호출 및 데이터(totalItems, books) 저장 */
  }, [page]);

  return (
    <main>
      <HomeToolbar
        totalItems={61}
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
        pageCount={10}
        itemCountPerPage={1}
      />
    </main>
  );
}
