import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";
import type { ChapterInfo, ChaptersFilters, RegisterChapter, UpdateChapter } from "../../../core/domain/models/stories/ChapterModel";
import httpClient from "../config/axios.instance";

export const getChaptersByStoryRequest = async (filters: ChaptersFilters, storyId: string): Promise<PageResponse<ChapterInfo>> => {
  const response = await httpClient.get(`api/chapter/${storyId}`, {
    params: filters,
  });
  return response.data;
}

export const getOwnedChaptersByStoryRequest = async (filters: ChaptersFilters, storyId: string): Promise<PageResponse<ChapterInfo>> => {
  const response = await httpClient.get(`api/chapter/my-chapters/${storyId}`, {
    params: filters,
  });
  return response.data;
}

export const createChapterRequest = async (createChapter: RegisterChapter): Promise<void> => {
  const response = await httpClient.post(`api/chapter/create`, createChapter);
  return response.data;
}

export const toggleChapterStatusRequest = async (chapterId: string): Promise<void> => {
  const response = await httpClient.patch(`api/chapter/toggle-hidden/${chapterId}`);
  return response.data;
}

export const deleteChapterRequest = async (storyId: string, chapterId: string): Promise<void> => {
  const response = await httpClient.delete(`api/chapter/${storyId}/chapter/${chapterId}`);
  return response.data;
}

export const updateChapterRequest = async (chapterId: string, updateChapter: UpdateChapter): Promise<void> => {
  const response = await httpClient.patch(`api/chapter/update/${chapterId}`, updateChapter);
  return response.data;
}
