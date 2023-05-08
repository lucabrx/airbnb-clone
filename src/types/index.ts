import { User } from "@prisma/client";
// cant pass date 
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" 
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};