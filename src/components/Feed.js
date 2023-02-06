import Profile from "./Profile"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Feed() {
    let libs = [];

    const [userdata, setuData] = useState([]);

    const [searchData, setSearchData] = useState('');

    useEffect(() => {
        let getData = async () => {
            try {
                let { data } = await axios.get(`https:api.github.com/users`, {
                    auth: {
                        username: "thedhinakarr",
                        password: "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"
                    }
                });
                setuData(data)
            } catch (error) {
                console.error(error.response.data)
            }
        }
        getData();
    }, []);



    function onChangeHandler(e) {
        setSearchData(
           e.target.value
        )
    }

    async function onClickHandler(e) {
        try {
            e.preventDefault();
            console.log(searchData)

            let { data } = await axios.get(`https://api.github.com/search/users?q=${searchData}`, {
                auth: {
                    username: "thedhinakarr",
                    password: "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"
                }
            });
            console.log(data.items)

           setuData(data.items)
        } catch (error) {
            console.error(error.response.data)
        }
    }

    userdata.forEach((ele) => {
        libs.push(
            <Profile imageUrl={ele.avatar_url} name={ele.login} viewProfileUrl={ele.url} />
        )
    })

    return (<>
        <div className="pt-10  bg-black">
            <h1 className="text-center mx-0  text-2xl font-bold text-white">
                GITHUB SEARCH ENGINE
            </h1>
        </div>

        <form>
            <div class=" flex flex-row bg-black  py-10  justify-center">
                <input onChange={onChangeHandler} type="search" id="default-search" class=" w-1/2  pl-3 text-sm text-white bg-black border border-white " placeholder="Search Profiles" required />
                <button onClick={onClickHandler} type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 border border-green-700 hover:bg-green-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </div >
        </form>

        <hr />


        <section className=" bg-black">

            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {libs}
            </div>
        </section>
      
        <footer className="py-6  bg-gray-800 text-white">
            <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
                <div className="grid justify-center ">
                    <div className="flex flex-col font-semibold self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
                        <span> Why this footer?  </span>
                    </div>

                </div>
            </div>
        </footer>
    </>)
}