import { ArticleType } from 'web-components/src/components/cards/ArticleCard/ArticleCard.types';

export const DRAFT_TEXT = 'Draft';
export const ARTICLE_CARD_BTN_TEXT_MAPPING: Record<ArticleType, string> = {
  video: 'watch video',
  article: 'read article',
  podcast: 'listen to podcast',
};
