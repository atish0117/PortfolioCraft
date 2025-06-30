import { useDispatch, useSelector } from "react-redux";
import {
  setSectionOrder,
  toggleSectionVisibility,
  saveLayout,
} from "../features/customize/customizeSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

const sectionLabels = {
  hero: "Hero",
  skills: "Skills",
  projects: "Projects",
  education: "Education",
  experience: "Experience",
  certifications: "Certifications",
  testimonials: "Testimonials",
  contact: "Contact",
};

export default function CustomizeLayout() {
  const dispatch = useDispatch();
  const { sectionOrder, visibleSections } = useSelector(
    (state) => state.customize
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newOrder = Array.from(sectionOrder);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    dispatch(setSectionOrder(newOrder));
  };

  const handleSave = () => {
    dispatch(saveLayout({ sectionOrder, visibleSections }));
  };

  return (
    <div className="max-w-xl mx-auto p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Customize Sections</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sectionOrder.map((key, index) => (
                <Draggable key={key} draggableId={key} index={index}>
                  {(provided) => (
                    <div
                      className="flex justify-between items-center p-3 my-2 bg-gray-100 rounded"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{sectionLabels[key]}</span>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={visibleSections[key]}
                          onChange={() => dispatch(toggleSectionVisibility(key))}
                        />
                        Show
                      </label>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded"
      >
        Save Layout
      </button>
    </div>
  );
}
