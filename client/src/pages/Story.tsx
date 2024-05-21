import { FaEye } from "react-icons/fa";
import DefaultPoster from "../assets/poster.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import { StoriesRes } from "../interface/stories";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hook";
import { deleteStory } from "../features/storiesSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Stories() {
  const user = useSelector((state: RootState) => state.auth.data);

  const { id } = useParams();
  const [story, setStory] = useState<StoriesRes>();
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      await dispatch(deleteStory(id));
      navigate("/");
    }
  };

  useEffect(() => {
    axios
      .get(`/api/stories/${id}`)
      .then((res) => {
        setStory(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error as string ?? "An error occured!")
      });
  }, [id]);

  return (
    <div className="w-full pt-32">
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="mb-4">
            <img
              src={
                story?.poster
                  ? `http://localhost:5000/${story.poster}`
                  : DefaultPoster
              }
              height={300}
              width={200}
              alt={story?.title ?? "Poster"}
            />
          </div>
          {user && user?.userData._id === story?.author._id ? (
            <div className="inline-flex w-fit gap-2">
              <Link to={`/update/${id}`}>
                <button className="bg-gray-400 text-white rounded py-0.5 px-3">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(story._id)}
                className="bg-red-500 text-white rounded py-0.5 px-3"
              >
                Delete
              </button>
            </div>
          ) : null}
          <h1 className="text-blue-500 mt-6">
            Published by {story?.author.username ?? "Anonymous"}
          </h1>
          <p className="text-gray-400 flex mt-6 items-center gap-2">
            <FaEye className="size-4" /> Seen by {story?.views ?? 0}
          </p>
          <p className="mt-4 text-center px-7 w-auto mb-32">{story?.text}</p>
        </div>
      )}
    </div>
  );
}
