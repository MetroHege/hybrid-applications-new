import {MediaItem} from '@sharedTypes/DBTypes';
import {
  fetchAllMedia,
  fetchMediaById,
  fetchMediaByTag,
  postMedia,
  postTagToMedia,
  putMedia,
} from '../models/mediaModel';

export default {
  Query: {
    mediaItems: async () => {
      return await fetchAllMedia();
    },
    mediaItem: async (_parent: undefined, args: {media_id: string}) => {
      const id = Number(args.media_id);
      return await fetchMediaById(id);
    },
    mediaItemsByTag: async (_parent: undefined, args: {tag: string}) => {
      return await fetchMediaByTag(args.tag);
    },
  },
  Mutation: {
    createMediaItem: async (
      _parent: undefined,
      args: {input: Omit<MediaItem, 'media_id' | 'created_at' | 'thumbnail'>},
    ) => {
      return await postMedia(args.input);
    },
    addTagToMediaItem: async (
      _parent: undefined,
      args: {media_id: string; tag: string},
    ) => {
      return await postTagToMedia(args.tag, Number(args.media_id));
    },
    updateMediaItem: async (
      _parent: undefined,
      args: {input: Pick<MediaItem, 'title' | 'description'>; media_id: string},
    ) => {
      return await putMedia(args.input, Number(args.media_id));
    },
  },
};
