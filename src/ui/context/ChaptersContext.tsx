import { createContext } from "react";
import type { RegisterChapter } from "../../core/domain/models/stories/ChapterModel";

export interface ChaptersContextType {
  // Basics
  loading: boolean;
  error: string | null;
  // Utils
  writingChapter: null;
  readingChapter: null;
  // Rest Methods
  createChapter: (createChapter: RegisterChapter) => Promise<boolean>;
  
}

export const ChaptersContext = createContext<ChaptersContextType | null>(null);
