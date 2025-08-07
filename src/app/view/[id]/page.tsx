import TemplateA from "@/(components)/template/templateA";
import { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { seq: string };
}): Metadata => {
  return {
    title: `청첩장 #${params.seq}`,
    description: "우리의 특별한 날에 초대합니다",
    openGraph: {
      title: `청첩장 #${params.seq}`,
      description: "신랑과 신부의 결혼식에 초대합니다.",
      images: [
        {
          url: "https://example.com/og-image.jpg",
        },
      ],
    },
  };
};

export default function DetailPage({ seq }: { seq: string }) {
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
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
      "https://newsimg-hams.hankookilbo.com/2022/03/31/065f576b-0ff9-411d-8edb-edc139721de0.jpg",
    ],
  };

  return (
    <main>
      <TemplateA seq={"2"} data={data} />
    </main>
  );
}
