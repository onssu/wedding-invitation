import Kakaomap from "@/(components)/ui/kakaomap";
import Image from "next/image";

export default function ExamplePage() {
  const data = {
    bride: "신부",
    groom: "신랑",
    date: "2025.08.06",
    time: "11:00",
    location: "결혼식 장소",
    message:
      "저희 두 사람,\n서로의 인연을 소중히 여기며\n오랜 사랑 끝에 결실을 맺으려 합니다.\n함께하는 자리에 오셔서 따뜻한 축복으로\n저희의 시작을 빛내주세요.",
    brideFater: "신부부",
    brideMother: "신부모",
    groomFater: "신랑부",
    groomMother: "신랑모",
    galleryItems: [
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    ],
  };

  return (
    <main className="flex flex-col items-center bg-[#333]">
      <div className="card-wrapper relative max-w-[100vw] w-[44rem] bg-[#fff]">
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
            <p className="text-[8em] line-height-[0.6em] pb-[4rem] font-[Parisienne]">
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
          <div className="text-center">
            <p>신랑부 신랑모 의 아들 신랑</p>
            <p>신부부 신부모 의 딸 신부</p>
          </div>
        </section>
        <section>
          <div>
            <p>
              신랑측 연락처 <a></a>
            </p>
            <p>
              신부측 연락처 <a></a>
            </p>
          </div>
        </section>
        <section>
          <div>마음 전하는 곳</div>
        </section>
        <section>
          <div>
            <div className="text-center py-8 mt-8">Gallery</div>
            <div className="flex justify-center items-center flex-wrap gap-8">
              {data.galleryItems.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt={`Gallery image ${index + 1}`}
                  quality={80}
                  width={120}
                  height={120}
                  className="inline-block"
                />
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="text-center py-8 mt-8">위치</div>
          <div>
            <Kakaomap />
          </div>
        </section>
      </div>
    </main>
  );
}
