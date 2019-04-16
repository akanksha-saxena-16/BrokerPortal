export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number; 
    refresh_token: string; 
    UserName: string; 
    IsDemoUnderwriter: boolean; 
    ID: number; 
    IsValid: boolean; 
    UserTypeId: number; 
    IsValidUser: boolean; 
    IsLocked: boolean; 
    error: string; 
    error_description: string;  
  }