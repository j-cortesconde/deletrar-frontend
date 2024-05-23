import { useState } from "react";
import CollectionPostSearch from "./CollectionPostSearch";

function CollectionPostSelect() {
  const [postSelected, setPostSelected] = useState(false);
  const [postTitle, setPostTitle] = useState("");

  return (
    <div className="flex w-3/4 flex-col rounded-xl  bg-slate-500">
      <CollectionPostSearch />
    </div>
  );
}

export default CollectionPostSelect;
