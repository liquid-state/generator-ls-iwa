import React from 'react';
import {
  Container,
  ContentPadding,
  PinnedToBottom,
  NavButton,
  Link,
} from '@project/common';
import { value } from '../assets';

export default () => (
  <Container fixed noPadding className="onboarding">
    <img src={value} alt="" />
    <ContentPadding>
      <h1>Explain the value</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus pretium mauris,
        a sollicitudin justo rhoncus convallis. Nam vulputate nulla sem, vitae dictum dolor
        sagittis vitae. Cras ultricies tempor lorem, quis pharetra odio.
        Proin at augue diam. Nullam mi neque, sollicitudin at dolor non, fermentum pretium sapien.
      </p>
      <PinnedToBottom>
        <Link to="/registration/personalise">
          <NavButton stretched type="primary">Sounds good</NavButton>
        </Link>
      </PinnedToBottom>
    </ContentPadding>
  </Container>
);
