export enum Role {
  TeamCaptain = "TeamCaptain",
  Admin = "Admin",
  Member = "Member"
}

export interface User {
  id: string;
  first: string;
  last: string;
  email: string;
  role: Role;
}

export type UserPartial = Partial<User>; 

export interface Team {
  id: string;
  title: string;
  location: string;
  captain: User;

  // Optional
  members?: User[];
}

export interface Hackathon {
  id: string;
  name: string;
  slug: string;
  startDate: number;
  endDate: number;
  admin: User;

  // Optional
  teams?: Team[];
}