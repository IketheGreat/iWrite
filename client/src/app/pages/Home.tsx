import { Link } from "react-router-dom";
import HomeImage from "../../assets/home.png";
import Poster from "../../assets/poster.jpg";

function Home() {
  return (
    <div className="w-full pt-16 mb-32 h-full">
      <div className="flex sm:flex-row flex-col justify-center gap-20 py-10">
        <div className=" flex flex-col sm:items-start items-center gap-5">
          <span className=" text-blue-500 font-bold sm:text-5xl text-2xl leading-tight">
            WRITE YOUR OWN STORIES <br />
            AND SHARE WITH <br />
            EVERYONE
          </span>
          <div className="leading-7 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            quae, <br /> expedita tenetur magnam sapiente fuga, maxime enim quis{" "}
            <br /> eum qui excepturi quas. Cum perferendis ut temporibus <br />{" "}
            similique recusandae exercitationem nobis.
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
      <div className="flex justify-center mb-5">
        <span className=" text-3xl">Latest Stories</span>
      </div>
      <div className="flex gap-5 justify-center">
        {[1, 2, 3].map((story, index) => (
          <div key={index}>
            <div className="bg-gray-300 rounded-md border px-10">
              <img src={Poster} height={300} width={200} alt="Poster image" />
            </div>
            <div className="flex flex-col items-center gap-4 justify-center p-4">
              <span className="font-bold">Story {story}</span>
              <button className=" py-1 px-5 text-white bg-blue-500 rounded-md w-fit">
                Read Story
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
