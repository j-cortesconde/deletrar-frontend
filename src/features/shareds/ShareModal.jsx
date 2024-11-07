import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useCreateShared } from "./useCreateShared";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";

function ShareModal({ children, sharedComment }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState();
  const { createShared, isCreating } = useCreateShared();
  const { collectionId, postId } = useParams();

  const ownUser = queryClient.getQueryData(["user"]);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  function handleSubmit() {
    const newShared = {
      sharedComment,
    };
    if (content) newShared.content = content;

    if (!sharedComment) {
      newShared.sharedPost = postId;
      newShared.sharedCollection = collectionId;
    }

    createShared(newShared, {
      onSuccess: () => {
        toast.success("Compartido exitosamente");
        closeModal();
      },
    });
  }

  return (
    <div className="flex items-center justify-center">
      {/* Open modal button */}
      <div
        className="flex items-center gap-2 place-self-center hover:cursor-pointer"
        onClick={openModal}
      >
        {children}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden px-2">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          ></div>

          {/* Modal Content */}
          <div className="z-50 w-full scale-100 transform overflow-hidden rounded-md bg-white shadow-xl transition-transform sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3">
            {/* Modal Header */}
            <div className="flex h-10 justify-between bg-indigo-500 px-4 py-2 text-white"></div>

            {/* Modal Body */}
            <div className="p-4 ">
              <div className="flex gap-4 ">
                <img
                  className="h-20 w-20 rounded-full"
                  src={`/users/${ownUser.photo}`}
                  alt={ownUser.username}
                />

                <p className="text-left">{ownUser.name}</p>
              </div>

              <TextareaAutosize
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minRows={1}
                maxLength={400}
                className="w-full resize-none rounded-md py-4 text-2xl transition duration-150 ease-in-out focus:outline-none"
                placeholder="Hacé un comentario..."
              />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end px-4 py-2">
              <button
                onClick={handleSubmit}
                className="w-full rounded-md bg-indigo-500 px-3 py-1 text-white sm:w-auto"
              >
                {isCreating ? "Compartiendo..." : "Compartir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // );
}

export default ShareModal;
