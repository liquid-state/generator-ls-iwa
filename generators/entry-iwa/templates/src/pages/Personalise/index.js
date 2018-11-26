import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  ContentPadding,
} from '@project/common';
import { personalisationSubmitted } from '../../redux/actions/registration';
import { personalise } from '../../assets';
import Form from './Form';

export const Personalise = ({ onSubmit }) => (
  <Container fixed noPadding className="onboarding">
    <img src={personalise} alt="" />
    <ContentPadding>
      <h1>Tell us about yourself</h1>
      <p>
        Help us personalise the content in this app by answering the following questions.
      </p>
      <Form onSubmit={onSubmit} />
    </ContentPadding>
  </Container>
);

Personalise.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default connect(null, { onSubmit: personalisationSubmitted })(Personalise);
