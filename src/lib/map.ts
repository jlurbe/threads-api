import { ThreadsUserProfileResponse } from '../types/threads-api';

export const mapUserProfile = (rawResponse: ThreadsUserProfileResponse) => {
  const userApiResponse = rawResponse?.data?.userData?.user;

  if (!userApiResponse) {
    throw new Error('Not valid response for mapping user profile');
  }

  const {
    username,
    is_verified,
    biography,
    follower_count,
    bio_links,
    pk: id,
    full_name,
    hd_profile_pic_versions,
    profile_pic_url,
  } = userApiResponse;

  const profile_pics = [
    { height: 150, width: 150, url: profile_pic_url },
    ...hd_profile_pic_versions,
  ];

  return {
    id,
    username,
    is_verified,
    biography,
    follower_count,
    bio_links,
    full_name,
    profile_pics,
  };
};
