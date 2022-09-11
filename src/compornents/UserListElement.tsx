import { useEffect } from "react"
import { User } from "../models/user"
import "./UserListElement.css"

type Props = {
    users: User[]
    page: number
}
export default function UserListElement(props: Props) {

    useEffect(() => {
        console.log("UserListElement")
        window.scroll({ top: 0, behavior: 'auto' });
    }, [props.users, props.page])

    return (
        <div>
            {
                props.users.map((u) => {
                    return <div key={u.login} className="user">
                        <img src={u.avatar_url} className="icon" />
                        <a href={`https://github.com/${u.login}`}>{u.login}</a>
                        <div><img src={`https://img.shields.io/github/stars/${u.login}?style=social`} /></div>
                        <div><img src={`https://img.shields.io/github/followers/${u.login}?style=social`} /></div>
                        <div><img src={`https://img.shields.io/twitter/follow/${u.login}?style=social`} /></div>
                    </div>;
                })
            }
        </div>)
}