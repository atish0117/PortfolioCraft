// File: components/dashboard/SectionControl.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSection,
  reorderSections,
  updateSectionSettings,
} from "../../features/sections/sectionSlice";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DraggableItem = ({ id, index, moveItem, children }) => {
  const [, ref] = useDrag({
    type: "SECTION",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "SECTION",
    hover(item) {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="cursor-move">
      {children}
    </div>
  );
};

const SectionControl = () => {
  const dispatch = useDispatch();
  const { visibleSections, sectionOrder } = useSelector((state) => state.sections);


  const moveItem = (from, to) => {
    const updated = [...sectionOrder];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    dispatch(updateSectionSettings(updated));
  };

  const handleToggle = (section) => {
    dispatch(toggleSection(section));
  };

  return (
    <div className="bg-white p-6 mt-8 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Manage Sections</h2>
      <DndProvider backend={HTML5Backend}>
        <ul className="space-y-2">
          {sectionOrder.map((section, idx) => (
            <DraggableItem key={section} id={section} index={idx} moveItem={moveItem}>
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span className="capitalize">{section}</span>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={visibleSections[section] ?? true}
                    onChange={() => handleToggle(section)}
                  />
                  Show
                </label>
              </div>
            </DraggableItem>
          ))}
        </ul>
      </DndProvider>
    </div>
  );
};

export default SectionControl;
