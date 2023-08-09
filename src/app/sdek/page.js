import { setToDBSDEKToken, getSDEKToken } from "@/components/sdekAPI/getSDEKToken";

export default async function Sdek() {
//   const data = await getSDEKToken();
//   setToDBSDEKToken(data);
const data = await getSDEKToken();
  return (
    <div>
      <h1>{data}</h1>
      {/* <h1>{JSON.stringify(data.expires_in)}</h1>
      <h1>{data.token_type}</h1>
      <h1>{data.scope}</h1>
      <h1>{data.jti}</h1> */}
    </div>
  );
}
