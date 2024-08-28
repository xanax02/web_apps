import { useDroppable } from "@dnd-kit/core";

export default function Droppable() {
  const setNodeRef = useDroppable({
    id: "unique_id-1",
  });

  return <div ref={setNodeRef}></div>;
}
