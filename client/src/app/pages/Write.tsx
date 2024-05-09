function Write() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className=" text-4xl mt-28">
          <span>Write your story</span>
        </div>
        <div className=" mt-5">
          <button className="py-1 px-3 mb-5 w-fit text-white bg-gray-300">
            Upload Image
          </button>
        </div>
      </div>
      <div className=" flex flex-col">
        <div className="flex justify-center mb-5">
          <input
            type="text"
            className="w-[80%] h-10 max-h-80 border focus:outline-blue-400 rounded-md text-justify p-2"
            placeholder="Title"
          />
        </div>
        <div className="flex justify-center">
          <textarea
            className="w-[80%] max-w-[80%] h-80 border focus:outline-blue-400 rounded-md p-2"
            placeholder="Story"
          />
        </div>
        <div className=" flex justify-center mt-6">
          <button className="py-1 px-3 mb-5 w-fit text-white bg-blue-500 rounded-md">
            Publish
          </button>
        </div>
      </div>
    </>
  );
}

export default Write;
