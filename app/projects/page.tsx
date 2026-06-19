import type { Metadata } from "next";
import HomeExperience from "../components/HomeExperience";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Shaik Tajmahaboob Subhan across web development, product design, and full-stack applications.",
};

export default function ProjectsPage() {
  return <HomeExperience />;
}
