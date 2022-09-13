import { url } from "inspector"
import React from "react"
import { User } from "../models/user"
import "./UserElement.css"

type Props = {
    user: User
}
export default function UserListElement(props: Props) {
    const [grass, setGrass] = React.useState(false);
    return (
        <div key={props.user.login} className="rounded-lg backdrop-blur bg-gradient-to-r from-cyan-100 to-blue-100 pl-3 mt-3" >
            <div className="flex flex-row pb-1  pt-3">
                <img src={props.user.avatar_url} className="icon " />
                <h2 className="text-2xl font-black basis-3/4"><a href={`https://github.com/${props.user.login}`}>{props.user.login}</a></h2>
            </div>
            <div className="flex flex-row pb-1">
                <div className=" pr-4"><img src={`https://img.shields.io/github/stars/${props.user.login}?style=social`} /></div>
                <div className=" pr-4"><img src={`https://img.shields.io/github/followers/${props.user.login}?style=social`} /></div>
                <div className=" pr-4"><img src={`https://img.shields.io/twitter/follow/${props.user.login}?style=social`} /></div>
            </div>
            <details className=" pb-3" onToggle={
                (e) => {
                    if (e.target instanceof HTMLDetailsElement) {
                        setGrass(e.target.open)
                    }
                }
            }>
                <summary>最近の活動</summary>
                {
                    grass ? <img src={`https://grass-graph.appspot.com/images/${props.user.login}.png`} /> : <div>loading...</div>
                }
            </details>
        </div>)
}