import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useParams } from "react-router-dom";

function GroupPage() {
    const [group, setGroup] = useState();
    const {groupId} = useParams();


    useEffect(() => {
        const handleGroup = async() => {
            const {data : groupData, error : groupError} = await supabase
                .from('group_table')
                .select('*')
                .eq(groupId);

            setGroup(groupData);
        }
    }, [])

    return (
        <div>
            GroupPage
        </div>
    )
}

export default GroupPage;