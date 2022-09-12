import PrefElement from './PrefElement'
import { Octokit } from "@octokit/core";
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
            // パーソナルアクセストークンを設定すればレートリミットが緩和される。
            const octokit = new Octokit({
                //auth: `personal-access-token123`
            })
            try {
                const res = await octokit.request('GET /search/users', { q: `location:${pref}`, per_page: 20, page: page })
                setCount(res.data.total_count)
                setUsers(res.data.items)
            } catch (error) {
                alert("レートリミットに引っかかったかも。時間を置いて試してみてください。(同一IPから1分間に10回まで)")

            }
        };
        f();
    }, [pref, page])

    return (
        <div>
            <div className='sticky'>
                <h1>地元のGitHubユーザー</h1>
                <PrefElement
                    prefChange={(pref: string) => {
                        navigate(`/${pref}/${page}`)
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