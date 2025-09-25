import { Video, Scissors } from "lucide-react";

export interface Agent {
  id: string;
  name: string;
  shortName: string;
  href: string;
  icon: any;
  description: string;
  comingSoon?: boolean;
}

export const agents: Agent[] = [
  {
    id: "social-media-marketing",
    name: "Social Media Marketing Agent",
    shortName: "Social Media",
    href: "/agents/social-media-marketing",
    icon: Video,
    description: "AI-powered social media content creation and automation"
  },
  {
    id: "video-stitching",
    name: "Video Stitching Agent",
    shortName: "Video Stitching",
    href: "/agents/video-stitching", 
    icon: Scissors,
    description: "Advanced video processing and stitching API service"
  }
  // Future agents can be easily added here:
  // {
  //   id: "content-writing",
  //   name: "Content Writing Agent",
  //   shortName: "Content Writing",
  //   href: "/agents/content-writing",
  //   icon: PenTool,
  //   description: "AI-powered content writing and optimization",
  //   comingSoon: true
  // }
];

export const getAgentByHref = (href: string): Agent | undefined => {
  return agents.find(agent => agent.href === href);
};

export const getAgentById = (id: string): Agent | undefined => {
  return agents.find(agent => agent.id === id);
};

export const getActiveAgents = (): Agent[] => {
  return agents.filter(agent => !agent.comingSoon);
};

export const getComingSoonAgents = (): Agent[] => {
  return agents.filter(agent => agent.comingSoon);
};