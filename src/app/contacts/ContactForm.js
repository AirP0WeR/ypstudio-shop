"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { werifyCaptcha } from "@/lib/reCapcha";
import { sendTelegrammMessage } from "@/lib/sendTelegramm";
import { notifyError, notifySuccess } from "@/components/Toasters";
import { createMessage } from "@/lib/db/message";
import { createRef } from "react";

export function ContactForm({ session }) {
  const [name, setName] = useState(session?.name || "");
  const [email, setEmail] = useState(session?.email || "");
  const [message, setMessage] = useState("");
  const [reCaptchaValue, setReCaptchaValue] = useState();
  const recaptchaRef = createRef(null);

  const telegramData =
    "Имя: " +
    name +
    "%0A" +
    "Email: " +
    email +
    "%0A" +
    "Сообщение: " +
    message;

  const dbMessageData = {
    name,
    email,
    message,
    id: session?.id,
  };

  async function submittForm(reCaptchaValue) {
    const capchaStatus = await werifyCaptcha(reCaptchaValue);
    if (name && email && message) {
      if (capchaStatus.success === true) {
        // отправить в телеграмм

        const messageSendStatus = await sendTelegrammMessage(telegramData);
        // пишем сообщение в базу
        const savedDbMessage = await createMessage(dbMessageData);

        if (messageSendStatus.ok === true) {
          // сделать тостер
          setName(session?.name || "");
          setEmail(session?.email || "");
          setMessage("");
          recaptchaRef.current.reset();
          notifySuccess("Сообщение отправлено");
        } else {
          notifyError("Что-то пошло не так");
        }
      } else {
        notifyError("Не верная капча");
      }
    } else {
      notifyError("Не хватает данных");
    }
  }

  return (
    <div className="border w-full sm:w-3/4 md:w-1/2 bg-white my-10 p-10">
      {/* <h1 className="text-3xl mb-3 text-center">Контактная информация</h1> */}
      {/* Имя */}
      <form>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Имя</span>
          </label>
          <input
            type="text"
            placeholder="Ваше имя"
            required
            disabled={session?.name}
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Email */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            disabled={session?.email}
            required
            placeholder="name@example.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Сообщение */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Сообщение</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 items-center mt-5">
          <ReCAPTCHA
            className="justify-self-center col-span-2"
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={setReCaptchaValue}
          />

          <div
            className="btn w-36 justify-self-center mt-3 xl:mt-0 col-span-1"
            onClick={() => submittForm(reCaptchaValue)}
          >
            Отправить
          </div>
        </div>
      </form>

    </div>
  );
}
