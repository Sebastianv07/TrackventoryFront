import { Form } from "./form";
import { Profile } from "./profile";

export interface Permission {
    profilePms: Profile;
    form_pms: Form;
    C: boolean;
    R: boolean;
    U: boolean;
    D: boolean;
  }
  