import React from "react";

export const Month = () => {
  return (
    <>
      <div className="order-2 bg-gray-50 col-start-2 m-2 col-span-10 row-span-4 md:row-span-1 md:col-start-3 lg:col-start-3 md:col-span-8 lg:col-span-6 xl:col-span-4 p-6 flex justify-center items-center place-content-center h-full">
        <div className="custom relative flex justify-center items-center">
          {/* صور الخلفية */}
          <img
            className="hidden xl:block object-cover"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_6_bg.png"
            alt="gradient bg"
          />
          <img
            className="hidden md:block xl:hidden object-cover"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_6_bg_ipad.png"
            alt="gradient bg"
          />
          <img
            className="md:hidden object-cover"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_6_bg_mobile.png"
            alt="gradient bg"
          />

          {/* بطاقات التسعير */}
          <div className="absolute top-0 w-full flex xl:flex-row flex-col justify-center items-end space-y-6 xl:space-y-0 xl:space-x-8 lg:px-52 xl:p-10 2xl:p-20 md:px-28 py-12 px-4">
            {/* البطاقة الأولى */}
            <div className="transition duration-700 hover:shadow-2xl cursor-pointer hover:-translate-y-4 ease-in-out w-full xl:w-full 2xl:w-96 flex flex-col justify-center items-center px-4 py-6 md:p-8 xl:pb-10 bg-white shadow-md border rounded-lg border-gray-200">
              <div className="hidden h-32 xl:flex justify-center items-center w-full">
                <img
                  className="w-12"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_6_icon1.png"
                  alt="individual"
                />
              </div>
              <div className="flex justify-between xl:justify-center items-center w-full">
                <h1 className="w-32 xl:w-auto text-xl md:text-2xl xl:text-4xl font-medium leading-5 md:leading-6 xl:leading-9 text-gray-800">
                  Individual
                </h1>
                <div className="w-20 flex xl:hidden justify-center items-center">
                  <img
                    className="w-8"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_6_icon1.png"
                    alt="individual"
                  />
                </div>
                <p className="w-28 flex justify-end items-end text-left text-base xl:hidden leading-none text-gray-500">
                  $0/m
                </p>
              </div>
              <button className="w-full sm:w-80 lg:w-96 mt-8 md:mt-10 xl:mt-6 transition duration-300 ease-in-out bg-blue-700 py-3 md:py-4 rounded xl:w-full xl:hover:bg-blue-200 xl:focus:bg-blue-300 xl:bg-blue-100 text-white xl:text-blue-700 text-base font-medium leading-4">
                Create a free account
              </button>
              <p className="hidden xl:block text-base mt-4 leading-none text-gray-500">
                $0/m
              </p>
              <hr className="w-full my-6 xl:my-8 text-gray-200" />
              <p className="text-base font-semibold leading-none text-gray-600">
                WHAT YOU CAN DO
              </p>
              <div className="w-full xl:h-32 xl:mb-8 mt-6 md:mt-8 xl:mt-12 flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_6_svg1.svg"
                    alt="tick"
                  />
                  <p className="text-base leading-none text-gray-500">
                    Includes 1,000 visitors/mo
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_6_svg1.svg"
                    alt="tick"
                  />
                  <p className="text-base leading-none text-gray-500">2 Sources</p>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/pricing_6_svg1.svg"
                    alt="tick"
                  />
                  <p className="text-base leading-none text-gray-500">
                    300+ Integrations
                  </p>
                </div>
              </div>
            </div>

            {/* باقي البطاقات */}
            {/* يمكن تكرار نفس الكود مع تعديل المحتويات الخاصة بالبطاقات الأخرى */}
          </div>
        </div>
      </div>
    </>
  );
};