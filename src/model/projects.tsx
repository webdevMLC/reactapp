// model/projects.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Human Resource, Payroll and Loan Management System",
    description: `HRPro is powered by a powerful combination of Node.js, MySQL, and React.js technologies. Node.js, a robust runtime environment, serves as the backbone of the system, providing an efficient and scalable server-side solution. With its event-driven architecture, Node.js enables seamless handling of concurrent connections and ensures optimal performance.
The integration of MySQL, a reliable and widely used relational database management system, empowers the system with a robust and scalable data storage solution. MySQL efficiently manages and organizes complex data structures`,
    technologies: ["ReactJS","ExpressJs", "Socket.IO", "MySQL", "Tailwind CSS", "Type Script"],
    image: "/images/hrproweb.png",
    link: "https://143.44.171.6:3000/",
  },
  {
    id: 2,
    title: "Mindanao Alliance of Land Transport and Workers Union",
    description: `I developed a comprehensive full-stack TypeScript web-based Loan and Union Management system using Next.js. This system is designed to streamline loan processing and efficiently manage union operations through a seamless and intuitive interface. It features robust user authentication, secure data management, automated loan calculations, and real-time reporting, providing union administrators with powerful tools to manage loans and member information effectively.

The system’s backend architecture ensures data integrity and performance, while the frontend delivers a responsive and user-friendly`,
    technologies: ["NextJS", "Socket.IO", "MySQL", "Tailwind CSS", "Type Script"],
    image: "/images/unionmgt.png"
  },
  {
    id: 3,
    title: "HRPro Mobile",
    description: `
HRPro Mobile is an all-in-one mobile solution designed for seamless Human Resource and Payroll management. Built for both employees and HR professionals, the app empowers users to manage attendance, payroll, leave requests, and more anytime, anywhere.`,
    technologies: ["React Native", "Next.js", "Socket.IO", "Expo Go", "Type Script"],
    image: "/images/HRProIOSAndroid.jpg"
  },
  {
    id: 4,
    title: "EcoUp Mobile App",
    description: `ecoU is your smart companion in saving the planet – an all-in-one mobile platform that rewards you for recycling, connects communities for environmental impact, and makes sustainable living easier than ever.

Built with React Native and powered by a Next.js backend, ecoU is designed for smooth cross-platform performance and fast, secure interactions.`,
    technologies: ["React Native", "Next.js", "Socket.IO", "Expo Go", "Type Script"],
    image: "/images/ecoUApp.jpg"
  },
];

export const featuredProjects: Project[] = [
  {
    id: 5,
    title: "Portfolio Website",
    description: "A personal portfolio website built with React and Tailwind CSS.",
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    image: "/images/Portolio.jpg",
    link: "https://your-portfolio-link.com",
  },
];