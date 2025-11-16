"use client";
import React, { Suspense } from "react";
import Password from "./Password"; // your current component

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Password />
    </Suspense>
  );
}
