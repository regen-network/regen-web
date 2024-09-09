import { DRAFT_TEXT } from 'lib/constants/shared.constants';
import { TranslatorType } from 'lib/i18n/i18n.types';

type Props = { _: TranslatorType };

export const getDefaultProject = ({ _ }: Props) => ({
  name: '',
  imgSrc: '/jpg/default-project.jpg',
  place: '',
  area: 0,
  areaUnit: 'ha',
  draftText: _(DRAFT_TEXT),
});
