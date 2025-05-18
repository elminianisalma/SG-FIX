export interface Developer {
  id: number;
  name: string;
  role: string;
  availability: "Disponible" | "Occupé" | "En congé";
  skills: string[];
  workload: number;
  sub: string;
  email: string;
  sgJob: string;
  sgServiceName: string;
}

export interface IncidentRequirements {
  requiredSkills: string[];
  maxWorkload: number;
}

export const developers: Developer[] = [
  {
    id: 1,
    name: "Fatima Ezzahra Arbaoui",
    role: "Tech Lead",
    availability: "Disponible",
    skills: ["React", "Node.js", "TypeScript"],
    workload: 2,
    sub: "F123456",
    email: "fatima.arbaoui@socgen.com",
    sgJob: "Full Stack Developer",
    sgServiceName: "AFMO/BAN/ABS/CAS",
  },
  {
    id: 2,
    name: "Mahmoud Fassi",
    role: "Tech Lead",
    availability: "Occupé",
    skills: ["Angular", "Spring Boot"],
    workload: 4,
    sub: "F654321",
    email: "mahmoud.fassi@socgen.com",
    sgJob: "Tech Lead / Architect",
    sgServiceName: "AFMO/BAN/ABS/CAS",
  },
  {
    id: 3,
    name: "Keba Deme",
    role: "Tech lead",
    availability: "Disponible",
    skills: ["Docker", "Kubernetes", "AWS"],
    workload: 1,
    sub: "F789456",
    email: "keba.deme@socgen.com",
    sgJob: "DevOps Engineer",
    sgServiceName: "AFMO/BAN/ABS/CAS",
  },
  {
    id: 4,
    name: "Mehdi Bouhlaoui",
    role: "Full Stack Developer",
    availability: "En congé",
    skills: ["UML", "SQL", "Jira"],
    workload: 0,
    sub: "F321789",
    email: "mehdi.bouhlaoui@socgen.com",
    sgJob: "Business Analyst",
    sgServiceName: "AFMO/BAN/ABS/CAS",
  },
];
