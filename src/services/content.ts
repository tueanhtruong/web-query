import { ContentStore } from 'src/redux/common/types';

export const LOCAL_STORAGE_CONTENT = 'content';

const clearContent = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONTENT);
};

const setContent = (content: ContentStore) => {
  localStorage.setItem(LOCAL_STORAGE_CONTENT, JSON.stringify(content));
};

const getContent = (): ContentStore => {
  const content = localStorage.getItem(LOCAL_STORAGE_CONTENT);
  if (!content) return null;
  return JSON.parse(content);
};

export default {
  clearContent,
  setContent,
  getContent,
};
