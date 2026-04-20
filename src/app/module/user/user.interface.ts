

export enum UserRole {
  ADMIN = 'ADMIN',
  SETTER = 'SETTER',
  CLOSER = 'CLOSER',
  INSTALLER = 'INSTALLER',
  CLIENT = 'CLIENT',
  LEADER = 'LEADER' 
}


export interface IUser {
   id: string,
   orgId: string,
   email: string;
   role: UserRole;
   profile:{
      firstName: string;
      lastName: string;
      avatarUrl?: string;
      phoneNumber: string;
   };
   onboarding: {
    isCompleted: boolean;
    currentStep: number;
    checklistItems: string[];
   };
   gamification:{
    xp: number;
    level: number;
    badges: string[];
    streakDays: number;

   };
   downline:{
    uplineId: string | null;      
    referralCode: string;
    level: number;                
    childrenIds: string[];
   };

}