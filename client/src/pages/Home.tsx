import { Link } from "react-router-dom";
import HomeImage from "../assets/home.png";
import DefaultPoster from "../assets/poster.jpg";
import { useAppDispatch } from "../app/hook";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStories } from "../features/storiesSlice";
import { RootState } from "../app/store";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const { stories, status } = useSelector((state: RootState) => state.stories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <div className="w-full pt-16 mb-32 h-full">
      <div className="flex sm:flex-row flex-col-reverse justify-center gap-20 py-10">
        <div className=" flex flex-col sm:items-start items-center gap-5 px-7">
          <span className=" text-blue-500 font-bold sm:text-5xl text-2xl leading-tight">
            WRITE YOUR OWN STORIES <br />
            AND SHARE WITH <br />
            EVERYONE
          </span>
          <div className="leading-7 text-sm">
            <p className="text-center md:text-start w-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates quae, expedita tenetur magnam sapiente fuga, maxime
              enim quis <br /> eum qui excepturi quas. Cum perferendis ut
              temporibus <br /> similique recusandae exercitationem nobis.
            </p>
          </div>
          <Link to="/write">
            <button className="py-1 px-5 text-white bg-blue-500 rounded-md">
              Write a Story
            </button>
          </Link>
        </div>
        <div>
          <img src={HomeImage} height={350} width={450} alt="Home Icon" />
        </div>
      </div>
      {status === "error" && (
        <div className="mt-5 text-center">
          <h3 className="font-bold">
            Oops, something went wrong. Try again later!
          </h3>
        </div>
      )}
      <div className="flex justify-center mb-10">
        <span className=" text-3xl">Latest Stories</span>
      </div>
      {status === "loading" ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid sm:grid-cols-4 grid-cols-1 gap-7 w-auto px-7">
            {status === "success" &&
              stories?.map((story) => (
                <div key={story._id}>
                  <div className="flex justify-center bg-slate-500 border rounded-md shadow-lg px-10">
                    <img
                      src={
                        story.poster
                          ? `http://localhost:5000/${story.poster}`
                          : DefaultPoster
                      }
                      height={300}
                      width={200}
                      alt={story.title}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4 justify-center p-4">
                    <span className="font-bold">{story.title}</span>
                    <Link to={`/story/${story._id}`}>
                      <button className=" py-1 px-5 text-white bg-blue-500 rounded-md w-fit">
                        Read Story
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
