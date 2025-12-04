export interface NavItem {
  label: string;
  path: string;
}

export interface FacultyMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ClassInfo {
  grade: string;
  description: string;
  subjects: string[];
}

export interface Testimonial {
  name: string;
  text: string;
  role: string;
}
