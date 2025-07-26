import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import navigation from "./Navigation.jsx";

export default function DescriptorSelector() {
    const [selectedIds, setSelectedIds] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const descriptorList = location.state?.data || [];

    const toggleSelection = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        const selectedDescriptors = descriptorList.filter((item) =>
            selectedIds.includes(item.id)
        );
        console.log(selectedDescriptors)
        navigate("../businessSignup", {state : {selectedDescriptors}});
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold">Choose Descriptors</h2>
            <div className="flex flex-wrap gap-3 justify-center">
                {descriptorList.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => toggleSelection(item.id)}
                            className={`px-4 py-2 rounded-full border 
                ${isSelected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} 
                hover:scale-105 transition-all`}
                        >
                            {item.descriptors}
                        </button>
                    );
                })}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
                Submit
            </button>
        </div>
    );
}
