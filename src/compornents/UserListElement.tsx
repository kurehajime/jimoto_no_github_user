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
                    </div>;
                })
            }
        </div>)
}