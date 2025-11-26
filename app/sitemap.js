import { personalData } from '@/utils/data/personal-data';

export default function sitemap() {
  const baseUrl = 'https://hassanbinwaqar.codes';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
}
