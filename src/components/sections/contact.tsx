// contact.tsx
// 연락처(Contact) 섹션. 소개 문구 · 이메일/소셜 링크 · 문의 폼(Server Action).

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/data";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-muted/40"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <Reveal className="text-center">
          <SectionHeading id="contact-title">연락처</SectionHeading>
          <p className="mb-8 text-base text-muted-foreground">{CONTACT.intro}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-6")}
            >
              이메일 보내기
            </a>
            {CONTACT.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-6",
                )}
              >
                {social.label}
              </a>
            ))}
          </div>

          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
