//카카오로 날리는 api
// 여기 진입했다는 것은 앞에 쓴 api가 성공해서
//아래와 같은 형태로 다시 카카오가 리다이렉트한 상황
//http://localhost:3000/login?code=ZdlTAr6tyohWbOQeuIbHE5eiIl2nVGdUb6pliUsgJuc52b6gYS3724NdXmYKPXNOAAABje_bzurC3p98Pd5TpQ

//우리는 위 url중 code추출해서 다시 코드 받기 api를 쓸것임
export const getToken = async () => {
  const search = new URLSearchParams(window.location.search);
  const code = search.get("code");

  //만약 code 없으면 빈값 반환
  if (!code) {
    return {};
  }
  const param = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: "406e4c9eea71feb057081ccb69949514",
    redirect_uri: "http://localhost:3000/kakaoLogin",
    code,
  });

  //code 값 있으면 카카오 요청해서 토큰값 받기
  const response = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: param,
  });

  const result = await response.json();
  console.log("result: ", result);
  return result;
};
