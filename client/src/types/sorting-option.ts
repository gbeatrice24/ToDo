export type SortingOptionLabel = "Title" | "Description" | "Priority" | "Date";

export interface SortingOption {
    label: SortingOptionLabel;
    active: boolean;
}