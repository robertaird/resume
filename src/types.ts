export type personal = {
  firstName: string;
  lastName: string;
  title: string;
  contact: string[][];
  about: string[];
};

export type position = {
  title: string;
  accomplishments: ({ tag: string; description: string } | string | string[])[];
  dates?: string;
  description?: string;
};

export type workItem = {
  company: {
    name: string;
    location: string;
    dates: string;
  };
  description?: string;
  positions: position[];
};

export type otherItem =
  | string
  | {
      description: string;
      date: string;
    };

export type educationItem = {
  location: string;
  program: string;
  description: string;
  date: string;
};

export type skillsItem = {
  title: string;
  skills: string[];
};

export type experience = {
  work: workItem[];
  other: otherItem[];
};
export type itemTypes = string | (string | string[])[];
export type base = Record<string, itemTypes>;
export type resume = {
  backups: Record<string, base | itemTypes>;
  personal: personal;
  experience: experience;
  professionalSkills: skillsItem[];
  education: educationItem[];
};
