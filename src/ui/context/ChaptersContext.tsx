import { createContext } from "react";
import type { ChapterInfo, ChaptersFilters, EditingChapter, ReadingChapter, RegisterChapter, UpdateChapter } from "../../core/domain/models/stories/ChapterModel";
import type { PageResponse } from "../../core/domain/models/common/PaginationModels";

export interface ChaptersContextType {
  // Basics
  loading: boolean;
  updating: boolean
  error: string | null;
  // Utils
  editingChapter: EditingChapter | null;
  readingChapter: ReadingChapter | null;
  setEditingChapter: (chapter: EditingChapter | null) => void;
  setReadingChapter: (chapter: ReadingChapter | null) => void;
  // Rest Methods
  getChaptersByStory: (filters: ChaptersFilters, storyId: string) => Promise<PageResponse<ChapterInfo>>;
  getOwnedChaptersByStory: (filters: ChaptersFilters, storyId: string) => Promise<PageResponse<ChapterInfo>>;
  createChapter: (createChapter: RegisterChapter) => Promise<boolean>;
  updateChapter: (updateChapter: UpdateChapter, chapterId: string) => Promise<boolean>;
  toggleChapterStatus: (chapterId: string) => Promise<boolean>;
  deleteChapter: (storyId: string, chapterId: string) => Promise<boolean>;
}

export const ChaptersContext = createContext<ChaptersContextType | null>(null);
