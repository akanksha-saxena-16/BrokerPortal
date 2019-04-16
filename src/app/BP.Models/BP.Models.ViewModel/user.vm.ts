import { UserDTO } from '../BP.Models.DTO/user.dto';

export interface UserVM extends UserDTO  {
  ConfirmPassword: String;
}
