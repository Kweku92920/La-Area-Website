export type Leader = { _id: string; name: string; role: string; location: string };
export const leadersQuery = `*[_type=="leader"] | order(order asc){_id, name, role, "location": coalesce(location, "")}`;

export type DirectoryAssembly = {
  id: string;
  name: string;
  district: string;
  location: string;
  pastor: string;
  time: string;
  image: string | null;
};
export type DirectoryDistrict = { name: string; minister: string | null };
export const directoryQuery = `{
  "assemblies": *[_type=="assembly" && defined(district)] | order(name asc){
    "id": slug.current, name, "district": district->name,
    "location": coalesce(location, ""), "pastor": coalesce(pastor, ""),
    "time": coalesce(serviceTimes[0], "Sunday Worship – 9:00 AM"),
    "image": image.asset->url
  },
  "districts": *[_type=="district"] | order(name asc){name, "minister": pastor->name}
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
};
export const assemblyBySlugQuery = `*[_type=="assembly" && slug.current==$id][0]{
  "id": slug.current, name, "district": coalesce(district->name, ""),
  "districtMinister": district->pastor->name,
  "location": coalesce(location, ""), "pastor": coalesce(pastor, ""),
  "time": serviceTimes, phone, email
}`;
export const assemblySlugsQuery = `*[_type=="assembly" && defined(slug.current)]{"id": slug.current}`;

export type DistrictItem = {
  name: string;
  pastor: string | null;
  assemblies: { slug: string; name: string }[];
};
export const districtsQuery = `*[_type=="district"] | order(name asc){
  name, "pastor": pastor->name,
  "assemblies": *[_type=="assembly" && references(^._id)] | order(name asc){"slug": slug.current, name}
}`;

export type MinistryItem = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  leader: MinistryLeaderProfile | null;
};
export type MinistryLeaderProfile = {
  name: string;
  role: string;
  location: string;
  bio: string;
  photo: string | null;
};
export const ministriesQuery = `*[_type=="ministry"] | order(order asc){
  "id": slug.current, title, "description": coalesce(description, ""),
  "image": image.asset->url,
  "leader": leader->{name, role, "location": coalesce(location, ""),
    "bio": coalesce(bio, ""), "photo": photo.asset->url}
}`;
export const ministryLeaderQuery = `*[_type=="ministry" && slug.current==$id][0].leader->{
  name, role, "location": coalesce(location, ""),
  "bio": coalesce(bio, ""), "photo": photo.asset->url
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
};
export const sermonsQuery = `*[_type=="sermon"] | order(date desc){
  "id": _id, title, speaker, date, youtubeUrl,
  "duration": coalesce(duration, ""), "description": coalesce(description, ""),
  "series": coalesce(series, ""), "category": coalesce(category, ""),
  "customThumb": thumbnail.asset->url
}`;
export const latestSermonsQuery = `*[_type=="sermon"] | order(date desc)[0...3]{
  "id": _id, title, speaker, date, "duration": coalesce(duration, ""), youtubeUrl,
  "customThumb": thumbnail.asset->url
}`;
export type HomeSermon = Pick<RawSermon, 'id' | 'title' | 'speaker' | 'date' | 'duration' | 'youtubeUrl' | 'customThumb'>;

export type HomeEvent = { title: string; startDate: string; location: string | null; image: string | null };
export const nextEventQuery = `*[_type=="event" && startDate >= now()] | order(featured desc, startDate asc)[0]{
  title, startDate, location, "image": image.asset->url
}`;

export type GalleryPhotoItem = { url: string; caption: string | null };
export const ministryGalleryQuery = `*[_type=="ministry" && slug.current==$id][0].gallery[defined(asset)]{
  "url": asset->url, caption
}`;
