import { useParams } from "react-router-dom";

import { useSearchCollections } from "../features/search/useSearchCollections";
import { useErrorHandler } from "../hooks/useErrorHandler";

import CardList from "../ui/CardList";

function CollectionSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingCollections,
    collections,
    error,
  } = useSearchCollections(searchTerm);
  useErrorHandler(error);

  return (
    <div className="mx-auto flex w-3/4 justify-center">
      <CardList collections={collections} />
    </div>
  );
}

export default CollectionSearchResults;
