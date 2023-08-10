import { prisma } from "@/lib/db/prisma";
import { SDEKTokenURL } from "./constants";

async function fetchSDEKToken() {
  const req = await fetch(SDEKTokenURL, { method: "post" ,  cache: 'no-store' });
  return req.json();
}

async function setToDBSDEKToken(req) {
  const expires_in = new Date();
  expires_in.setSeconds(expires_in.getSeconds() + req.expires_in);
  await prisma.sdek.deleteMany({});

  await prisma.sdek.create({
    data: {
      access_token: req.access_token,
      token_type: req.token_type,
      expires_in,
      scope: req.scope,
      jti: req.jti,
    },
  });
}

export async function getSDEKToken() {
  const sdekDB = await prisma.sdek.findFirst({
    where: {
      expires_in: {
        gte: new Date(),
      },
    },
  });

  if (sdekDB) {
    console.log("token not expired");
    return sdekDB.access_token;
  } else {
    console.log("refresh token");
    const token = await fetchSDEKToken();
    const sendToken = await setToDBSDEKToken(token);
    return token.access_token;
  }
}
