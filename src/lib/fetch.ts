import { ThreadsUserProfileResponse } from '../types/threads-api';
import {
  ENDPOINTS_DOCUMENT_ID,
  GRAPHQL_ENDPOINT,
  THREADS_APP_ID,
} from './consts';
import { IS_DEBUG } from './env';
import { mapUserProfile } from './map';

const fetchBase = ({ documentId, variables }) => {
  return fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'Threads API jlurbe client',
      'x-ig-app-id': THREADS_APP_ID, // x-*** cabecera personalizada
    },
    body: `variables=${JSON.stringify(variables)}&doc_id=${documentId}`,
  }).then((res) => res.json());
};

export const fetchUserIdByName = ({ userName }) => {
  if (IS_DEBUG) {
    console.info(`https://www.threads.net/@${userName}`);
  }

  return fetch(`https://www.threads.net/@${userName}`)
    .then((res) => res.text())
    .then((html) => {
      const regex = /"user_id":"(\d+)"/g;
      const [[, userId]] = html.matchAll(regex) ?? [];

      return userId;
    });
};

type FetchUserProfile = {
  userId?: string;
  userName?: string;
};

export const fetchUserProfile = async ({
  userId,
  userName,
}: FetchUserProfile) => {
  if (userName && !userId) {
    userId = await fetchUserIdByName({ userName });
  }

  const variables = { userID: userId };

  const data = (await fetchBase({
    variables,
    documentId: ENDPOINTS_DOCUMENT_ID.USER_PROFILE,
  })) as ThreadsUserProfileResponse;

  return mapUserProfile(data);
};

export const fetchUserThreads = async ({
  userId,
  userName,
}: FetchUserProfile) => {
  if (userName && !userId) {
    userId = await fetchUserIdByName({ userName });
  }

  const variables = { userID: userId };

  return fetchBase({
    variables,
    documentId: ENDPOINTS_DOCUMENT_ID.USER_THREADS,
  });
};

export const fetchUserReplies = async ({
  userId,
  userName,
}: FetchUserProfile) => {
  if (userName && !userId) {
    userId = await fetchUserIdByName({ userName });
  }

  const variables = { userID: userId };

  return fetchBase({
    variables,
    documentId: ENDPOINTS_DOCUMENT_ID.USER_REPLIES,
  });
};

export const fetchThreadReplies = ({ threadId }) => {
  const variables = { postID: threadId };

  return fetchBase({
    variables,
    documentId: ENDPOINTS_DOCUMENT_ID.THREAD_REPLIES,
  });
};
