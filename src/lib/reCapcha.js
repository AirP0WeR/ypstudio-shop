"use server";
export async function werifyCaptcha(reCaptchaValue) {
  let response;
  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaValue}`,
    });
  } catch (error) {
    console.log("There was an error", error);
  }
  if (response?.ok) {
    return response.json();
  } else {
    console.log(`HTTP Response Code: ${response?.status}`);
  }
}
