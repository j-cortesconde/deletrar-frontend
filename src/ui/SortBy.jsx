import { useState } from "react";
import Select from "./Select";

function SortBy({ options }) {
  const [sortBy, setSortBy] = useState("");

  function handleChange(e) {
    setSortBy(e.target.value);
    options.filter((option) => option.value === e.target.value)[0].action();
  }

  return <Select options={options} value={sortBy} onChange={handleChange} />;
}

export default SortBy;
