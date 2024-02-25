"use Client";

import { useState, useEffect } from "react";
import styles from "./homeToolbar.module.css";
import Link from "next/link";
import Image from "next/image";

interface Props {
  totalItems: number; //데이터의 총 개수
  itemCountPerPage: number; // 페이지 당 보여줄 데이터 개수
  pageCount: number; // 보여줄 페이지 개수
  currentPage: number; // 현재 페이지
}

export default function HomeToolbar({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage); // 총 페이지 개수
  const [start, setStart] = useState(1); // 시작 페이지
  const noPrev = start === 1; // 이전 페이지가 없는 경우
  const noNext = start + pageCount - 1 >= totalPages; // 다음 페이지가 없는 경우

  //보여줄 페이지 설정
  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  const imageName = [
    "최고의 전망",
    "한적한 시골",
    "한옥",
    "와인 농장",
    "저택",
    "방",
    "기상전외한 숙소",
    "캠핑장",
    "해변 바로 앞",
    "초소형 주택",
    "열대 지역",
    "스키 타고 출입",
    "멋진 수영장",
    "통나무 집",
    "국립공원",
    "창작 공간",
    "디자인",
    "사막",
    "인기 급상승",
    "상징적 도시",
    "보트",
    "농장",
    "북극",
    "캐슬",
    "섬",
    "트룰로",
    "신규",
    "서핑",
    "세상의 꼭대기",
    "돔하우스",
    "키즈",
    "컨테이너하우스",
    "료칸",
    "복토 주택",
    "호수 근처",
    "호숫가",
    "트리하우스",
    "캠핑카",
    "동굴",
    "A자형 주택",
    "골프장",
    "B&B",
    "Luxe",
    "유서 깊은 주택",
    "키클라데스 주택",
    "전문가급 주방",
    "유르트",
    "마차",
    "카사 파르티쿨라르",
    "민수",
    "풍차",
    "그랜트 피아노",
    "타워",
    "헛간",
    "속세를 벗어난 숙소",
    "무장애",
    "하우스보트",
    "담무소",
    "리아드",
    "해변 근처",
    "스키",
  ];

  return (
    <div className="flex flex-row h-20 w-full border border-gray-200 justify-center items-center ">
      {/* patination */}
      <div
        className={`${styles.wrapper} flex-grow  flex flex-row justify-self-stretch h-20`}
      >
        <ul className="ulclass flex-grow  flex flex-row items-center h-20">
          <li
            className={`liclass ${styles.move} ${noPrev && styles.invisible}`}
          >
            <Link href={`?page=${start - 1}`}>
              <button className="mt-2 rounded-full border border-stone-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </Link>
          </li>
          {[...Array(pageCount)].map((a, i) => (
            <>
              {start + i <= totalPages && (
                <li
                  className="liclass  flex-grow flex justify-between items-center mx-4"
                  key={i}
                >
                  <Link
                    className={` ${styles.page} ${
                      currentPage === start + i && styles.active
                    }`}
                    href={`?page=${start + i}`}
                  >
                    <div className="h-[80px] w-[100px] flex flex-col justify-center items-center">
                      <Image
                        src={`/images/toolbarImage${start + i}.jpeg`}
                        alt={`${start + i}`}
                        width={32}
                        height={32}
                      />
                      <span className="w-[48px] text-[10px] flex justify-center items-center whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                        {imageName[`${start + i - 1}`]}
                      </span>
                    </div>
                  </Link>
                </li>
              )}
            </>
          ))}
          <li
            className={`liclass ${styles.move} ${noNext && styles.invisible}`}
          >
            <Link href={`?page=${start + pageCount}`}>
              <button className="mt-2 rounded-full border border-stone-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </Link>
          </li>
        </ul>
      </div>

      {/* 필터 */}
      <button className="flex flex-row h-[48px] w-[82.77px] mr-10 justify-center items-center border border-gray-300 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        <span className="text-sm ml-2">필터</span>
      </button>
    </div>
  );
}
