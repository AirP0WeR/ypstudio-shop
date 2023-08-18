"use client";

import toast from "react-hot-toast";

export { Toaster as default } from "react-hot-toast";

export function notifyError(text) {
  toast.error(text);
}
export function notifySuccess(text) {
  toast.success(text);
}
