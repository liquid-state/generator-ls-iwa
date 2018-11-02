import {
  INITIALISATION_BEGUN,
  INITIALISATION_COMPLETE,
} from './actions';

export default (state = 'INITIAL', { type }) => {
  switch (type) {
    case INITIALISATION_BEGUN:
      return 'IN_PROGRESS';
    case INITIALISATION_COMPLETE:
      return 'COMPLETE';
    default:
      return state;
  }
};

export const initialisationIsComplete = state => state === 'COMPLETE';
export const initialisationInProgress = state => state === 'IN_PROGRESS';
