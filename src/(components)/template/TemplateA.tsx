import Image from "next/image";
import Kakaomap from "@/(components)/common/Kakaomap";
import Gallery from "@/(components)/common/Gallery";
import PetalCanvasOverlay from "@/(components)/common/PetalCanvasOverlay";
import AudioLayout from "@/(components)/common/AudioLayout";
import Button from "@/(components)/ui/Button";
import { useState } from "react";
import ContactOverlay from "@/(components)/common/ContactOverlay";
import Calendar from "../common/Calendar";

export default function TemplateA({
  seq,
  data,
}: {
  seq: string;
  data: FormDataType;
}) {
  const [open, setOpen] = useState(false);

  const groomSide = [
    { name: "신랑", relation: "당사자", phone: "010" },
    { name: "아버지", relation: "신랑측", phone: "010" },
    { name: "어머니", relation: "신랑측", phone: "010" },
  ];
  const brideSide = [
    { name: "신부", relation: "당사자", phone: "010" },
    { name: "아버지", relation: "신부측", phone: "010" },
    { name: "어머니", relation: "신부측", phone: "010" },
  ];

  return (
    <main className="flex flex-col items-center">
      <AudioLayout />
      <div className="overflow-hidden relative max-w-[100vw] w-[30rem] min-h-screen">
        <section className="w-full relative">
          <PetalCanvasOverlay
            className="absolute pointer-events-none inset-0"
            total={42}
            speedXMul={0.3}
            speedYMul={0.3}
            tintColor="#ffffff"
            minSize={8}
            maxSize={14}
          />
          <Image
            src="https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg"
            alt=""
            quality={80}
            width={720}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="text-center z-10 absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#fff]">
            <p className="text-[8.5em] leading-[0.3em] pb-[4rem] font-[Parisienne]">
              Wedding
            </p>
            <p>
              {data.date} {data.time}
            </p>
            <p>
              {data.groom} / {data.bride}
            </p>
            <p>{data.location}</p>
          </div>
        </section>
        <section className="flex item-center justify-center">
          <Calendar date={"2027.01.01"} />
        </section>
        <section className="p-4">
          <div className="text-center">
            <div className="text-center whitespace-pre-line py-16">
              {data.message?.replace(/\\n/g, "\n")}
            </div>
          </div>
          <div className="w-[60%] my-8 border-t border-[#bfa075] m-auto" />
          <div className="text-center pt-16">
            <p>
              신랑부 신랑모 <span className="opacity-60">의 아들</span> 신랑
            </p>
            <p>
              신부부 신부모 <span className="opacity-60">의 딸</span> 신부
            </p>
          </div>
        </section>
        <section className="text-center py-8">
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            연락하기
          </Button>
          <ContactOverlay
            open={open}
            onClose={() => setOpen(false)}
            groomSide={groomSide}
            brideSide={brideSide}
          />
        </section>
        <section>
          <div className="text-center py-8 mt-8">마음 전하는 곳</div>
        </section>
        <section>
          <div>
            <div className="text-center py-8 mt-8">Gallery</div>
            <div className="flex justify-center items-center flex-wrap gap-8">
              {/* <Gallery galleryItems={data.galleryItems} /> */}
            </div>
          </div>
        </section>
        <section>
          <div className="text-center py-8 mt-8">위치</div>
          <Kakaomap lat={data.lat} lng={data.lng} />
          <div className="p-16">
            <div className="text-center py-8 mt-8">오시는 길</div>
            <div
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: data.info.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
