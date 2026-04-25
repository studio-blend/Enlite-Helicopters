import { groq } from "next-sanity";

export const allHelicoptersQuery = groq`
  *[_type == "product" && status == "production"] {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    category,
    "image": image.asset->url,
    "gallery": gallery[].asset->url,
    specs,
    features,
    status,
    price
  } | order(name asc)
`;

export const helicopterBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    category,
    "image": image.asset->url,
    "gallery": gallery[].asset->url,
    specs,
    features,
    status,
    price
  }
`;

export const allArticlesQuery = groq`
  *[_type == "article"] {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "image": image.asset->url,
    "category": category->name,
    tags,
    author {
      name,
      "avatar": avatar.asset->url,
      role
    },
    publishedAt,
    readingTime,
    featured,
    externalLink
  } | order(publishedAt desc)
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "image": image.asset->url,
    "category": category->name,
    tags,
    author {
      name,
      "avatar": avatar.asset->url,
      role
    },
    publishedAt,
    readingTime,
    featured,
    externalLink
  }
`;

export const allCareersQuery = groq`
  *[_type == "career"] {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    department,
    location,
    type,
    description,
    requirements,
    postedAt,
    closingDate
  } | order(postedAt desc)
`;

export const allGalleryItemsQuery = groq`
  *[_type == "gallery"] {
    _id,
    "id": _id,
    title,
    description,
    "image": image.asset->url,
    category,
    date
  } | order(date desc)
`;

export const allTeamMembersQuery = groq`
  *[_type == "team"] {
    _id,
    "id": _id,
    name,
    role,
    "image": image.asset->url,
    bio,
    order
  } | order(order asc)
`;

export const allPartnersQuery = groq`
  *[_type == "partner"] {
    _id,
    "id": _id,
    name,
    "logo": logo.asset->url,
    url,
    order
  } | order(order asc)
`;

export const siteSettingsQuery = groq`
  *[_type == "settings"][0] {
    siteName,
    description,
    "logo": logo.asset->url,
    email,
    phone,
    address,
    social
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroTitle,
    heroSubtitle,
    heroDescription,
    "heroImage": heroImage.asset->url,
    solutionTitle,
    solutionDescription,
    "solutionImage": solutionImage.asset->url,
    stats
  }
`;
