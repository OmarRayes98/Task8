
const Modal = ({isOpen,handleYesOrNoDelete}:{isOpen:boolean,handleYesOrNoDelete:(shouldDelete:boolean)=>void}) => {

  return (
    <section>


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
                onClick={()=>handleYesOrNoDelete(true)}
                type="button"
                className="text-white bg-primary h-[61px] w-[200px] text-center text-3xl rounded"
              >
                Yes
              </button>
              <button
                onClick={()=>handleYesOrNoDelete(false)}
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
