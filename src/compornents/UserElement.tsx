import React from "react"
import { User } from "../models/user"
import "./UserElement.css"

type Props = {
    user: User
}
export default function UserListElement(props: Props) {
    const [grass, setGrass] = React.useState(false);
    return (
        <div key={props.user.login} className="rounded-lg backdrop-blur bg-gradient-to-r from-gray-50 to-gray-50 pl-3 mt-3 border border-green-500" >
            <div className="flex flex-row pb-1  pt-3">
                <a href={`https://github.com/${props.user.login}`}><img src={props.user.avatar_url} className="icon " /></a>
                <h2 className="text-4xl font-black basis-3/4"><a href={`https://github.com/${props.user.login}`}>{props.user.login}</a></h2>
            </div>
            <div className="flex flex-row pb-1">
                <div className=" pr-4"><img src={`https://img.shields.io/github/stars/${props.user.login}?color=yellow&label=Github%20Stars&style=for-the-badge`} /></div>
                <div className=" pr-4"><img src={`https://img.shields.io/github/followers/${props.user.login}?color=green&label=Github%20Folloewers&style=for-the-badge`} /></div>
                <div className=" pr-4">
                    <a href={`http://twitter.com/${props.user.login}`}>
                        <img src={`https://img.shields.io/twitter/follow/${props.user.login}?color=00acee&label=Twitter%20Folloewers&style=for-the-badge`} />
                    </a>
                </div>
            </div>
            <details className=" pb-3" onToggle={
                (e) => {
                    if (e.target instanceof HTMLDetailsElement) {
                        setGrass(e.target.open)
                    }
                }
            }>
                <summary className="">最近の活動</summary>
                {
                    grass ? <div className="activity" ><img src={`https://grass-graph.appspot.com/images/${props.user.login}.png`} alt="Loading..." /></div> : <div>loading...</div>
                }
            </details>
        </div>)
}