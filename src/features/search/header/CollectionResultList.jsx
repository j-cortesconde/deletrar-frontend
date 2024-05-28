import { useNavigate } from "react-router-dom";

import { SEARCH_RESULTS } from "../../../utils/constants";
import ScrollableLi from "../../../ui/ScrollableLi";
import CollectionResult from "./CollectionResult";

function CollectionResultList({
  collections,
  query,
  countBeforeCollectionResults,
  selectedIndex,
}) {
  const navigate = useNavigate();

  const collectionsAmount = collections?.length;
  const trimmedCollections =
    collectionsAmount > 0 ? collections.slice(0, SEARCH_RESULTS) : [];
  const trimmedCollectionsAmount =
    collectionsAmount > SEARCH_RESULTS ? SEARCH_RESULTS : collectionsAmount;

  return (
    <li>
      <p
        key={`collections-title-${query}`}
        className="rounded-t-xl border-b-2 border-slate-300 bg-slate-300 px-2 py-2 font-semibold"
      >
        Colecciones
      </p>
      <ul>
        {trimmedCollections.map((result, index) => (
          <CollectionResult
            key={result._id}
            selected={countBeforeCollectionResults + index === selectedIndex}
            to={`/collection/${result._id}`}
            result={result}
          />
        ))}
        {trimmedCollectionsAmount < collectionsAmount && (
          <ScrollableLi
            key={`collections-link-${query}`}
            selected={
              countBeforeCollectionResults + SEARCH_RESULTS === selectedIndex
            }
            onClick={() => navigate(`/collections/${query}`)}
          >
            Ver más...
          </ScrollableLi>
        )}
      </ul>
    </li>
  );
}

export default CollectionResultList;
