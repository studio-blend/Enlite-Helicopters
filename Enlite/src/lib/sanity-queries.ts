import { groq } from "next-sanity";

export const allHelicoptersQuery = groq`
  *[_type == "product"] {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    category,
    "image": select(defined(image.asset) => image.asset->url, externalImageUrl),
    "gallery": select(defined(gallery) => gallery[].asset->url, externalGalleryUrls),
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
    "image": select(defined(image.asset) => image.asset->url, externalImageUrl),
    "gallery": select(defined(gallery) => gallery[].asset->url, externalGalleryUrls),
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
    "image": select(defined(image.asset) => image.asset->url, externalImageUrl),
    "category": category->name,
    tags,
    author {
      name,
      "avatar": select(defined(avatar.asset) => avatar.asset->url, null),
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
    "image": select(defined(image.asset) => image.asset->url, externalImageUrl),
    "category": category->name,
    tags,
    author {
      name,
      "avatar": select(defined(avatar.asset) => avatar.asset->url, null),
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
    "image": select(defined(image.asset) => image.asset->url, externalImageUrl),
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
    "image": select(defined(image.asset) => image.asset->url, externalImageUrl),
    bio,
    order
  } | order(order asc)
`;

export const allPartnersQuery = groq`
  *[_type == "partner"] {
    _id,
    "id": _id,
    name,
    "logo": select(defined(logo.asset) => logo.asset->url, externalLogoUrl),
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
    "heroImageLight": heroImageLight.asset->url,
    "heroImageDark": heroImageDark.asset->url,
    stats,
    featuresTitle,
    features[] {
      title,
      description,
      "image": image.asset->url
    },
    solutionTitle,
    solutionDescription,
    "solutionImage": solutionImage.asset->url,
    "solutionVideoUrl": solutionVideo.asset->url,
    solutionTags,
    missionTitle,
    missionSubtitle,
    missionDescription,
    missionVideoUrl,
    "missionThumbnail": missionThumbnail.asset->url,
    aircraftTitle,
    aircraftDescription,
    "aircraftImage": aircraftImage.asset->url,
    aircraftFeatures,
    testingTitle,
    testingDescription,
    testingVideos[] {
      title,
      subtitle,
      videoUrl,
      "thumbnail": thumbnail.asset->url
    },
    rangeTitle,
    rangeDescription,
    rangeBullets
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    title,
    subtitle,
    videoTitle,
    videoSubtitle,
    videoDescription,
    videoUrl,
    "videoThumbnail": videoThumbnail.asset->url,
    stats,
    sections[] {
      title,
      highlightText,
      content,
      "image": image.asset->url,
      "videoUrl": video.asset->url,
      badge,
      reverse
    },
    values[] {
      title,
      description,
      "image": image.asset->url
    }
  }
`;

export const investorPageQuery = groq`
  *[_type == "investorPage"][0] {
    title,
    subtitle,
    partnerSection {
      title,
      highlightText,
      content
    },
    formTitle,
    formDescription
  }
`;

export const allMarketsQuery = groq`
  *[_type == "marketPage"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    heroSubtitle,
    themeVariant,
    "heroImage": select(defined(heroImage.asset) => heroImage.asset->url, externalHeroImageUrl),
    seoDescription
  }
`;

export const marketBySlugQuery = groq`
  *[_type == "marketPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    category,
    themeVariant,
    seoDescription,
    "heroImage": select(defined(heroImage.asset) => heroImage.asset->url, externalHeroImageUrl),
    "heroVideoUrl": heroVideo.asset->url,
    heroHeadline,
    heroHeadlineHighlight,
    heroSubtitle,
    heroCtaText,
    contextTitle,
    contextTitleHighlight,
    contextParagraphs,
    "contextImage": contextImage.asset->url,
    capabilitiesTitle,
    capabilities[] {
      title,
      description,
      icon
    },
    ctaTitle,
    ctaDescription,
    ctaButtonText
  }
`;

