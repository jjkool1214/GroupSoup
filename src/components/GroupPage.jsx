import { useEffect } from "react";
import supabase from "../supabaseClient";

function GroupPage(groupId) {


    useEffect(() => {
        const handleGroup = async() => {
            const {data : groupData, error : groupError} = await supabase
                .from('group_table')
                .select('*')
                .eq(groupId);
        }
    }, [])

    return (
        <div>
            GroupPage
        </div>
    )
}

export default GroupPage;