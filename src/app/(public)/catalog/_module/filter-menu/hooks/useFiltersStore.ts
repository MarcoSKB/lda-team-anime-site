'use client'

import { create } from 'zustand'

import { FiltersType } from './useFilters'

interface FiltersStore {
  filtersValue: FiltersType
  setFiltersValue: (
    value: FiltersType | ((prev: FiltersType) => FiltersType),
  ) => void
  resetFilters: () => void
}

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  filtersValue: {},
  setFiltersValue: (value) =>
    set({
      filtersValue:
        typeof value === 'function' ? value(get().filtersValue) : value,
    }),
  resetFilters: () => set({ filtersValue: {} }),
}))
