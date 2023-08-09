import { prisma } from "@/lib/db/prisma";

async function fetchSDEKToken() {
  const client_id = process.env.SDEK_CLIENT_ID;
  const client_secret = process.env.SDEK_CLIENT_SECRET;
  const req = await fetch(
    `https://api.edu.cdek.ru/v2/oauth/token?parameters&grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,

    { method: "post" }
  );

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
    await setToDBSDEKToken(token);
    return token.access_token;
  }
}
