import { FooterLink } from "../types";

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: 'LinkedIn',
    hoverText: 'Connect with me',
    icon: 'icons/linkedin.svg',
    url: 'https://www.linkedin.com/in/taj-mahaboob-subhan-shaik-a7ba83266/',
  },
  {
    name: 'GitHub',
    hoverText: 'Open Sourcing',
    icon: 'icons/github.svg',
    url: 'https://github.com/nameistaju',
  },
  /* {
    name: 'Instagram',
    hoverText: '@your_handle',
    icon: 'icons/instagram.svg',
    url: 'https://www.instagram.com/your_handle/',
  }, */
  {
    name: 'Contact',
    hoverText: 'Send a message',
    icon: 'icons/night-mode.svg', // You might want to change this icon to an envelope if available!
    url: '/contact',
  },
  {
    name: 'Resume',
    hoverText: 'Download Profile',
    icon: 'icons/file.svg',
    url: '/resume.pdf',
  }
];
