import React from "react";

export const RegisterSuccess = () => {
    return (
        <div className="fixed z-40 top-10 w-full h-full flex justify-center items-start pt-4">
            <div className="z-50 max-w-sm sm:max-w-md w-full mx-4 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="max-w-md mx-auto pt-6 sm:pt-8 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 px-4 sm:px-5 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-4 sm:mb-5 rounded-full">
                        <svg
                            viewBox="0 0 48 48"
                            height="80"
                            width="80"
                            y="0px"
                            x="0px"
                            xmlns="http://www.w3.org/2000/svg"
                            className="sm:h-24 sm:w-24 lg:h-32 lg:w-32"
                        >
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                y2="37.081"
                                y1="10.918"
                                x2="10.918"
                                x1="37.081"
                                id="SVGID_1__8tZkVc2cOjdg_gr1"
                            >
                                <stop stopColor="#60fea4" offset="0"></stop>
                                <stop stopColor="#6afeaa" offset=".033"></stop>
                                <stop stopColor="#97fec4" offset=".197"></stop>
                                <stop stopColor="#bdffd9" offset=".362"></stop>
                                <stop stopColor="#daffea" offset=".525"></stop>
                                <stop stopColor="#eefff5" offset=".687"></stop>
                                <stop stopColor="#fbfffd" offset=".846"></stop>
                                <stop stopColor="#fff" offset="1"></stop>
                            </linearGradient>
                            <circle
                                fill="url(#SVGID_1__8tZkVc2cOjdg_gr1)"
                                r="18.5"
                                cy="24"
                                cx="24"
                            ></circle>
                            <path
                                d="M35.401,38.773C32.248,41.21,28.293,42.66,24,42.66C13.695,42.66,5.34,34.305,5.34,24	c0-2.648,0.551-5.167,1.546-7.448"
                                strokeWidth="3"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            ></path>
                            <path
                                d="M12.077,9.646C15.31,6.957,19.466,5.34,24,5.34c10.305,0,18.66,8.354,18.66,18.66	c0,2.309-0.419,4.52-1.186,6.561"
                                strokeWidth="3"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            ></path>
                            <polyline
                                points="16.5,23.5 21.5,28.5 32,18"
                                strokeWidth="3"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            ></polyline>
                        </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-semibold mb-3 sm:mb-4 lg:mb-5">
                        Account has been Created Successfully.
                    </h4>
                    <p className="text-gray-300 font-medium text-sm sm:text-base lg:text-lg">
                        Your account is activated!
                    </p>
                </div>
            </div>
        </div>
    );
};

export const RegisterExist = () => {
    return (
        <div className="fixed z-40 top-10 w-full h-full flex justify-center items-start pt-4">
            <div className="z-50 max-w-sm sm:max-w-md w-full mx-4 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="max-w-md mx-auto pt-6 sm:pt-8 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 px-4 sm:px-5 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-4 sm:mb-5 rounded-full">
                        <img src="/cross.webp" alt="Error" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-semibold mb-3 sm:mb-4 lg:mb-5">
                        User already exists.
                    </h4>
                    <p className="text-gray-300 font-medium text-sm sm:text-base lg:text-lg">
                        Please login to continue.
                    </p>
                </div>
            </div>
        </div>
    );
};

export const RegisterFail = () => {
    return (
        <div className="fixed z-40 top-10 w-full h-full flex justify-center items-start pt-4">
            <div className="z-50 max-w-sm sm:max-w-md w-full mx-4 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="max-w-md mx-auto pt-6 sm:pt-8 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 px-4 sm:px-5 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-4 sm:mb-5 rounded-full">
                        <img src="/cross.webp" alt="Error" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-semibold mb-3 sm:mb-4 lg:mb-5">
                        Registration failed.
                    </h4>
                    <p className="text-gray-300 font-medium text-sm sm:text-base lg:text-lg">
                        Please try again.
                    </p>
                </div>
            </div>
        </div>
    );
};

