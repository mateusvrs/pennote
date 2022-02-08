import { GroupBase, SingleValue } from "react-select"

import Select from "react-select/dist/declarations/src/Select"

import { CategoriesType } from "../../hooks/useCategories"

export type CategoryRefType = Select<CategoriesType, false, GroupBase<CategoriesType>> | null

export type NoteCategorySelectProps = {
    isPWA: boolean
    categoryRef: CategoryRefType
    setCategoryRef: (value: CategoryRefType) => void
}

export type SelectedCategoryType = SingleValue<CategoriesType>