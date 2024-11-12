import React, { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  return (
    <section>
      {/* Toggle Button */}
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          id="popup-modal"
          className="px-[40px] lg:px-[160px] fixed inset-0 z-50 flex justify-center items-center bg-[#00000080] backdrop-blur-[15px]"
        >
          <div className="relative px-[20px] lg:px-[160px] py-[80px] w-full max-w-[928px] max-h-full bg-white rounded-lg shadow dark:bg-gray-700">


            {/* Modal Content */}
            <div className=" text-center">

              <h3 className="uppercase mb-[80px] text-xl font-semibold">
                Are you sure you want to delete this product?
              </h3>
              <div className="flex justify-between gap-5 px-[20px]">
              <button
                onClick={closeModal}
                type="button"
                className="text-white bg-primary h-[61px] w-[200px] text-center text-3xl rounded"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="text-white bg-primary h-[61px] w-[200px] text-center text-3xl rounded"
              >
                No
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Modal;
