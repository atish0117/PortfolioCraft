import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSectionSettings } from "../features/auth/authSlice";

const SectionSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [sectionOrder, setSectionOrder] = useState(user.sectionOrder || []);
  const [visibleSections, setVisibleSections] = useState(user.visibleSections || {});

  const moveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...sectionOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setSectionOrder(newOrder);
  };

  const moveDown = (index) => {
    if (index === sectionOrder.length - 1) return;
    const newOrder = [...sectionOrder];
    [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
    setSectionOrder(newOrder);
  };

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSave = () => {
    dispatch(updateSectionSettings({ sectionOrder, visibleSections }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Customize Portfolio Sections</h2>
      {sectionOrder.map((section, index) => (
        <div key={section} className="flex justify-between items-center border p-2 rounded-md">
          <span className="capitalize">{section}</span>
          <div className="flex items-center gap-3">
            <label className="text-sm">
              <input
                type="checkbox"
                checked={visibleSections[section]}
                onChange={() => toggleSection(section)}
              />
              <span className="ml-1">Show</span>
            </label>
            <button onClick={() => moveUp(index)}>⬆</button>
            <button onClick={() => moveDown(index)}>⬇</button>
          </div>
        </div>
      ))}
      <button
        onClick={handleSave}
        className="bg-yellow-400 px-4 py-2 rounded font-semibold"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SectionSettings;
