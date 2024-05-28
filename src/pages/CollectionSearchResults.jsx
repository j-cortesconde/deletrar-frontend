import { useParams } from "react-router-dom";

import { useSearchCollections } from "../features/search/useSearchCollections";

import CardList from "../ui/CardList";

function CollectionSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingCollections,
    collections,
    error: postsError,
  } = useSearchCollections(searchTerm);

  return (
    <div className="mx-auto flex w-3/4 justify-center">
      <CardList collections={collections} />
    </div>
  );
}

export default CollectionSearchResults;
