import { useState } from "react";

const boxes = [
    { label: "Username", key: "username" },
    { label: "Password", key: "password" },
    { label: "Email", key: "email" },
    { label: "Display Name", key: "displayName" },
    { label: "Address", key: "address" },
];

const SignUpBusiness = () => {
    const [businessInfo, setBusinessInfo] = useState({});

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
                <h2 className="text-2xl font-bold text-center">Business Sign Up</h2>

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
                    onClick={() => console.log(businessInfo)}
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default SignUpBusiness;
