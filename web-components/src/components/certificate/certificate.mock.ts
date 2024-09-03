/* eslint-disable lingui/no-unlocalized-strings */
export const certificateMock = {
  date: '10-10-2020',
  txHash: { text: '321899...898123', href: '#' },
  certificateTitle: 'Carbon Offset Retirement Certificate',
  creditsUnits: 205,
  equivalentTonsCO2: 205,
  itemLinks: [
    {
      name: 'Project',
      link: {
        text: 'King County Urban Forest Carbon Projects',
        href: '#',
      },
    },
    {
      name: 'Credit class',
      link: {
        text: 'City Forest Credits',
        href: '#',
      },
    },
    {
      name: 'Retired by',
      link: {
        text: 'Dr. Mary Smith',
        href: '#',
      },
    },
  ],
  retirementReason: 'For a better future for my children',
  retirementLocation: 'Denver, Colorado, United States',
};

export const certificateLabels = {
  TX_HASH: 'Blockchain record',
  EQUIVALENT_TO: 'Equivalent to',
  CREDIT_UNIT: 'ton',
  CREDIT_UNIT_SUFFIX: 'of CO2e',
  NUMBER_OF_CREDITS: 'Number of credits',
  PROJECT: 'Project',
  CREDIT_CLASS: 'Credit class',
  RETIRED_BY: 'Retired by',
  RETIREMENT_REASON: 'Retirement reason',
  RETIREMENT_LOCATION: 'Retirement location',
};
