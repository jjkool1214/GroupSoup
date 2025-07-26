import supabase from "../supabaseClient.jsx";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function Questionnaire () {
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

    const navigate = useNavigate();


    return  (
        <div>
            <h1>
                Questionnaire
            </h1>
            <div>
                {
                    Object.keys(groupings).map((catName) => (
                        <div key={catName} className="flex flex-col flex-wrap gap-2  w-[60%] mx-auto py-2">
                            <h1 className={"text-3xl"}>{catName}</h1>
                            <div className=" flex flex-row flex-wrap gap-2">
                                {groupings[catName].map((tag) => {
                                    const isSelected = selectedTags.includes(tag);
                                    console.log(Object.keys(tag)[0] + " " + isSelected)
                                    let selectedClassname = isSelected ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                                    const classTag = "self-start inline-block rounded border px-4 py-2 text-white rounded-full transition " + selectedClassname
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
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 active:scale-95 transition transform duration-200 ease-in-out" onClick={() => navigate("./../userInfo", {state : {selectedTags}})}>tags selected</button>
        </div>
    )
}

export default Questionnaire
