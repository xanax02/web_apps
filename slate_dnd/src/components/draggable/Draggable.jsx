import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const Draggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique_draggle-1",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef}>
      hello
      <button style={style} {...listeners} {...attributes}>
        Draggable button
      </button>
    </div>
  );
};

export default Draggable;
