import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shaik Tajmahaboob Subhan for design, frontend, and full-stack development work.",
};

export default function ContactPage() {
  return <ContactForm />;
}
