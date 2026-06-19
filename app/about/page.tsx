import type { Metadata } from "next";
import HomeExperience from "../components/HomeExperience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Shaik Tajmahaboob Subhan, a UI/UX designer and MERN stack developer.",
};

export default function AboutPage() {
  return <HomeExperience />;
}
