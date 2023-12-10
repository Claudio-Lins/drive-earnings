import { CategoryTypes } from "@/@types/category"
import { create } from "zustand"

interface CategoryState {
  categories: CategoryTypes[]
  setCategories: (categories: CategoryTypes[]) => void
  addCategory: (category: CategoryTypes) => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
}))
