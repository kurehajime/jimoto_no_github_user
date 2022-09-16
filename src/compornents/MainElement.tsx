import PrefElement from './PrefElement'
import React, { useEffect } from 'react';
import { User } from '../models/user';
import UserListElement from './UserListElement';
import "./MainElement.css";
import { useParams, useNavigate } from 'react-router-dom';
import PageNationElement from './PageNationElement';
import FooterElement from './FooterElement';

export default function MainElement() {
    const params = useParams();
    const navigate = useNavigate();
    const [pref, setPref] = React.useState<string | null>(null);
    const [count, setCount] = React.useState(0)
    const [cursor, setCursor] = React.useState<string | null>(null);
    const [start, setStart] = React.useState<string | null>(null);
    const [end, setEnd] = React.useState<string | null>(null);
    const [users, setUsers] = React.useState<User[]>([])
    useEffect(() => {
        if (params.pref && params.cursor) {
            setPref(params.pref)
            setCursor(params.cursor)
        } else if (params.pref) {
            setPref(params.pref)
            setCursor(null)
        } else {
            setPref("Tokyo")
            setCursor(null)
        }
    }, [params.pref, params.cursor])

    useEffect(() => {
        const f = async () => {
            if (!pref) {
                return;
            }
            const res = cursor ? await fetch(`https://githubusers-5dyx7gwrfq-de.a.run.app/?pref=${pref}&cursor=${cursor}`)
                : await fetch(`https://githubusers-5dyx7gwrfq-de.a.run.app/?pref=${pref}`);
            const json = await res.json();
            setCount(json.data.search.userCount)
            setStart(json.data.search.pageInfo.startCursor)
            setEnd(json.data.search.pageInfo.endCursor)
            setUsers(json.data.search.edges.map((e: any) => e.node))
        };
        f();
    }, [pref, cursor])

    return (
        <div className='pl-5  pr-2'>
            <div className='sticky z-50 w-full bg-white-900/80 backdrop-blur-sm'>
                <h1 className='text-2xl lg:text-5xl font-black text-center pt-5 text-black'>🗾 地元のGitHubユーザー</h1>
                <PrefElement
                    prefChange={(pref: string) => {
                        navigate(`/${pref}`)
                    }}
                    count={count}
                    pref={pref ?? ""}
                ></PrefElement >
            </div >
            <UserListElement
                users={users}
            ></UserListElement>
            <PageNationElement
                cursorChange={(next: boolean) => {
                    if (next) {
                        navigate(`/${pref}/${end}`)
                    } else {
                        history.back()
                    }
                }}
            ></PageNationElement>
            <FooterElement
                pref={pref ?? ""}
            ></FooterElement>
        </div >
    )
}