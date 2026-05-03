

export interface IOrganization {
  name: string;
  admin: string; 
  users: string[]; 
  branding?: {
    logo?: string;
    primaryColor?: string;
  };
 
}