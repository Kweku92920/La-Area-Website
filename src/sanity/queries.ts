import { groq, type PortableTextBlock } from 'next-sanity';

export type Leader = {
  _id: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  photo: string | null;
  photoAlt: string;
  order: number | null;
  gallery: MinistryLeaderImage[];
  documents: MinistryLeaderDocument[];
};
export const leadersQuery = groq`*[_type=="leader"] | order(order asc){
  _id, "name": coalesce(name, "Unnamed leader"), "role": coalesce(role, "Leader"),
  "location": coalesce(location, ""),
  "bio": coalesce(bio, ""),
  "photo": photo.asset->url,
  "photoAlt": coalesce(photo.alt, name, "Leader photo"),
  "gallery": gallery[]{..., "url": asset->url, "alt": coalesce(alt, caption, "Leader gallery image"), caption},
  "documents": documents[]{..., "url": asset->url, "title": coalesce(title, "Document"), description},
  "order": order
}`;

export type DirectoryAssembly = {
  id: string;
  name: string;
  district: string;
  location: string;
  pastor: string;
  time: string;
  image: string | null;
  imageAlt?: string;
  phone?: string | null;
  email?: string | null;
  serviceTimes?: string[] | null;
  districtDetails?: {
    name: string;
    slug: string | null;
    description: string | null;
    order: number | null;
    pastor: Leader | null;
    image: string | null;
    imageAlt: string;
  } | null;
};
export type DirectoryDistrict = { name: string; minister: string | null; ministerProfile?: Leader | null };
export const directoryQuery = groq`{
  "assemblies": *[_type=="assembly" && defined(district)] | order(name asc){
    "id": coalesce(slug.current, _id), "name": coalesce(name, "Unnamed assembly"), "district": coalesce(district->name, "Unassigned"),
    "location": coalesce(location, ""), "pastor": coalesce(pastor, ""),
    "time": coalesce(serviceTimes[0], "Sunday Worship – 9:00 AM"),
    "image": image.asset->url, "imageAlt": coalesce(image.alt, name, "Assembly photo"), phone, email,
    "serviceTimes": serviceTimes,
    "districtDetails": district->{
      "name": coalesce(name, "Unassigned district"), "slug": slug.current, description, order,
      "pastor": pastor->{_id, name, role, location, bio, "photo": photo.asset->url, "photoAlt": coalesce(photo.alt, name, "Leader photo"), order},
      "image": image.asset->url, "imageAlt": coalesce(image.alt, name, "District photo")
    }
  },
  "districts": *[_type=="district"] | order(name asc){"name": coalesce(name, "Unnamed district"), "minister": pastor->name,
    "ministerProfile": pastor->{_id, name, role, location, bio, "photo": photo.asset->url, "photoAlt": coalesce(photo.alt, name, "Leader photo"), order}
  }
}`;

export type AssemblyDetail = {
  id: string;
  name: string;
  district: string;
  districtMinister: string | null;
  location: string;
  pastor: string;
  time: string[] | null;
  phone?: string;
  email?: string;
  serviceTimes?: string[] | null;
  image?: string | null;
  imageAlt?: string;
  districtDetails?: DirectoryAssembly['districtDetails'];
};
export const assemblyBySlugQuery = groq`*[_type=="assembly" && slug.current==$id][0]{
  "id": coalesce(slug.current, _id), "name": coalesce(name, "Unnamed assembly"), "district": coalesce(district->name, ""),
  "districtMinister": district->pastor->name,
  "location": coalesce(location, ""), "pastor": coalesce(pastor, ""),
  "time": serviceTimes, "serviceTimes": serviceTimes, phone, email,
  "image": image.asset->url, "imageAlt": coalesce(image.alt, name, "Assembly photo"),
  "districtDetails": district->{"name": name, "slug": slug.current, description, order,
    "pastor": pastor->{_id, name, role, location, bio, "photo": photo.asset->url, "photoAlt": coalesce(photo.alt, name, "Leader photo"), order},
    "image": image.asset->url, "imageAlt": coalesce(image.alt, name, "District photo")}
}`;
export const assemblySlugsQuery = groq`*[_type=="assembly" && defined(slug.current)]{"id": slug.current}`;

export type DistrictItem = {
  name: string;
  pastor: string | null;
  image: string | null;
  assemblies: { slug: string; name: string }[];
  slug?: string | null;
  description?: string | null;
  order?: number | null;
  imageAlt?: string;
  pastorProfile?: Leader | null;
};
export const districtsQuery = groq`*[_type=="district"] | order(name asc){
  "name": coalesce(name, "Unnamed district"), "slug": slug.current, description, order,
  "pastor": pastor->name, "pastorProfile": pastor->{_id, name, role, location, bio, "photo": photo.asset->url, "photoAlt": coalesce(photo.alt, name, "Leader photo"), order},
  "image": image.asset->url, "imageAlt": coalesce(image.alt, name, "District photo"),
  "assemblies": *[_type=="assembly" && references(^._id)] | order(name asc){"slug": coalesce(slug.current, _id), "name": coalesce(name, "Unnamed assembly")}
}`;

