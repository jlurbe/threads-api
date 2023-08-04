export interface ThreadsUserProfileResponse {
  data: Data;
  extensions: Extensions;
}

export interface Data {
  userData: UserData;
}

export interface UserData {
  user: User;
}

export interface User {
  is_private: boolean;
  profile_pic_url: string;
  username: string;
  hd_profile_pic_versions: HDProfilePicVersion[];
  is_verified: boolean;
  biography: string;
  biography_with_entities: BiographyWithEntities;
  follower_count: number;
  profile_context_facepile_users: null;
  bio_links: BioLink[];
  pk: string;
  full_name: string;
  id: null;
}

export interface BioLink {
  url: string;
}

export interface BiographyWithEntities {
  entities: any[];
  raw_text: string;
}

export interface HDProfilePicVersion {
  height: number;
  url: string;
  width: number;
}

export interface Extensions {
  is_final: boolean;
}
