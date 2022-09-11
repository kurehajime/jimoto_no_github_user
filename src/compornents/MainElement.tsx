import PrefElement from './PrefElement'
import { Octokit } from "@octokit/core";
import React, { useEffect } from 'react';
import { User } from '../models/user';
import UserListElement from './UserListElement';
import "./MainElement.css";
export default function MainElement() {
    const [pref, setPref] = React.useState("Tokyo")
    const [count, setCount] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [users, setUsers] = React.useState<User[]>([])
    useEffect(() => {
        const f = async () => {
            const octokit = new Octokit({
                //auth: `personal-access-token123`
            })
            const res = await octokit.request('GET /search/users', { q: `location:${pref}`, per_page: 20, page: page })
            setCount(res.data.total_count)
            setUsers(res.data.items)
        };
        f();
    }, [pref, page])

    return (
        <div>
            <div className='sticky'>
                <h1>地元のGithubユーザー</h1>
                <PrefElement
                    prefChange={(pref: string) => {
                        setPref(pref)
                        setPage(1)
                    }}
                    pageChange={(page: number) => { setPage(page) }}
                    pref={pref}
                    page={page}
                ></PrefElement>
                <div>{count}件</div>
            </div>
            <UserListElement
                users={users}
                page={page}
            ></UserListElement>
        </div>
    )
}