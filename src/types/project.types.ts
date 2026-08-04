export type ProjectCategory =
  | "Full Stack"
  | "Web Development"
  | "Fullstack"
  | "Mobile"
  | "UI/UX"
  | "Portfolio";

export interface Project {
  _id?: string;
  id: number | string;
  name: string;
  description: string;
  image: string;
  liveUrl: string;
  category: ProjectCategory;
  techStack: string[];
  githubClient?: string; // Optional: Only for projects with separate repos
  githubServer?: string; // Optional: Only for Full Stack projects
}