export type MinistryItem = {
  id: string;
  slug?: string | null;
  title: string;
  sector: string;
  description: string;
  icon?: string;
  image: string | null;
  imageAlt?: string;
  heroImage?: string | null;
  heroImageAlt?: string;
  gallery?: GalleryPhotoItem[];
  body?: PortableTextBlock[] | null;
  leaders: MinistryInlineLeader[];
  leadershipByCategory: MinistryCategoryLeadership | null;
};
export type MinistryLeaderProfile = {
  name: string;
  role: string;
  location: string;
  bio: string;
  photo: MinistryLeaderImage | null;
  gallery: MinistryLeaderImage[];
  documents: MinistryLeaderDocument[];
};
export type MinistryInlineLeader = {
  _key?: string;
  name: string;
  title: string;
  bio: string;
  image: MinistryLeaderImage | null;
  order: number | null;
};
export type MinistryLeaderImage = {
  url: string | null;
  alt: string;
  caption?: string | null;
};
export type MinistryLeaderDocument = {
  url: string | null;
  title: string;
  description: string | null;
};
export type MinistryRoleProfile = {
  name: string;
  image: string | null;
};
export type MinistryRoleGroup = {
  leader: MinistryRoleProfile | null;
  assistantLeader: MinistryRoleProfile | null;
  secretary: MinistryRoleProfile | null;
};
export type MinistryCategoryLeadership = {
  women: MinistryRoleGroup | null;
  men: MinistryRoleGroup | null;
  children: MinistryRoleGroup | null;
  youth: MinistryRoleGroup | null;
};
export type MinistryLeadershipSet = {
  leaders: MinistryInlineLeader[];
  leadershipByCategory: MinistryCategoryLeadership | null;
};
export type MinistryDetailItem = MinistryItem & {
  heroImage: string | null;
  gallery: GalleryPhotoItem[];
  body: PortableTextBlock[] | null;
};
const ministryCategoryLeadershipProjection = `"leadershipByCategory": {
  "women": leadershipByCategory.women{
    "leader": leader{name, "image": image.asset->url},
    "assistantLeader": assistantLeader{name, "image": image.asset->url},
    "secretary": secretary{name, "image": image.asset->url}
  },
  "men": leadershipByCategory.men{
    "leader": leader{name, "image": image.asset->url},
    "assistantLeader": assistantLeader{name, "image": image.asset->url},
    "secretary": secretary{name, "image": image.asset->url}
  },
  "children": leadershipByCategory.children{
    "leader": leader{name, "image": image.asset->url},
    "assistantLeader": assistantLeader{name, "image": image.asset->url},
    "secretary": secretary{name, "image": image.asset->url}
  },
  "youth": leadershipByCategory.youth{
    "leader": leader{name, "image": image.asset->url},
    "assistantLeader": assistantLeader{name, "image": image.asset->url},
    "secretary": secretary{name, "image": image.asset->url}
  }
}`;
const ministryLeaderProjection = `"name": coalesce(name, "Unnamed leader"), "role": coalesce(role, "Leader"), "location": coalesce(location, ""),
  "bio": coalesce(bio, ""),
  "photo": photo{..., "url": asset->url, "alt": coalesce(alt, ^.name, "Leader photo")},
  "gallery": gallery[]{..., "url": asset->url, "alt": coalesce(alt, caption, "Leader gallery image"), caption},
  "documents": documents[]{..., "url": asset->url, "title": coalesce(title, "Document"), description}`;
