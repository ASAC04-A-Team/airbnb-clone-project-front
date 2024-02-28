const client_id = "406e4c9eea71feb057081ccb69949514";
const redirect_uri = "http://localhost:3000/kakaoLogin";
const response_type = "code";

//authParam은 카카오에 인가코드 요청할 떄 필요한 파라미터 값임
const authParam = new URLSearchParams({
  client_id,
  redirect_uri,
  response_type,
});
const KakaoLogin = () => {
  return (
    <a href={`https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`}>
      로그인
    </a>
  );
};

export default KakaoLogin;
