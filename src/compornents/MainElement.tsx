import PrefElement from './PrefElement'
import { Octokit } from "@octokit/core";
import React, { useEffect } from 'react';
import { User } from '../models/user';
import UserListElement from './UserListElement';
export default function MainElement() {
    const [pref, setPref] = React.useState("Tokyo")
    const [count, setCount] = React.useState(0)
    const [users, setUsers] = React.useState<User[]>([])
    useEffect(() => {
        const f = async () => {
            const octokit = new Octokit({})
            const res = await octokit.request('GET /search/users', { q: `location:${pref}`, per_page: 20 })
            setCount(res.data.total_count)
            setUsers(res.data.items)
        };
        f();
    }, [pref])

    return (
        <div>
            <h1>地元のGithubユーザー</h1>
            <PrefElement
                prefChange={(pref: string) => { setPref(pref) }}
                pref={pref}
            ></PrefElement>
            <div>{count}件</div>
            <UserListElement
                users={users}
            ></UserListElement>
        </div>
    )
}