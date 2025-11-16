"use client";

import dynamic from "next/dynamic";

const Stack = dynamic(() => import("./Stack"), {
  ssr: false
});

export default Stack;
