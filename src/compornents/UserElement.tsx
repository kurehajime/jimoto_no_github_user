import React from "react"
import { User } from "../models/user"
import "./UserElement.css"

type Props = {
    user: User
}
export default function UserListElement(props: Props) {
    const [grass, setGrass] = React.useState(false);
    return (
        <div key={props.user.login} className="user">
            <img src={props.user.avatar_url} className="icon" />
            <a href={`https://github.com/${props.user.login}`}>{props.user.login}</a>
            <div><img src={`https://img.shields.io/github/stars/${props.user.login}?style=social`} /></div>
            <div><img src={`https://img.shields.io/github/followers/${props.user.login}?style=social`} /></div>
            <div><img src={`https://img.shields.io/twitter/follow/${props.user.login}?style=social`} /></div>
            <details onToggle={
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