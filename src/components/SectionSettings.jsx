import { useDispatch, useSelector } from "react-redux";
import {
  toggleSection,
  reorderSections,
  updateSectionSettings,
} from "../features/sections/sectionSlice";
import { useState } from "react";

const SectionManager = () => {
  const dispatch = useDispatch();
  const { visibleSections, sectionOrder } = useSelector((state) => state.sections);
  const [tempOrder, setTempOrder] = useState([...sectionOrder]);

  const handleToggle = (section) => {
    dispatch(toggleSection(section));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("startIndex", index);
  };

  const handleDrop = (e, endIndex) => {
    const startIndex = e.dataTransfer.getData("startIndex");
    const updated = [...tempOrder];
    const [removed] = updated.splice(startIndex, 1);
    updated.splice(endIndex, 0, removed);
    setTempOrder(updated);
  };

  const handleSave = () => {
    dispatch(updateSectionSettings({ visibleSections, sectionOrder: tempOrder }));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Sections</h2>

      <ul className="space-y-2">
        {tempOrder.map((section, index) => (
          <li
            key={section}
            className="flex justify-between items-center bg-gray-100 p-2 rounded cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            <span className="capitalize">{section}</span>
            <input
              type="checkbox"
              checked={visibleSections[section]}
              onChange={() => handleToggle(section)}
            />
          </li>
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded font-semibold"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default SectionManager;
