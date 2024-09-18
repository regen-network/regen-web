import { projectCardBodyTextMapping } from '../ProjectCard/ProjectCard.mock';

/* eslint-disable lingui/no-unlocalized-strings */
export const orderSummaryCommonProps = {
  title: 'Order Summary',
  headers: {
    project: 'project',
    pricePerCredit: 'price per Credit',
    credits: '# credits',
    totalPrice: 'total Price',
    payment: 'payment',
  },
  ariaLabels: {
    editableCredits: 'Editable credits',
    changePaymentCard: 'Change payment card',
    editButtonAriaLabel: 'Edit',
  },
  editableUpdateButtonText: 'update',
  endingInText: 'ending in',
  imageAltText: 'order summary',
  bodyTexts: projectCardBodyTextMapping,
};