const ministryInlineLeaderProjection = `
  _key,
  "name": coalesce(name, "Unnamed leader"),
  "title": coalesce(title, "Ministry leader"),
  "bio": coalesce(bio, ""),
  "image": image{..., "url": asset->url, "alt": coalesce(alt, ^.name, "Leader photo")},
  "order": order
`;
export const ministriesQuery = groq`*[_type=="ministry"] | order(order asc){
  "id": coalesce(slug.current, _id), "slug": slug.current, "title": coalesce(title, "Untitled ministry"), "sector": coalesce(sector, ""),
  "description": coalesce(description, ""),
  "icon": coalesce(icon, ""), "image": image.asset->url, "imageAlt": coalesce(image.alt, title, "Ministry image"),
  "heroImage": heroImage.asset->url, "heroImageAlt": coalesce(heroImage.alt, title, "Ministry hero image"),
  "gallery": gallery[defined(asset)]{"url": asset->url, "caption": coalesce(caption, ""), "alt": coalesce(alt, caption, "Ministry gallery image")},
  "body": body[]{...},
  "leaders": leaders[]{${ministryInlineLeaderProjection}},
  ${ministryCategoryLeadershipProjection}
}`;
export const ministryDetailQuery = groq`*[_type=="ministry" && slug.current==$id][0]{
  "id": coalesce(slug.current, _id), "slug": slug.current, "title": coalesce(title, "Untitled ministry"), "sector": coalesce(sector, ""),
  "description": coalesce(description, ""),
  "icon": coalesce(icon, ""), "image": image.asset->url, "imageAlt": coalesce(image.alt, title, "Ministry image"),
  "heroImage": heroImage.asset->url, "heroImageAlt": coalesce(heroImage.alt, title, "Ministry hero image"),
  "leaders": leaders[]{${ministryInlineLeaderProjection}},
  ${ministryCategoryLeadershipProjection},
  "gallery": gallery[defined(asset)]{"url": asset->url, "caption": coalesce(caption, ""), "alt": coalesce(alt, caption, "Ministry gallery image")},
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      "alt": coalesce(alt, caption, "Ministry image")
    },
    _type == "callout" => {
      ...,
      "title": coalesce(title, "Note"),
      "body": coalesce(body, ""),
      "tone": coalesce(tone, "info")
    }
  }
}`;
export const ministryLeadershipQuery = groq`*[_type=="ministry" && slug.current==$id][0]{
  "leaders": leaders[]{${ministryInlineLeaderProjection}},
  ${ministryCategoryLeadershipProjection}
}`;
export const ministryLeaderQuery = groq`*[_type=="ministry" && slug.current==$id][0].leaders[0]{
  ${ministryInlineLeaderProjection}
}`;
export const ministryLeadersQuery = groq`*[_type=="ministry"].leaders[]{
  ${ministryInlineLeaderProjection}
}`;

export type RawSermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  series: string;
  category: string;
  youtubeUrl: string;
  customThumb: string | null;
  thumbnailAlt?: string;
};
export const sermonsQuery = groq`*[_type=="sermon"] | order(date desc){
  "id": _id, "title": coalesce(title, "Untitled sermon"), "speaker": coalesce(speaker, "Speaker TBA"),
  "date": coalesce(date, ""), youtubeUrl,
  "duration": coalesce(duration, ""), "description": coalesce(description, ""),
  "series": coalesce(series, ""), "category": coalesce(category, "Teaching"),
  "customThumb": thumbnail.asset->url, "thumbnailAlt": coalesce(thumbnail.alt, title, "Sermon thumbnail")
}`;
export const latestSermonsQuery = groq`*[_type=="sermon"] | order(date desc)[0...3]{
  "id": _id, "title": coalesce(title, "Untitled sermon"), "speaker": coalesce(speaker, "Speaker TBA"),
  "date": coalesce(date, ""), "duration": coalesce(duration, ""), youtubeUrl,
  "customThumb": thumbnail.asset->url, "thumbnailAlt": coalesce(thumbnail.alt, title, "Sermon thumbnail")
}`;
export type HomeSermon = Pick<RawSermon, 'id' | 'title' | 'speaker' | 'date' | 'duration' | 'youtubeUrl' | 'customThumb'>;

export type HomeEvent = {
  title: string;
  slug?: string | null;
  startDate: string;
  endDate?: string | null;
  location: string | null;
  description?: string | null;
  featured?: boolean;
  image: string | null;
  imageAlt?: string;
};
export const nextEventQuery = groq`*[_type=="event" && startDate >= now()] | order(featured desc, startDate asc)[0]{
  "title": coalesce(title, "Upcoming event"), "slug": slug.current, startDate, endDate,
  "location": coalesce(location, ""), "description": coalesce(description, ""), featured,
  "image": image.asset->url, "imageAlt": coalesce(image.alt, title, "Event image")
}`;

export type SiteSettings = {
  title: string;
  tagline: string;
  heroHeading: string;
  heroText: string;
  heroImage: string | null;
  heroImageAlt?: string;
  logo: string | null;
  logoAlt?: string;
  address: string;
  phone: string;
  email: string;
  socials: { platform: string | null; url: string | null }[] | null;
};
export const siteSettingsQuery = groq`*[_type=="siteSettings"][0]{
  "title": coalesce(title, "The Church of Pentecost - LA Area"),
  "tagline": coalesce(tagline, "A Spirit-filled church serving the LA Area."),
  "heroHeading": coalesce(heroHeading, "The Church of Pentecost- La."),
  "heroText": coalesce(heroText, "The Church of Pentecost – La Area welcomes you to worship with us."),
  "heroImage": heroImage.asset->url, "heroImageAlt": coalesce(heroImage.alt, title, "Homepage hero image"),
  "logo": logo.asset->url, "logoAlt": coalesce(logo.alt, title, "Church logo"),
  "address": coalesce(address, "La Area Office, Accra, Ghana"),
  "phone": coalesce(phone, ""),
  "email": coalesce(email, "info@coplaarea.org"),
  socials[]{platform, url}
}`;

