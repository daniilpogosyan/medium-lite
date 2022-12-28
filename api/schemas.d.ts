interface WithId {
  id: string
}

export interface LeanPost {
  title: string;
  content: string;
  authorId: string;
}

export interface LeanUser {
  passwordHash: string;
  email: string;
}

export type Post = LeanPost & WithId;
export type User = LeanUser & WithId;

// ??? Ok, but extra (lean) types suck