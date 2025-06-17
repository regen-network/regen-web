import { DRAFT_TEXT } from 'lib/constants/shared.constants';
import { TranslatorType } from 'lib/i18n/i18n.types';

import defaultProject from '../../../../public/jpg/default-project.jpg';

type Props = { _: TranslatorType };

export const getDefaultProject = ({ _ }: Props) => ({
  name: '',
  imgSrc: defaultProject.src,
  place: '',
  area: 0,
  areaUnit: 'ha',
  draftText: _(DRAFT_TEXT),
});
