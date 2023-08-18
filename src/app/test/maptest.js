"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const OpenStreetMap = dynamic(() => import("@/components/map"), {
  ssr: false,
});
import { pvz } from "./pvz.js";
import { value } from "./value.js";

export default function Page() {
  const latitude = 55.55;
  const longitude = 37.55;

  const [state, setState] = useState('123');

  function test() {
    setState("data")
  }

  return (
    <div>
      <OpenStreetMap pvz={pvz} value={value} stateFunction={test} />
      <h1>{state}</h1>
    </div>
  );
}
