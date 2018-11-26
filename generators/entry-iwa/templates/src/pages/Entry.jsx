import React from 'react';
import { loading } from '../assets';

export default () => (
  <div className="entry-page">
    <div className="vials-wrapper">
      {/* Must use an object tag for an animated svg loading indicator */}
      {/* <object type="image/svg+xml" data={loading} alt="loading indicator">loading</object> */}
      <img src={loading} alt="loading indicator"></img>
    </div>
  </div>
);
