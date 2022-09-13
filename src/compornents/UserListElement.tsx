import React from "react"
import { useEffect } from "react"
import { User } from "../models/user"
import UserElement from "./UserElement"
import "./UserListElement.css"

type Props = {
    users: User[]
    page: number
}
export default function UserListElement(props: Props) {

    useEffect(() => {
        window.scroll({ top: 0, behavior: 'auto' });
    }, [props.users, props.page])

    return (
        <div className="pl-2 pr-2">
            {
                props.users.map((u) => {
                    return <UserElement user={u} key={u.login}></UserElement>;
                })
            }
        </div>)
}