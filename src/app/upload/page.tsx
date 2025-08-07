"use client";

import { Input } from "@/(components)/ui/input";

export default function UploadPage() {
  const onSubmit = () => {
    console.log("1");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <main className="flex flex-row">
          <div>신부</div>
          <Input />
        </main>
      </form>
    </>
  );
}
