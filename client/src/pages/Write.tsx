import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "../axios";
import { StoriesRes } from "../interface/stories";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Write() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.data);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [poster, setPoster] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const file = e.target.files?.[0];
      if (!file) {
        throw new Error("No file selected");
      }
      formData.append("story-poster", file);
      const { data } = await axios.post("/poster", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPoster(data.URL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const isUpdate = Boolean(id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      isUpdate
        ? await axios.put(`/api/stories/${id}`, { title, text, poster })
        : await axios.post("/api/stories/", { title, text, poster });

      navigate("/");
    } catch (error) {
      toast.error(error as string ?? "An error occured!")
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/stories/${id}`)
        .then(({ data }: { data: StoriesRes }) => {
          setTitle(data.title);
          setText(data.text);
          setPoster(data.poster);
        })
        .catch((error) => {
          toast.error(error as string ?? "An error occured!")
        });
    }
  }, [id]);

  if (!user && !window.localStorage.getItem("token")) {
    window.alert("You should login first!");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className=" text-4xl mt-28">
          <span>Write your story</span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <form
            className="w-full"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {poster && (
              <div className="flex flex-col justify-center items-center mt-3 mb-3">
                <div>
                  <button
                    onClick={() => setPoster("")}
                    className="py-0.5 px-3 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-3">
                  <img
                    src={`http://localhost:5000/${poster}`}
                    alt="poster"
                    width={200}
                    height={300}
                  />
                </div>
              </div>
            )}
            <div className=" mt-5 flex justify-center">
              <input
                name="story-poster"
                type="file"
                hidden
                ref={inputRef}
                onChange={handleFile}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  inputRef.current?.click();
                }}
                className="py-1 px-3 mb-5 w-fit text-white bg-gray-500 rounded-md"
              >
                Upload Image
              </button>
            </div>

            <div className=" flex flex-col">
              <div className="flex justify-center mb-5">
                <input
                  type="text"
                  className="w-[80%] h-10 max-h-80 border focus:outline-blue-400 rounded-md text-justify p-2"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <textarea
                  className="w-[80%] max-w-[80%] h-80 border focus:outline-blue-400 rounded-md p-2"
                  placeholder="Story"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className=" flex justify-center mt-6 mb-24">
                <button className="py-1 px-3 mb-5 w-fit text-white bg-blue-500 rounded-md">
                  Publish
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
