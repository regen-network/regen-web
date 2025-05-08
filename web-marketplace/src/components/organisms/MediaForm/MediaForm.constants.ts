import { msg } from '@lingui/core/macro';

export const PHOTO_COUNT = 4;
export const cropAspectMediaForm = { aspect: 322 / 211 }; // px values pulled from mockups (width / height)
export const MAIN_PHOTO = msg`Main photo`;
export const MAIN_PHOTO_DESCRIPTION = msg`Choose the photo that will show at the top of the project page and in project preview cards.`;
export const STORY_PHOTO = msg`Story photo`;
export const GALLERY_PHOTOS = msg`Gallery photos`;
export const GALLERY_PHOTOS_DESCRIPTION = msg`Choose 2-10 photos for the photo gallery.`;
export const GALLERY_PHOTOS_MIN = 2;
export const GALLERY_PHOTOS_MAX = 10;
export const CAPTION_CHART_LIMIT = 240;
export const DEFAULT = 'default';
export const MIN_PHOTOS_ERROR_MESSAGE = msg`You must add at least ${GALLERY_PHOTOS_MIN} photos to the photo gallery.`;
export const MAX_PHOTOS_ERROR_MESSAGE = msg`You must add at most ${GALLERY_PHOTOS_MAX} photos to the photo gallery.`;
export const CAPTION_LIMIT_ERROR_MESSAGE = msg`The caption message must be under ${CAPTION_CHART_LIMIT} characters.`;
export const STORY_LABEL = msg`Story video or photo`;
export const IMAGE_UPLOAD_BUTTON_LABEL = msg`+ Add Photo`;
export const PROJECTS_S3_PATH = 'projects';
export const VIDEO_INPUT_HELPER_TEXT = msg`Copy and paste an embeddable video url. Supported types include: YouTube, Facebook, Vimeo, Twitch, and DailyMotion.`;
export const VIDEO_INPUT_HELPER_LINK_TEXT = msg`View the complete list of support videos»`;
export const VIDEO_URL_NOT_VALID = msg`This is not a valid video url`;
export const VIDEO_URL_PLACEHOLDER = msg`Add video url`;
export const VIDEO_PLAYER_LOADING = msg`Loading video player...`;
