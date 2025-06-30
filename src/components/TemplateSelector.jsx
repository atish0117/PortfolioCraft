import { useDispatch, useSelector } from "react-redux";
import { updateTemplate } from "../features/template/templateSlice";

const templates = ["minimal", "modern", "classic", "dark", "funky"];



const TemplateSelector = () => {
  const dispatch = useDispatch();
   const { selected, loading } = useSelector((state) => state.template);

  const handleSelect = (templateId) => {
      if (loading || selected === templateId) return;
    dispatch(updateTemplate(templateId));
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
               selected === tpl ? "bg-yellow-300 border-black font-bold" : "bg-white"
          }`}
          >
            {tpl.toUpperCase()}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
