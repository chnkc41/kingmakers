export const APP_ROOT = 'http://localhost:3010';

export const urls = {
  URL_CAMPAIGN: `${APP_ROOT}/campaign`
};

export const globalViewStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  DONE: 'DONE',
  REDIRECT: 'REDIRECT'
};

export const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
};

export const CONTROL_SIZES = {
  [SIZES.XS]: 7,
  [SIZES.SM]: 9,
  [SIZES.MD]: 11,
  [SIZES.LG]: 14,
  [SIZES.XL]: 17
};

export const campaignTitleList = ['Name', 'Start date', 'End date', 'Budget', 'Status'];
