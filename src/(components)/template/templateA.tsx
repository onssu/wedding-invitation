import Image from "next/image";
import Kakaomap from "@/(components)/ui/kakaomap";
import Gallery from "@/(components)/ui/gallery";

export default function TemplateA({ seq, data }: { seq: string }) {
  return (
    <main className="flex flex-col items-center bg-[#333]">
      <div className="overflow-hidden relative max-w-[100vw] w-[44rem] bg-[#fff]">
        <section className="w-full relative">
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
        <section className="p-4">
          <div className="text-center">
            <div
              className="text-center whitespace-pre-line py-16"
              dangerouslySetInnerHTML={{
                __html: data.message.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
          <div className="w-[60%] my-8 border-t border-[#bfa075] m-auto" />
          <div className="text-center pt-16">
            <p>
              신랑부 신랑모{" "}
              <span className="opacity-60 text-[1.4rem]">의 아들</span> 신랑
            </p>
            <p>
              신부부 신부모{" "}
              <span className="opacity-60 text-[1.4rem]">의 딸</span> 신부
            </p>
          </div>
        </section>
        <section>
          <div className="text-center py-8">
            <div>
              신랑측 연락처 <a></a>
              <a href="tel:010-1234-5678">
                <Image
                  src="/assets/icons/phone.svg"
                  alt="전화"
                  className="w-6 h-6 inline-block"
                  width={30}
                  height={30}
                />
              </a>
              <a href="sms:010-1234-5678">
                <Image
                  src="/icons/message.svg"
                  alt="문자"
                  className="w-6 h-6 inline-block"
                  width={30}
                  height={30}
                />
              </a>
              <div>신랑 전화 문자</div>
            </div>
            <div>
              신부측 연락처 <a></a>
            </div>
          </div>
        </section>
        <section>
          <div className="text-center py-8 mt-8">마음 전하는 곳</div>
        </section>
        <section>
          <div>
            <div className="text-center py-8 mt-8">Gallery</div>
            <div className="flex justify-center items-center flex-wrap gap-8">
              <Gallery galleryItems={data.galleryItems} />
            </div>
          </div>
        </section>
        <section>
          <div className="text-center py-8 mt-8">위치</div>
          <Kakaomap />
          <div className="p-16">
            <div className="text-center py-8 mt-8">오시는 길</div>
            <div>버스</div>
            <div>⦁</div>
            <div>지하철</div>
            <div>⦁</div>
            <div>주차</div>
            <div>
              안내데스크에서 주차권을 수령하실 수 있습니다.
              <br />
              2시간 무료 주차 가능
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