export const checkbox = () => {
    return (
        <div className="fixed z-40 top-10 w-full h-full flex justify-center items-start pt-4">
            <div className="z-50 max-w-sm sm:max-w-md w-full mx-4 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="max-w-md mx-auto pt-6 sm:pt-8 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 px-4 sm:px-5 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-4 sm:mb-5 rounded-full">
                        <img src="/cross.webp" alt="Error" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-semibold mb-3 sm:mb-4 lg:mb-5">
                        Please Check Terms and Conditions
                    </h4>
                    <p className="text-gray-300 font-medium text-sm sm:text-base lg:text-lg">
                        Please check the terms and conditions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export const WorkAdded = () => {
    <div className="fixed z-40 top-10 w-full h-full flex justify-center items-start pt-4">
        <div className="z-50 max-w-sm sm:max-w-md w-full mx-4 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="max-w-md mx-auto pt-6 sm:pt-8 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 px-4 sm:px-5 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-4 sm:mb-5 rounded-full">
                    <img src="/tick.webp" alt="Error" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-semibold mb-3 sm:mb-4 lg:mb-5">
                    Work Added Successfully
                </h4>
                <p className="text-gray-300 font-medium text-sm sm:text-base lg:text-lg">
                    Work Added Successfully
                </p>
            </div>
        </div>
    </div>
}


export const Addprojectmodal = () => {
    return (
        <div className="fixed z-40 top-10 w-full h-full flex justify-center items-start pt-4">
            <div className="z-50 max-w-sm sm:max-w-md w-full mx-4 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="max-w-md mx-auto pt-6 sm:pt-8 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 px-4 sm:px-5 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-4 sm:mb-5 rounded-full">
                        <svg
                            viewBox="0 0 48 48"
                            height="80"
                            width="80"
                            y="0px"
                            x="0px"
                            xmlns="http://www.w3.org/2000/svg"
                            className="sm:h-24 sm:w-24 lg:h-32 lg:w-32"
                        >
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                y2="37.081"
                                y1="10.918"
                                x2="10.918"
                                x1="37.081"
                                id="SVGID_1__8tZkVc2cOjdg_gr1"
                            >
                                <stop stopColor="#60fea4" offset="0"></stop>
                                <stop stopColor="#6afeaa" offset=".033"></stop>
                                <stop stopColor="#97fec4" offset=".197"></stop>
                                <stop stopColor="#bdffd9" offset=".362"></stop>
                                <stop stopColor="#daffea" offset=".525"></stop>
                                <stop stopColor="#eefff5" offset=".687"></stop>
                                <stop stopColor="#fbfffd" offset=".846"></stop>
                                <stop stopColor="#fff" offset="1"></stop>
                            </linearGradient>
                            <circle
                                fill="url(#SVGID_1__8tZkVc2cOjdg_gr1)"
                                r="18.5"
                                cy="24"
                                cx="24"
                            ></circle>
                            <path
                                d="M35.401,38.773C32.248,41.21,28.293,42.66,24,42.66C13.695,42.66,5.34,34.305,5.34,24	c0-2.648,0.551-5.167,1.546-7.448"
                                strokeWidth="3"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            ></path>
                            <path
                                d="M12.077,9.646C15.31,6.957,19.466,5.34,24,5.34c10.305,0,18.66,8.354,18.66,18.66	c0,2.309-0.419,4.52-1.186,6.561"
                                strokeWidth="3"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            ></path>
                            <polyline
                                points="16.5,23.5 21.5,28.5 32,18"
                                strokeWidth="3"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                stroke="#10e36c"
                                fill="none"
                            ></polyline>
                        </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-semibold mb-3 sm:mb-4 lg:mb-5">
                        Project Added SucssesFully
                    </h4>
                    <p className="text-gray-300 font-medium text-sm sm:text-base lg:text-lg">
                        Go Back
                    </p>
                </div>
            </div>
        </div>
    );
};