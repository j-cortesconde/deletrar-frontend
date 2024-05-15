import SortBy from "./SortBy";

function ResultsOperations({ totalAmount, sortOptions }) {
  return (
    <div className="grid grid-cols-2 px-5">
      <p className="place-self-start">
        {totalAmount} resultado
        {totalAmount > 1 && "s"}
      </p>

      {totalAmount > 1 && (
        <div className="place-self-end">
          {sortOptions && <SortBy options={sortOptions} />}
        </div>
      )}
    </div>
  );
}

export default ResultsOperations;
