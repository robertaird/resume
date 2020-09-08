type personal = {
  firstName: string;
  lastName: string;
  title: string;
  contact: string[][];
  about: string[];
};

type position = {
  title: string;
  accomplishments: (string | string[])[];
  dates?: string;
  description?: string;
};

type workItem = {
  company: {
    name: string;
    location: string;
    dates: string;
  };
  description?: string;
  positions: position[];
};

type otherItem =
  | string
  | {
      description: string;
      date: string;
    };

type educationItem = {
  location: string;
  program: string;
  description: string;
  date: string;
};

type skillsItem = {
  title: string;
  skills: string[];
};

type itemTypes = string | (string | string[])[];
type base = Record<string, itemTypes>;
type resume = {
  backups: Record<string, base | itemTypes>;
  personal: personal;
  experience: {
    work: workItem[];
    other: otherItem[];
  };
  professionalSkills: skillsItem[];
  education: educationItem[];
};

declare module 'console' {
  export = typeof import('console');
}
