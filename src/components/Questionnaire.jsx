import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient.jsx";

function Questionnaire() {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state)
    const chosen = location.state?.chosen || [];
    const startingSelected = chosen.map((tag) => {
        return tag.tag
    })
    console.log(startingSelected);
    const userUpdate = location.state?.update;
    const [selectedTags, setSelectedTags] = useState(startingSelected);
    const [groupings, setGroupings] = useState({});
    const [loading, setLoading] = useState(true); // new loading state

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("tag_table")
                .select(`id, name, category (name)`);

            if (error) {
                console.error("Error fetching tags:", error);
                setLoading(false);
                return;
            }

            const grouped = {};
            data.forEach(({ id, name, category }) => {
                if (!grouped[category.name]) {
                    grouped[category.name] = [];
                }
                grouped[category.name].push({ id, name });
            });

            setGroupings(grouped);
            setLoading(false); // done loading
        })();
    }, []);

    const handleTags = (tagId) => {
        setSelectedTags((prev) =>
            prev.includes(tagId)
                ? prev.filter((id) => id !== tagId)
                : [...prev, tagId]
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-semibold">Loading tags...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl text-center my-4">Questionnaire</h1>

            <div>
                {Object.keys(groupings).map((catName) => (
                    <div key={catName} className="flex flex-col gap-2 w-[60%] mx-auto py-4">
                        <h2 className="text-2xl font-bold">{catName}</h2>
                        <div className="flex flex-wrap gap-2">
                            {groupings[catName].map((tag) => {
                                const isSelected = selectedTags.includes(tag.id);

                                const className = `self-start inline-block rounded-full px-4 py-2 text-white transition ${
                                    isSelected
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-blue-500 hover:bg-blue-600"
                                }`;

                                return (
                                    <button
                                        key={tag.id}
                                        className={className}
                                        onClick={() => handleTags(tag.id)}
                                    >
                                        {tag.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center my-6">
                <button
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 active:scale-95 transition duration-200"
                    onClick={() => {
                        (async () => {
                            if (userUpdate) {
                                const userId = JSON.parse(localStorage.getItem("supabaseSession")).user.id;
                                const userTagData = selectedTags.map((tagId) => ({
                                    user: userId,
                                    tag: tagId,
                                }));



                                const { error: deleteError } = await supabase
                                    .from("user_tag_table")
                                    .delete()
                                    .eq('user', userId);

                                if(deleteError){
                                    console.error(deleteError);
                                    return
                                }

                                console.log(userTagData);

                                const { error: tagError } = await supabase
                                    .from("user_tag_table")
                                    .insert(userTagData)

                                if (tagError) {
                                    console.error(tagError);
                                }

                                navigate("../Account")
                            } else {
                                navigate("./../userInfo", {
                                    state: { selectedTags },
                                });
                            }
                        })();
                    }}

                >
                    Submit Tags
                </button>
            </div>
        </div>
    );
}

export default Questionnaire;
