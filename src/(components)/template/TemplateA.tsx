import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kakaomap from "@/(components)/common/Kakaomap";
import Gallery from "@/(components)/common/Gallery";
import PetalCanvasOverlay from "@/(components)/common/PetalCanvasOverlay";
import AudioLayout from "@/(components)/common/AudioLayout";
import Button from "@/(components)/ui/Button";
import ContactOverlay from "@/(components)/common/ContactOverlay";
import Calendar from "@/(components)/common/Calendar";
import WeddingDayCountdown from "@/(components)/common/WeddingCountdown";
import AccountAccordion from "@/(components)/common/AccountAccordion";

gsap.registerPlugin(ScrollTrigger);

export default function TemplateA({
  seq,
  data,
}: {
  seq: string;
  data: FormDataType;
}) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%", // viewport 80% 지점에 닿을 때 실행
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
  const galleryItems = [
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
  ];

  const groups = [
    {
      id: "groom",
      title: "신랑측",
      items: [
        { name: "김진호", bank: "신한은행", account: "110-000-00000" },
        { name: "김건호", bank: "우리은행", account: "110-000-00000" },
        { name: "이미자", bank: "국민은행", account: "110-000-00000" },
      ],
    },
    {
      id: "bride",
      title: "신부측",
      items: [
        { name: "이나은", bank: "하나은행", account: "110-000-00000" },
        { name: "이주명", bank: "카카오뱅크", account: "110-000-00000" },
        { name: "유수지", bank: "농협", account: "110-000-00000" },
      ],
    },
  ];
  return (
    <main ref={containerRef} className="flex flex-col items-center">
      <AudioLayout />
      <div className="overflow-hidden relative max-w-[100vw] w-[30rem] min-h-screen">
        <section data-reveal className="w-full relative">
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
        <section data-reveal className="p-4">
          <div className="text-center">
            <div className="text-center whitespace-pre-line py-16">
              {data.message?.replace(/\\n/g, "\n")}
            </div>
          </div>
        </section>
        <div className="w-[60%] my-8 border-t border-[#bfa075] m-auto" />
        <section
          data-reveal
          className="flex flex-col items-center justify-center"
        >
          <Calendar date={data.date} />
          <WeddingDayCountdown
            bride={data.bride}
            groom={data.groom}
            date={data.date}
          />
        </section>
        <section data-reveal className="text-center py-8">
          <div className="text-center pt-16">
            <p>
              신랑부 신랑모 <span className="opacity-60">의 아들</span> 신랑
            </p>
            <p>
              신부부 신부모 <span className="opacity-60">의 딸</span> 신부
            </p>
          </div>
          <Button
            className="mt-8"
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
        <section data-reveal>
          <div className="text-center py-8 mt-8">마음 전하는 곳</div>
          <AccountAccordion groups={groups} />
        </section>
        <section data-reveal>
          <div>
            <div className="text-center py-8 mt-8">Gallery</div>
            <div className="flex justify-center items-center flex-wrap gap-8">
              <Gallery galleryItems={galleryItems} />
            </div>
          </div>
        </section>
        <section>
          <div className="text-center py-8 mt-8">위치</div>
          <Kakaomap lat={data.lat} lng={data.lng} />
          <div data-reveal className="p-16">
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
