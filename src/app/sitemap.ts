import type { MetadataRoute } from 'next'
import { blogContent } from '@/content/blog'
import { caseStudiesContent } from '@/content/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hyniva.com'

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/about-us',
    '/aira',
    '/careers',
    '/claim-pioneer',
    '/contact',
    '/finxserve',
    '/hyper',
    '/industries',
    '/industries/banking',
    '/industries/education',
    '/industries/insurance',
    '/industries/transportation-logistics',
    '/industries/wealth-asset-management',
    '/insights',
    '/insights/blogs',
    '/insights/case-studies',
    '/insights/news',
    '/insights/podcast',
    '/privacy-policy',
    '/products/aira',
    '/products/claim-pioneer',
    '/products/finxserve',
    '/products/hyper',
    '/services',
    '/services/digital-transformation',
    '/services/digital-transformation/applied-ai',
    '/services/digital-transformation/cloud-migration',
    '/services/digital-transformation/data-intelligence',
    '/services/enterprise-platforms',
    '/services/enterprise-platforms/aws-cloud-services',
    '/services/enterprise-platforms/microsoft-services',
    '/services/enterprise-platforms/salesforce',
    '/services/it-strategy',
    '/services/product-development',
    '/services/product-engineering',
    '/services/strategy-consulting',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const postRoutes = blogContent.posts.map((post) => ({
    url: `${baseUrl}${post.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const caseStudyRoutes = caseStudiesContent.studies.map((study) => ({
    url: `${baseUrl}${study.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes, ...caseStudyRoutes]
}
