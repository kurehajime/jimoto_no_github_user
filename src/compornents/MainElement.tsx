import PrefElement from './PrefElement'
import React, { useEffect } from 'react';
import { User } from '../models/user';
import UserListElement from './UserListElement';
import "./MainElement.css";
import { useParams, useNavigate } from 'react-router-dom';

export default function MainElement() {
    const params = useParams();
    const navigate = useNavigate();
    const [pref, setPref] = React.useState<string | null>(null);
    const [count, setCount] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [users, setUsers] = React.useState<User[]>([])
    useEffect(() => {
        if (params.pref && params.page) {
            setPref(params.pref)
            setPage(parseInt(params.page))
        } else {
            setPref("Tokyo")
            setPage(1)
        }
    }, [params.pref, params.page])

    useEffect(() => {
        const f = async () => {
            if (!pref) {
                return;
            }
            const res = await fetch(`https://githubuser-5dyx7gwrfq-de.a.run.app/?pref=${pref}&page=${page}`);
            const json = await res.json();
            setCount(json.data.total_count)
            setUsers(json.data.items)
        };
        f();
    }, [pref, page])

    return (
        <div>
            <div className='sticky'>
                <h1>地元のGitHubユーザー</h1>
                <PrefElement
                    prefChange={(pref: string) => {
                        navigate(`/${pref}/${1}`)
                    }}
                    pageChange={(page: number) => {
                        navigate(`/${pref}/${page}`)
                    }}
                    pref={pref ?? ""}
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