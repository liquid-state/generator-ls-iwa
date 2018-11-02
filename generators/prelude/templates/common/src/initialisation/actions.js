export const INITIALISE = 'INITIALISE';
export const INITIALISATION_BEGUN = 'INITIALISATION_BEGUN';
export const INITIALISATION_COMPLETE = 'INITIALISATION_COMPLETE';

export const initialise = () => ({
  type: INITIALISE,
  payload: {},
});

export const initialisationBegun = () => ({
  type: INITIALISATION_BEGUN,
  payload: {},
});

export const initialisationComplete = () => ({
  type: INITIALISATION_COMPLETE,
  payload: {},
});
