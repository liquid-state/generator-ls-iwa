/** Index for building this IWA as a library to be included in "Desktop" style applications.
You should export from here everything needed to use this iwa (root component, root reducer etc)
But not the actual IWA setup code (eg index.js) which causes rendering.
*/

import Index from './pages';
import reducer from './redux/reducers';
import saga from './redux/sagas';

export default Index;
export {
  reducer,
  saga
};
