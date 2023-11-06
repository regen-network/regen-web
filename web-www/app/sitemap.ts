import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.regen.network/',
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.regen.network/buyers',
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.regen.network/media',
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://www.regen.network/resources',
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://www.regen.network/faq',
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.regen.network/contact',
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://www.regen.network/press-kit',
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: 'https://www.regen.network/privacy-policy',
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://www.regen.network/terms-service',
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ];
}
