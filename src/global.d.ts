type personal = {
  firstName: string;
  lastName: string;
  location: string;
  title: string;
  phone: string;
  email: string;
  links: Array<string[]>;
  about: string[];
};

type workItem = {
  company: {
    name: string;
    location: string;
  };
  titles: Array<string[]>;
  description: string;
  accomplishments: string[];
};

type educationItem = {
  location: string;
  program: string;
  description: string;
  date: string;
};

type resume = {
  personal: personal;
  experience: {
    work: workItem[];
    other: string[];
  };
  professionalSkills: {
    frontEnd: string[];
    backEnd: string[];
    deployBuild: string[];
    versionControl: string[];
  };
  education: educationItem[];
};

declare module "console" {
  export = typeof import("console");
}
