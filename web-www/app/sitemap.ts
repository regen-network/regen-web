import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.regen.network/',
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.regen.network/buyers',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.regen.network/media',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.regen.network/resources',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.regen.network/faq',
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://www.regen.network/contact',
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://www.regen.network/press-kit',
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://www.regen.network/privacy-policy',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.regen.network/terms-service',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
