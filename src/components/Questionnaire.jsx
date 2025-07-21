import supabase from "../supabaseClient.jsx";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import tailwindcss from "tailwindcss";

export function Questionnaire () {
    const location = useLocation();
    console.log(location)
    const groupings = location.state.groupings;

    const [selectedTags, setSelectedTags] = useState([]);

    console.log(groupings);


    const handleTags = (tag) => {
        let newArr = Array.from(selectedTags);
        if(newArr.includes(tag)) {
            newArr.splice(newArr.indexOf(tag), 1);
        } else {
            newArr.push(tag);
        }
        setSelectedTags(newArr);
    }


    return  (
        <div>
            <h1>
                Questionnaire
            </h1>
            <div>
                {
                    Object.keys(groupings).map((catName) => (
                        <div key={catName} className="flex flex-col flex-wrap gap-2">
                            <h1>{catName}</h1>
                            <div className="questionaireTags">
                                {groupings[catName].map((tag) => {
                                    const isSelected = selectedTags.includes(tag);
                                    console.log(Object.keys(tag)[0] + " " + isSelected)
                                    let selectedClassname = isSelected ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                                    const classTag = "inline-block px-4 py-2 text-white rounded-full transition " + selectedClassname
                                    console.log(classTag)
                                    return (
                                    <button
                                        key={Object.keys(tag)[0]}
                                        className={classTag}
                                        onClick={() => handleTags(tag)}>{Object.keys(tag)[0]}</button>
                                    )})}
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={() => console.log(selectedTags)}>tags selected</button>
        </div>
    )
}
