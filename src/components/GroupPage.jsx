import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation.jsx";

function GroupPage() {
    const [group, setGroup] = useState([]);
    const {groupId} = useParams();


    useEffect(() => {
        const handleGroup = async() => {
            const {data : groupData, error : groupError} = await supabase
                .from('group_table')
                .select('*')
                .eq("id", groupId);
            setGroup(groupData[0]);
            }
        handleGroup();
    }, [])

    return (
        <div>   
            <Navigation></Navigation>

            <div>
                {group.id} : {group.name}
            </div>
            <div> Created : {group.created}</div>
            <div> Active : {group.active}</div>

        </div>
    )
}

export default GroupPage;