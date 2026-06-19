import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2022',
    title: 'Andhra University',
    subtitle: 'B.Tech CSE Student',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2023',
    title: 'Freelance Dev',
    subtitle: 'Full Stack Solutions',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2024',
    title: 'UI/UX Design',
    subtitle: 'Case Study Research',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2025',
    title: 'Sharpkode',
    subtitle: 'MERN Stack Developer',
    position: 'left',
  },
 {
  point: new THREE.Vector3(1, 1, -12),
  year: 'FUTURE',
  title: 'UI/UX Engineer',
  subtitle: 'User-focused design & frontend',
  position: 'right',
}
]