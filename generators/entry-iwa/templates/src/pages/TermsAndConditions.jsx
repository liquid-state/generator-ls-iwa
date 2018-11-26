import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@liquid-state/ui-kit';
import {
  Container,
  ContentPadding,
} from '@project/common';
import { touAccepted } from '../redux/actions/registration';
import { terms } from '../assets';

const TermsAndConditions = ({ onAgree }) => (
  <Container fixed noPadding className="toc">
    <img src={terms} alt="" />
    <ContentPadding>
      <h1>Terms and Conditions</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan ornare justo,
        et commodo eros dignissim nec. Cras ut diam vitae lectus dapibus bibendum eget vitae eros.
        Fusce accumsan maximus tellus, et tincidunt purus accumsan ut. Nulla dui nisi, facilisis
        cursus lacus eu, tincidunt commodo justo. Mauris aliquam, neque non maximus malesuada, ante
        urna porttitor sapien, ut dapibus sapien mauris sed ex. Nulla consequat sapien orci, id
        porttitor nulla cursus in. Aenean nec dolor odio. Quisque vel enim pharetra, fermentum
        justo at, rutrum orci. Nam eget massa tincidunt, scelerisque magna non, ornare nulla.
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum et tellus nunc.
        Sed orci libero, varius at fermentum rutrum, bibendum nec odio. Donec nibh tellus, semper
        eget sem ut, fermentum aliquam lorem. Pellentesque felis enim, laoreet vel pellentesque
        quis, varius nec tellus. Suspendisse ullamcorper justo vel elit ornare mattis.
        Cras tortor augue, scelerisque eu malesuada et, interdum eget nulla.
      </p>

      <p>
        Sed in arcu libero. Nullam ut ullamcorper magna, eu semper tellus. Proin id tempor nisl.
        Suspendisse vitae imperdiet lectus, rhoncus convallis risus. Vestibulum mollis eros
        tincidunt nibh faucibus, malesuada efficitur elit imperdiet. Morbi aliquam malesuada
        malesuada. Morbi a placerat neque, vel ultricies tellus. Ut id condimentum eros.
        Morbi condimentum ultricies cursus. Pellentesque leo tortor, condimentum nec fermentum
        auctor, vulputate et odio.
      </p>

      <p>
        In pretium facilisis cursus. Praesent et nisi leo. Praesent venenatis egestas lorem,
        eget facilisis turpis ornare id. Vivamus luctus mattis mollis. Maecenas mi sapien,
        tempor sed augue non, rutrum fringilla lacus. Praesent gravida pharetra magna ac
        luctus. Nulla magna neque, consectetur scelerisque rutrum vitae, aliquam eget lacus.
      </p>

      <div className="agree">
        <Button type="primary" onClick={onAgree}>I agree</Button>
      </div>
    </ContentPadding>
  </Container>
);

TermsAndConditions.propTypes = {
  onAgree: PropTypes.func.isRequired,
};

export {
  TermsAndConditions,
};

export default connect(null, { onAgree: touAccepted })(TermsAndConditions);
