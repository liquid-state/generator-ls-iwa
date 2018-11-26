import React from 'react';
import { vials } from '../assets';

export default () => (
  <div className="entry-page">
    <div className="vials-wrapper">
      <object type="image/svg+xml" data={vials} alt="loading indicator">loading</object>
    </div>
  </div>
);
