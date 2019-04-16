import { BaseModel } from '../base.model';

export interface UserDTO extends BaseModel {
  UserName: String;
  Password: String;
  LoginDateTime: Date;
  LastLogin: Date;
  IsLocked: Boolean;
  LoginAttempt: Number;
  IPAddress: String;
  IsDemoUnderwriter: Boolean;
  UserTypeId: Number;
  Email: String;
  IsActive: Boolean;
  PasswordHash: String;
  LockoutEnabled: Boolean;
  LockoutEndDateUtc: Date;
  BrokerBranchId: Number;
  AccessFailedCount: Number;
  Source: String;
  FirstName: String;
  LastName: String;
  PhoneNo: String;
  AddressLine1: String;
  AddressLine2: String;
  PostCode: String;
  Suburb: String;
  State: String;
  City: String;
  RoleID: number;
  BrokerID: number;
}
