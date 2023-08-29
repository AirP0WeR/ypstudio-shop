"use server";
export async function sendTelegrammMessage(data) {
  let response;
  try {
    response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_USER_ID}&text=${data}&parse_mode=HTML`
    );
  } catch (error) {
    console.log("There was an error", error);
  }
  if (response?.ok) {
    return response.json();
  } else {
    console.log(`HTTP Response Code: ${response?.status}`);
  }
}
