import React from 'react';
import {
  Container,
  ContentPadding,
  PinnedToBottom,
  NavButton,
  Link,
} from '@project/common';
import { welcome } from '../assets';

export default () => (
  <Container fixed noPadding className="onboarding">
    <img src={welcome} alt="" />
    <ContentPadding>
      <h1>Welcome message</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus pretium mauris,
        a sollicitudin justo rhoncus convallis. Nam vulputate nulla sem, vitae dictum dolor
        sagittis vitae. Cras ultricies tempor lorem, quis pharetra odio.
        Proin at augue diam. Nullam mi neque, sollicitudin at dolor non, fermentum pretium sapien.
      </p>
      <PinnedToBottom>
        <Link to="/registration/value">
          <NavButton stretched type="primary">ok, let&apos;s proceed</NavButton>
        </Link>
        <span className="existing-account-link">
          <Link to="/login" replace>I already have an account</Link>
        </span>
      </PinnedToBottom>
    </ContentPadding>
  </Container>
);
