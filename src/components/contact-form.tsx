"use client";

// contact-form.tsx
// Contact 폼. React 19의 useActionState로 Server Action(submitContact)에 연결하고,
// 결과를 sonner 토스트로 안내한다. 성공 시 폼을 초기화한다.

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { submitContact, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const INITIAL_STATE: ContactState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    INITIAL_STATE,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mx-auto mt-10 max-w-lg space-y-4 text-left"
    >
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="홍길동"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">메시지</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="문의 내용을 입력해 주세요."
        />
      </div>
      <Button type="submit" disabled={pending} className="h-11 w-full px-6">
        {pending ? "전송 중..." : "메시지 보내기"}
      </Button>
    </form>
  );
}
