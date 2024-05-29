export const API_URL = "http://localhost:3000/api/v1";

export const SEARCH_RESULTS = 4;

export const POST_SORT_OPTIONS = [
  {
    value: "postedAt-desc",
    label: "Fecha de publicación (nuevo)",
  },
  {
    value: "postedAt-asc",
    label: "Fecha de publicación (viejo)",
  },
  {
    value: "updatedAt-desc",
    label: "Fecha de actualización (nuevo)",
  },
  {
    value: "updatedAt-asc",
    label: "Fecha de actualización (viejo)",
  },
];

export const HIDDEN_POST_SORT_OPTIONS = [
  {
    value: "updatedAt-desc",
    label: "Fecha de actualización (nuevo)",
  },
  {
    value: "updatedAt-asc",
    label: "Fecha de actualización (viejo)",
  },
  {
    value: "status-desc",
    label: "Estado",
  },
];

export const COLLECTION_SORT_OPTIONS = [
  {
    value: "postedAt-desc",
    label: "Fecha de publicación (nuevo)",
  },
  {
    value: "postedAt-asc",
    label: "Fecha de publicación (viejo)",
  },
  {
    value: "updatedAt-desc",
    label: "Fecha de actualización (nuevo)",
  },
  {
    value: "updatedAt-asc",
    label: "Fecha de actualización (viejo)",
  },
];

export const HIDDEN_COLLECTION_SORT_OPTIONS = [
  {
    value: "updatedAt-desc",
    label: "Fecha de actualización (nuevo)",
  },
  {
    value: "updatedAt-asc",
    label: "Fecha de actualización (viejo)",
  },
  {
    value: "status-desc",
    label: "Estado",
  },
];

// IMPORTANT. This must only be changed in accordance to the change of the AGGREGATION_LIMIT constant in backend
export const PAGE_SIZE = 10;
