import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ProfilePage from "./ProfilePage";


export default function Profile({ imageUrl, name, viewProfileUrl }) {
  let navigate = useNavigate();
  const [userdata, setuData] = useState([]);
  const [data, setData] = useState({})

  async function onClickHandler(e) {
    try {
      e.preventDefault();

      let { data } = await axios.get(viewProfileUrl, {
        auth: {
          username: "thedhinakarr",
          password: "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"
        }
      });

      console.log(data.login)
      setData(data);
      navigate(`/profilePage/${data.login}`)
    } catch (error) {
      console.error(error.response.data)
    }

  }
   
  return (
    <article className="flex flex-col justify-center rounded-xl border bg-black p-3 ">

      <div className="object-fill  flex flex-col justify-center">
        <img className="h-59 w-54 border rounded-lg" src={imageUrl} alt="View Profile Photo" />
      </div>

      <div className=" items-center mt-1 p-2">
        <h2 className="text-white font-semibold text-center pt-2 pb-3">{name}</h2>
        <div className=" border-white border py-1 text-white text-center  hover:bg-green-600">
          <a> <button onClick={onClickHandler} className="font-semibold ">View Profile</button></a>
        </div>
      </div>
    </article>
  );

}
