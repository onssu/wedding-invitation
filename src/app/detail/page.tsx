"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/(components)/common/Input";
import TinyEditor from "@/(components)/common/TinyEditor";

export default function DetailPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormDataType>();

  const onSubmit = (data: FormDataType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="flex flex-col items-center bg-[#333] gap-6">
        <div className="overflow-hidden relative max-w-[100vw] w-[30rem] min-h-screen bg-[#fff] px-6">
          <div>
            <label className="block mb-1 font-semibold">신부 이름</label>
            <Input
              {...register("bride", { required: true })}
              placeholder="신부 이름"
            />
            {errors.bride && (
              <span className="text-red-500 text-xs">
                신부 이름을 입력하세요.
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">신랑 이름</label>
            <Input
              {...register("groom", { required: true })}
              placeholder="신랑 이름"
            />
            {errors.groom && (
              <span className="text-red-500 text-xs">
                신랑 이름을 입력하세요.
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">날짜</label>
            <Input type="date" {...register("date", { required: true })} />
            {errors.date && (
              <span className="text-red-500 text-xs">날짜를 입력하세요.</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">시간</label>
            <Input type="time" {...register("time", { required: true })} />
            {errors.time && (
              <span className="text-red-500 text-xs">시간을 입력하세요.</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">장소</label>
            <Input
              {...register("location", { required: true })}
              placeholder="장소"
            />
            {errors.location && (
              <span className="text-red-500 text-xs">장소를 입력하세요.</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">위도(lat)</label>
            <Input
              type="number"
              step="any"
              {...register("lat", { required: true })}
              placeholder="위도"
            />
            {errors.lat && (
              <span className="text-red-500 text-xs">위도를 입력하세요.</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">경도(lng)</label>
            <Input
              type="number"
              step="any"
              {...register("lng", { required: true })}
              placeholder="경도"
            />
            {errors.lng && (
              <span className="text-red-500 text-xs">경도를 입력하세요.</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">메시지</label>
            <Input
              {...register("message", { required: true })}
              placeholder="메시지"
            />
            {errors.message && (
              <span className="text-red-500 text-xs">메시지를 입력하세요.</span>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("hideParents")}
                id="hideParents"
              />
              <label htmlFor="hideParents" className="font-semibold">
                부모님 정보 전체 가리기
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">신부 아버지</label>
            <input
              type="checkbox"
              {...register("hideBrideFater")}
              id="hideBrideFater"
            />
            <label htmlFor="hideBrideFater" className="font-semibold">
              신부 아버지 정보 가리기
            </label>
            <Input {...register("brideFater")} placeholder="신부 아버지" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">신부 어머니</label>
            <input
              type="checkbox"
              {...register("hideBrideMother")}
              id="hideBrideMother"
            />
            <label htmlFor="hideBrideMother" className="font-semibold">
              신부 어머니 정보 가리기
            </label>
            <Input {...register("brideMother")} placeholder="신부 어머니" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">신랑 아버지</label>
            <input
              type="checkbox"
              {...register("hideGroomFater")}
              id="hideGroomFater"
            />
            <label htmlFor="hideGroomFater" className="font-semibold">
              신랑 아버지 정보 가리기
            </label>
            <Input {...register("groomFater")} placeholder="신랑 아버지" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">신랑 어머니</label>
            <input
              type="checkbox"
              {...register("hideGroomMother")}
              id="hideGroomMother"
            />
            <label htmlFor="hideGroomMother" className="font-semibold">
              신랑 어머니 정보 가리기
            </label>
            <Input {...register("groomMother")} placeholder="신랑 어머니" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              갤러리 이미지 업로드
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("galleryItems")}
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                setValue("galleryItems", files as any);
              }}
              className="block w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">추가 정보</label>
            <textarea {...register("info")} placeholder="추가 정보" />
          </div>
          {/* <div>
            <TinyEditor />
          </div> */}
          <button
            type="submit"
            className="mt-6 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </main>
    </form>
  );
}
