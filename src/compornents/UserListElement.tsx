import { User } from "../models/user"
import "./UserListElement.css"

type Props = {
    users: User[]
}
export default function UserListElement(props: Props) {
    return (
        <div>
            {
                props.users.map((u, i) => {
                    return <div key={i}>
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