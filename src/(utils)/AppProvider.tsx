"use client";

import { useState, type ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";

type AppProvidersProps = {
  children: ReactNode;
  /** 서버에서 react-query를 탈수화(dehydrate)해서 내려주는 경우에만 사용(선택) */
  dehydratedState?: DehydratedState;
};

export default function AppProvider({
  children,
  dehydratedState,
}: AppProvidersProps) {
  // QueryClient는 컴포넌트당 단 한 번만 생성되도록 useState 래핑
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 옵션: 필요에 맞게 조정하세요
            staleTime: 60 * 1000, // 1분
            gcTime: 5 * 60 * 1000, // 5분
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* 서버에서 내려준 dehydratedState가 있으면 클라이언트에서 수화 */}
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>

        {process.env.NODE_ENV !== "production" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
