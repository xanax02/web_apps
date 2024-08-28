import "./App.css";

import { DndContext } from "@dnd-kit/core";
import Draggable from "./components/draggable/Draggable";
import Droppable from "./components/droppable/Droppable";

function App() {
  return (
    <DndContext>
      <Draggable />
      <Droppable />
    </DndContext>
  );
}

export default App;
