import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedTemplate } from "../features/auth/authSlice";

const templates = [
  { id: "template1", name: "Classic", image: "/templates/template1.png" },
  { id: "template2", name: "Modern", image: "/templates/template2.png" },
  { id: "template3", name: "Minimal", image: "/templates/template3.png" },
];

const TemplateSelector = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSelect = (id) => {
    dispatch(updateSelectedTemplate(id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {templates.map((tpl) => (
        <div key={tpl.id} className={`border rounded p-3 shadow relative`}>
          <img src={tpl.image} alt={tpl.name} className="w-full h-40 object-cover rounded" />
          <h4 className="text-center mt-2 font-semibold">{tpl.name}</h4>
          <button
            onClick={() => handleSelect(tpl.id)}
            className={`mt-2 w-full py-1 px-3 rounded ${
              user?.selectedTemplate === tpl.id
                ? "bg-green-500 text-white"
                : "bg-yellow-400"
            }`}
          >
            {user?.selectedTemplate === tpl.id ? "Selected" : "Choose"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
