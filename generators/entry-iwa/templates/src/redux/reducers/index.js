import { initialisation } from '@project/common';
import registration from './registration';
import passwordReset from './password-reset';
import login from './login';

export default {
  initialisation: initialisation.reducer,
  registration,
  passwordReset,
  login,
};
