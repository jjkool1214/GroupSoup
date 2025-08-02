import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient"; // make sure this path is correct

const boxes = [
    { label: "Username", key: "username" },
    { label: "Password", key: "password" },
    { label: "Email", key: "email" },
    { label: "Display Name", key: "displayName" },
    { label: "Address", key: "address" },
    { label: "Description", key: "description" },
    { label: "Max Capacity", key: "maxCapacity" },
];

const checkEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const UserInfoBusiness = () => {
    const [businessInfo, setBusinessInfo] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();



    const descriptorList = location.state?.data || []; // [{ id, descriptors }]
    const selectedDescriptors = location.state?.selectedDescriptors || []; // [{ id, descriptors }]

    const geocodeAndSaveBusiness = async (businessId, businessAddress) => {
        // 1. Call the Edge Function to get the coordinates
        const { data: geocodeResponse, error: geocodeError } = await supabase.functions.invoke('geocode-address', {
            body: { address: businessAddress },
        });      



        if (geocodeError) {
            console.error("Failed to geocode address:", geocodeError);
            return null;
        }

        const { latitude, longitude } = geocodeResponse;
        
        // 2. Construct the PostGIS POINT string for the database update
        const pointString = `POINT(${longitude} ${latitude})`;
        
        // 3. Update the business record with the new location data
        const { error: updateError } = await supabase
            .from("business_table")
            .update({ location: pointString })
            .eq("id", businessId);

        if (updateError) {
            console.error("Failed to update database with coordinates:", updateError);
            return null;
        }

        console.log("Successfully geocoded address and saved coordinates.");
        return { latitude, longitude };
    };

    const handleBusinessSignUp = async () => {
        setSubmitted(true);

        const { email, password, username, displayName, address, description, maxCapacity} = businessInfo;

        if (!email || !password || !checkEmail(email)) {
            setIsValid(false);
            return;
        }

        // Step 1: Auth sign up
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            console.error("Signup failed:", signUpError.message);
            return;
        }

        const userId = signUpData.user?.id;
        if (!userId) {
            console.error("User ID not returned. Email confirmation may be required.");
            return;
        }

        // Step 2: Insert into business_table
        const { data: businessData, error: businessError } = await supabase
            .from("business_table")
            .insert({
                user: userId,
                display_name: displayName,
                description: description,
                address: address,
                max_capacity: parseInt(maxCapacity) || null,
            })
            .select()
            .single();

        if (businessError) {
            console.error("Business creation failed:", businessError.message);
            return;
        }

        const businessId = businessData?.id;
        if (!businessId) {
            console.error("Business ID not returned.");
            return;
        }

        const coordinates = await geocodeAndSaveBusiness(businessId, address);
        if (!coordinates) {
             console.error("Geocoding failed. Proceeding without coordinates.");
        }

        // Step 3: Link descriptors to business
        const descriptorData = selectedDescriptors.map((descriptor) => ({
            business: businessId,
            descriptor: descriptor.id,
        }));

        console.log(descriptorData);

        const { error: descriptorInsertError } = await supabase
            .from("business_descriptors_table")
            .insert(descriptorData);

        if (descriptorInsertError) {
            console.error("Descriptor insert failed:", descriptorInsertError.message);
            return;
        }

        // Step 4: Save session
        if (signUpData.session) {
            localStorage.setItem("supabaseSession", JSON.stringify(signUpData.session));
        }

        // Step 5: Redirect to dashboard
        navigate("..//businessDashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
                <h2 className="text-2xl font-bold text-center">Business Sign Up</h2>

                {!isValid && (
                    <p className="text-red-600 text-sm text-center">
                        Please enter a valid email and fill out all required fields.
                    </p>
                )}

                {boxes.map(({ label, key }) => (
                    <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="mb-1 font-medium text-gray-700">{label}</label>
                        <input
                            id={key}
                            type={key === "password" ? "password" : "text"}
                            value={businessInfo[key] || ""}
                            onChange={(e) =>
                                setBusinessInfo({ ...businessInfo, [key]: e.target.value })
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                ))}

                <button
                    onClick={handleBusinessSignUp}
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default UserInfoBusiness;
