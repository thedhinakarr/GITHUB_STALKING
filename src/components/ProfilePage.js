import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ProfilePage() {

    const [udata, setuData] = useState({});
    const [reposdata,setreposdata] = useState([]);

    let navigate = useNavigate();
    let params = useParams();

    let libs=[];

    useEffect(() => {
        let getData = async () => {
            try {

                let { data } = await axios.get(`https:api.github.com/users/${params.id}`, {
                    auth: {
                        username: "thedhinakarr",
                        password: "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"
                    }
                });

                let repoData = await axios.get(`https:api.github.com/users/${params.id}/repos`, {
                    auth: {
                        username: "thedhinakarr",
                        password: "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"
                    }
                });

                console.log(repoData.data)
                setuData(data);
                setreposdata(repoData.data);

            } catch (error) {
                console.error(error.response.data)
            }
        }
        getData();
    }, []);

   let x =reposdata.slice(0,5);

    x.forEach((ele) => {
        libs.push(
            <div className="font-semibold text-lg mb-10 p-9 rounded-lg text-center border">
            <div className="flex flex-col justify-evenly rounded-lg">
                <div><a href={ele.html_url} target="_blank" className="hover:text-green-500">{ele.name}</a></div>
                <div>{ele.description}</div>
            </div>
        </div>
        )
    })

    function onButtonClick() {
        navigate("/")
    }

    return (<>
        <div className="flex flex-row h-screen text-white">

            <div className="flex flex-nowrap rounded-lg flex-col w-2/5 h-screen  border-white py-3 px-3  ">
                <div className="mb-2 font-semibold rounded-lg text-lg items-center p-3 border">Name: <span className="text-green-500">{udata.name}</span></div>
                <div className="w-64 mb-2 object-fill font-semibold text-lg rounded-lg p-3 items-center"><img src={udata.avatar_url} /></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">BIO: <span className="text-green-500">{udata.bio}</span><p></p></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">Open For Hiring: <span className="text-green-500">{udata.hireable}</span></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">Go to Github: <span className="text-green-500"><a href={udata.html_url} target="_blank">{udata.html_url}</a> </span> </div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">Followers:<span className="text-green-500"> {udata.followers}</span></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">following: <span className="text-green-500">{udata.following}</span></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">Companies: <span className="text-green-500">{udata.company}</span></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">Location: <span className="text-green-500">{udata.location}</span></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">Email: <span className="text-green-500">{udata.email}</span></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">website: <span className="text-green-500"><a href={udata.blog} target="_blank">{udata.blog}</a></span></div>
                <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center border">twitter: <span className="text-green-500">{udata.twitter_username}</span></div>
            </div>

            <div className="flex flex-nowrap flex-col w-3/5 py-9 px-5 border-white ">
                <button onClick={onButtonClick} className="font-semibold  hover:bg-green-500 w-40 h-10 py-1 mb-10 text-center border">Go Back</button>
            
             {libs}
            </div>
        </div>
    </>

    );
}