"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

interface ContactFormWithQueryProps {
  compact?: boolean;
}

export function ContactFormWithQuery({ compact }: ContactFormWithQueryProps) {
  const searchParams = useSearchParams();
  const messageParam = searchParams.get("message") ?? undefined;
  const subjectParam = searchParams.get("subject") ?? undefined;
  const propertyParam = searchParams.get("property") ?? undefined;
  const propertyIdParam = searchParams.get("propertyId") ?? undefined;

  return (
    <ContactForm
      compact={compact}
      initialMessage={messageParam}
      initialSubject={subjectParam}
      propertyTitle={propertyParam}
      propertyId={propertyIdParam}
    />
  );
}
