// src/hooks/useChat.ts
import { postChat } from "@/api/chat";
import { useErrorStore } from "@/store/errorStore";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
  const setErrorMessage = useErrorStore((state) => state.setErrorMessage);

  return useMutation({
    mutationFn: postChat,
    onSuccess: () => {
      setErrorMessage(null); // 성공 시 에러 초기화
    },
    onError: (error: unknown) => {
      const msg =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      setErrorMessage(msg);
    },
  });
};
