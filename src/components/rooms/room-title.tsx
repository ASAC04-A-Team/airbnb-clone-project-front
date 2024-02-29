export default async function RoomTitle({ id }: { id: number }) {
  /**
   * 위의 getRoomJson 사용 시
   */
  const slugexampleresult = await fetch(
    "http://localhost:3000/api/roomquery/1/name"
  );
  const slugexampleresultinner = await slugexampleresult.json();
  console.log(" slug test : ", slugexampleresultinner.data);
  const realresult = slugexampleresultinner.data;

  const result = await fetch("http://localhost:3000/api/room/1?searchid=2");
  const inner = await result.json();

  const example = await fetch("http://localhost:3000/api/room/1/title");
  const exampleinner = await example.json();
  // console.log("dongyu : ", exampleinner.data);
  const roomData = inner.data;
  // console.log(roomData);
  if (!roomData) {
    return <div>존재하지 않는 방입니다.</div>;
  }

  return (
    <>
      <div>
        <div className="pt-6">
          {/* 좌측 버튼 + 숙소명 */}
          <section>
            <div className="px-20 h-30 flex flex-wrap justify-between items-end">
              <div className="inline-flex">
                <span className="text-gray-900 dark:text-black text-2xl font-semibold">
                  {realresult}
                </span>
              </div>

              {/* 우측 버튼 그룹 */}
              <div className="flex justify-end items-center font-base font-sans">
                <div className="mr-5 flex">
                  <span>
                    <svg
                      className="w-6 h-6 inline-flex text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                      />
                    </svg>
                    <button className="inline-flex">공유하기</button>
                  </span>
                </div>
                <div className="flex">
                  <span>
                    <svg
                      className="w-6 h-6 inline-flex text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                      />
                    </svg>
                    <button className="inline-flex">좋아요</button>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
