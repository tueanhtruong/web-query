export enum API_KEYS {
  TODO = 'todo',
  POSTS = 'posts',
  POST_DETAIL = 'post-detail',
}
export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
}