export type GalleryPhotoItem = { url: string; caption: string | null; alt?: string };
export const ministryGalleryQuery = groq`*[_type=="ministry" && slug.current==$id][0].gallery[defined(asset)]{
  "url": asset->url, "caption": coalesce(caption, ""), "alt": coalesce(alt, caption, "Ministry gallery image")
}`;

export type Scripture = {
  id: string;
  reference: string;
  text: string;
  translation: string;
  order: number | null;
  active: boolean;
};

export const scripturesQuery = groq`*[_type=="scripture" && coalesce(active, true)] | order(order asc, reference asc){
  "id": _id,
  "reference": coalesce(reference, "Scripture"),
  "text": coalesce(text, ""),
  "translation": coalesce(translation, "KJV"),
  "order": order, "active": coalesce(active, true)
}`;

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  image: {
    url: string;
    alt: string;
    lqip: string | null;
    width: number | null;
    height: number | null;
  };
};

export const galleryItemsQuery = groq`*[_type=="galleryItem" && defined(image.asset)] | order(date desc, _createdAt desc){
  "id": _id,
  "title": coalesce(title, "Untitled photo"),
  "category": coalesce(category, "Community"),
  "date": coalesce(date, ""),
  "image": image{
    "assetId": asset->_id,
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "alt": coalesce(alt, title, "Church community photo"),
    crop,
    hotspot
  }
}`;

export type NewsImage = {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width?: number; height?: number; aspectRatio?: number };
    };
  };
  alt: string;
  crop?: Record<string, unknown>;
  hotspot?: Record<string, unknown>;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  featured: boolean;
  featuredImage: NewsImage | null;
  body: PortableTextBlock[] | null;
};

const newsImageProjection = `{
  asset->{
    _id,
    url,
    metadata { lqip, dimensions { width, height, aspectRatio } }
  },
  "alt": coalesce(alt, "La Area church news"),
  crop,
  hotspot
}`;

const newsBodyProjection = `[]{
  _key,
  _type,
  style,
  children,
  markDefs,
  level,
  listItem,
  "asset": select(_type == "image" => asset->{_id, url, metadata { lqip, dimensions { width, height, aspectRatio } }}),
  "alt": select(_type == "image" => coalesce(alt, "Article image")),
  "caption": select(_type == "image" => caption),
  "tone": select(_type == "callout" => coalesce(tone, "info")),
  "title": select(_type == "callout" => title),
  "body": select(_type == "callout" => body)
}`;

export const newsItemsQuery = groq`*[_type=="newsItem" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc, _createdAt desc){
  "id": _id,
  "title": coalesce(title, "Untitled news"),
  "slug": slug.current,
  "excerpt": coalesce(excerpt, ""),
  "category": coalesce(category, "News"),
  publishedAt,
  "featured": coalesce(featured, false),
  "featuredImage": featuredImage${newsImageProjection},
  "body": null
}`;

export const recentNewsQuery = groq`*[_type=="newsItem" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc, _createdAt desc)[0...4]{
  "id": _id,
  "title": coalesce(title, "Untitled news"),
  "slug": slug.current,
  "excerpt": coalesce(excerpt, ""),
  "category": coalesce(category, "News"),
  publishedAt,
  "featured": coalesce(featured, false),
  "featuredImage": featuredImage${newsImageProjection},
  "body": null
}`;

export const featuredNewsQuery = groq`*[_type=="newsItem" && featured == true && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc)[0...3]{
  "id": _id,
  "title": coalesce(title, "Untitled news"),
  "slug": slug.current,
  "excerpt": coalesce(excerpt, ""),
  "category": coalesce(category, "News"),
  publishedAt,
  "featured": true,
  "featuredImage": featuredImage${newsImageProjection},
  "body": null
}`;

export const newsBySlugQuery = groq`*[_type=="newsItem" && slug.current==$slug && defined(publishedAt) && publishedAt <= now()][0]{
  "id": _id,
  "title": coalesce(title, "Untitled news"),
  "slug": slug.current,
  "excerpt": coalesce(excerpt, ""),
  "category": coalesce(category, "News"),
  publishedAt,
  "featured": coalesce(featured, false),
  "featuredImage": featuredImage${newsImageProjection},
  "body": body${newsBodyProjection}
}`;

export const newsSlugsQuery = groq`*[_type=="newsItem" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]{"slug": slug.current}`;
