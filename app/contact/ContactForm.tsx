'use client';

import emailjs from "@emailjs/browser";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const emailConfig = useMemo(
    () => ({
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    }),
    [],
  );

  useEffect(() => {
    setIsReady(true);
  }, []);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const validateForm = () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (form.website.trim()) {
      return "Message could not be sent.";
    }

    if (!name || !email || !subject || !message) {
      return "Please complete every field.";
    }

    if (name.length < 2 || name.length > 80) {
      return "Please enter a valid name.";
    }

    if (!EMAIL_PATTERN.test(email) || email.length > 120) {
      return "Please enter a valid email address.";
    }

    if (subject.length < 3 || subject.length > 120) {
      return "Subject must be between 3 and 120 characters.";
    }

    if (message.length < 10 || message.length > 2000) {
      return "Message must be between 10 and 2000 characters.";
    }

    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      return "Email service is not configured yet.";
    }

    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setIsSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      await emailjs.send(
        emailConfig.serviceId!,
        emailConfig.templateId!,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        },
        {
          publicKey: emailConfig.publicKey!,
          blockHeadless: true,
          blockList: {
            list: ["test@test.com", "spam@example.com"],
            watchVariable: "email",
          },
          limitRate: {
            id: form.email.trim().toLowerCase(),
            throttle: 60000,
          },
        },
      );

      setForm(initialFormState);
      setStatus({
        type: "success",
        message: "Thanks. Your message has been sent successfully.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong while sending. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#0a0a0a] px-5 py-8 text-white sm:px-8">
      <section className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-3xl flex-col justify-center">
        <Link
          href="/"
          className="mb-8 w-fit text-sm uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
        >
          Home
        </Link>

        <div className="mb-8">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-white/50">
            Contact
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Send a message
          </h1>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm uppercase tracking-[0.14em] text-white/60">
              Name
              <input
                className="min-h-12 rounded-none border border-white/20 bg-transparent px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition placeholder:text-white/35 focus:border-white"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
              />
            </label>

            <label className="grid gap-2 text-sm uppercase tracking-[0.14em] text-white/60">
              Email
              <input
                className="min-h-12 rounded-none border border-white/20 bg-transparent px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition placeholder:text-white/35 focus:border-white"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm uppercase tracking-[0.14em] text-white/60">
            Subject
            <input
              className="min-h-12 rounded-none border border-white/20 bg-transparent px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition placeholder:text-white/35 focus:border-white"
              name="subject"
              type="text"
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              required
            />
          </label>

          <label className="grid gap-2 text-sm uppercase tracking-[0.14em] text-white/60">
            Message
            <textarea
              className="min-h-40 resize-y rounded-none border border-white/20 bg-transparent px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition placeholder:text-white/35 focus:border-white"
              name="message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              required
            />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              className="min-h-12 border border-white bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={!isReady || isSending}
            >
              {isSending ? "Sending..." : "Send"}
            </button>

            <div
              className={`text-sm ${
                status.type === "success"
                  ? "text-emerald-300"
                  : status.type === "error"
                    ? "text-red-300"
                    : "text-white/60"
              }`}
              role={status.type === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {status.message}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ContactForm;
