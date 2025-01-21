import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CollectionPost from "./CollectionPost";
import { useMoveCollectionPost } from "./useMoveCollectionPost";
import Loader from "../../ui/Loader";
import AddCollectionPostButton from "./AddCollectionPostButton";

function CollectionPosts({ posts }) {
  const { moveCollectionPost, isMoving } = useMoveCollectionPost();

  function onDragEnd(result) {
    if (
      !result.destination ||
      result.destination?.index === result.source?.index
    )
      return;

    const postId = result.draggableId;
    const position = result.destination.index;

    moveCollectionPost({ postId, position });
  }

  if (isMoving) return <Loader />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="postList">
        {(provided) => (
          <ul
            className="my-3 flex w-3/4 flex-col gap-3 border-2 border-stone-400 p-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <p className="text-justify text-4xl">Textos</p>

            {posts?.map((post, index) => (
              <Draggable key={post?.id} draggableId={post?.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                  >
                    <CollectionPost
                      post={post}
                      index={index}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {posts?.length === 0 && (
              <p className="text-justify text-3xl">
                Esta colección aún no tiene textos
              </p>
            )}

            <AddCollectionPostButton />
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default CollectionPosts;
