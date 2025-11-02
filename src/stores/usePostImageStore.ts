'use client'

import { create } from 'zustand'

interface PostImageState {
  imageMap: Map<string, File>
  setImage: (localUrl: string, file: File) => void
  removeImage: (localUrl: string) => void
  clear: () => void
}

export const usePostImageStore = create<PostImageState>((set) => ({
  imageMap: new Map(),

  setImage: (localUrl, file) =>
    set((state) => {
      const map = new Map(state.imageMap)
      map.set(localUrl, file)
      return { imageMap: map }
    }),

  removeImage: (localUrl) =>
    set((state) => {
      const map = new Map(state.imageMap)
      map.delete(localUrl)
      return { imageMap: map }
    }),

  clear: () => set({ imageMap: new Map() }),
}))
