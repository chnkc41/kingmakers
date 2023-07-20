export const APP_ROOT = 'https://json-server-vercel-sigma-lake.vercel.app/campaign';

export const URLS = {
  URL_CAMPAIGN: `${APP_ROOT}/campaign`
};

export const GLOBAL_VIEW_STATES = {
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

export const CAMPAIGN_TITLE_LIST = ['Name', 'Start date', 'End date', 'Budget', 'Status'];

export const STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
}
