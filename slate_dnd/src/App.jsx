import "./App.css";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Draggable from "./components/draggable/Draggable";
import Droppable from "./components/droppable/Droppable";
import { useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./components/sortableItem/SortableItem";
// function App() {
//   //multiple sesors
//   const mouseSensor = useSensor(MouseSensor);
//   const keyboardSensor = useSensor(KeyboardSensor);
//   const touchSensor = useSensor(TouchSensor);

//   const sensors = useSensors(mouseSensor, keyboardSensor, touchSensor);

//   return (
//     <DndContext sensors={sensors}>
//       <Draggable />
//       <Droppable />
//     </DndContext>
//   );
// }
function App() {
  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // dragEndEvent
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => {
          return <SortableItem key={item} id={item} title={item} />;
        })}
      </SortableContext>
      <h2>jhslkdfjsdklfjsdlkfj</h2>
    </DndContext>
  );
}

export default App;
