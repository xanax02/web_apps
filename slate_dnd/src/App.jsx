import "./App.css";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Draggable from "./components/draggable/Draggable";
import Droppable from "./components/droppable/Droppable";

function App() {
  //multiple sesors
  const mouseSensor = useSensor(MouseSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, keyboardSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <Draggable />
      <Droppable />
    </DndContext>
  );
}

export default App;
