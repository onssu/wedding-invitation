"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/(components)/ui/input";

interface FormValues {
  bride: string;
  groom: string;
  date: string;
  time: string;
  location: string;
}

export default function UploadPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="flex flex-col items-center bg-[#333] gap-6">
        <div className="overflow-hidden relative max-w-[100vw] w-[44rem] min-h-screen bg-[#fff] px-6">
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
