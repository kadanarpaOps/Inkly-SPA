
export interface ChapterInfo {
  id: string;
  order: number;
  title: string;
  storyId: string;
  content: string;
  hidden: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterChapter {
  storyId: string;
}

export interface UpdateChapter {
  title: string;
  content: string;
}

export interface ChaptersFilters {
  offset: number;
  limit: number;
  newestFirst: boolean;
}
