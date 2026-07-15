"use server";

// actions.ts
// Contact 폼을 처리하는 Server Action. 서버에서 유효성 검사 후 결과 상태를 반환한다.
// (Vercel 배포 환경에서 서버 기능으로 동작하며, JS 비활성 시에도 폼 제출이 가능하다.)

export type ContactStatus = "idle" | "success" | "error";

export type ContactState = {
  status: ContactStatus;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // 서버 측 유효성 검사
  if (!name || !email || !message) {
    return { status: "error", message: "모든 항목을 입력해 주세요." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "올바른 이메일 주소를 입력해 주세요." };
  }

  // 실제 서비스에서는 이 지점에서 이메일 발송/DB 저장 등을 처리한다.
  // (예: Resend, Nodemailer, 외부 API 연동 등)
  console.log("[contact] 새 문의:", { name, email, message });

  return {
    status: "success",
    message: "메시지가 전송되었습니다. 감사합니다!",
  };
}
