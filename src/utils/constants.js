// TODO: As of now there are limit constants here and in backend. Maybe there should be only in backend and from there communicated here (in response, for example) so you can do paging here. See solutions

export const SEARCH_RESULTS = 3;

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

// IMPORTANT. This must only be changed in accordance to the change of the COMMENT_LIMIT constant in backend
export const COMMENT_PAGE_AMOUNT = 10;
