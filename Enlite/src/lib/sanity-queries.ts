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
    "videoUrl": coalesce(video.asset->url, videoUrl),
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
  *[_id == "settings"][0] {
    siteName,
    description,
    "logo": select(defined(logo.asset) => logo.asset->url, null),
    email,
    phone,
    address,
    social
  }
`;

export const homePageQuery = groq`
  *[_id == "homePage"][0] {
    heroTitle,
    heroSubtitle,
    heroDescription,
    "heroImageLight": select(defined(heroImageLight.asset) => heroImageLight.asset->url, heroImageLight),
    "heroImageDark": select(defined(heroImageDark.asset) => heroImageDark.asset->url, heroImageDark),
    stats,
    featuresTitle,
    features[] {
      title,
      description,
      "image": select(defined(image.asset) => image.asset->url, image)
    },
    solutionTitle,
    solutionDescription,
    "solutionImage": select(defined(solutionImage.asset) => solutionImage.asset->url, solutionImage),
    "solutionVideoUrl": coalesce(solutionVideo.asset->url, solutionVideoUrl),
    solutionTags,
    missionTitle,
    missionSubtitle,
    missionDescription,
    missionVideoUrl,
    "missionThumbnail": select(defined(missionThumbnail.asset) => missionThumbnail.asset->url, missionThumbnail),
    aircraftTitle,
    aircraftDescription,
    "aircraftImage": select(defined(aircraftImage.asset) => aircraftImage.asset->url, aircraftImage),
    aircraftFeatures,
    testingTitle,
    testingDescription,
    testingVideos[] {
      title,
      subtitle,
      videoUrl,
      "thumbnail": select(defined(thumbnail.asset) => thumbnail.asset->url, thumbnail)
    },
    rangeTitle,
    rangeDescription,
    rangeBullets
  }
`;

export const aboutPageQuery = groq`
  *[_id == "aboutPage"][0] {
    title,
    subtitle,
    videoTitle,
    videoSubtitle,
    videoDescription,
    videoUrl,
    "videoThumbnail": select(defined(videoThumbnail.asset) => videoThumbnail.asset->url, videoThumbnail),
    stats,
    sections[] {
      title,
      highlightText,
      content,
      "image": select(defined(image.asset) => image.asset->url, image),
      "videoUrl": coalesce(video.asset->url, videoUrl),
      badge,
      reverse
    },
    values[] {
      title,
      description,
      "image": select(defined(image.asset) => image.asset->url, null)
    }
  }
`;

export const investorPageQuery = groq`
  *[_id == "investorPage"][0] {
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

