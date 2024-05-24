import ScrollableLi from "../../../ui/ScrollableLi";

function CollectionPostResult({ selected = false, post, onClick }) {
  return (
    <ScrollableLi selected={selected} onClick={onClick}>
      <p className="align-middle ">
        {post.title} - {post.author.name}
      </p>
    </ScrollableLi>
  );
}

export default CollectionPostResult;
