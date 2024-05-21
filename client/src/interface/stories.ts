import { ApiErrorResponse } from "./auth";

export interface StoriesRes {
  _id: string;
  author: {
    _id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  title: string;
  text: string;
  poster: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Stories {
  stories: StoriesRes[] | null | undefined;
  status: string;
  error: ApiErrorResponse | unknown;
}
