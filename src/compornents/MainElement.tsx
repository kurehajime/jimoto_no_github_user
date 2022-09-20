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
    const [count, setCount] = React.useState(0)
    const [cursor, setCursor] = React.useState<string | null>(null);
    const [, setStart] = React.useState<string | null>(null);
    const [end, setEnd] = React.useState<string | null>(null);
    const [users, setUsers] = React.useState<User[]>([]);

    useEffect(() => {
        if (params.pref && params.cursor && params.sort) {
            setCursor(params.cursor)
        } else if (params.pref && params.sort) {
            setCursor(null)
        } else {
            navigate(`/of/Tokyo`, { replace: true })
        }
    }, [params.pref, params.cursor])

    useEffect(() => {
        const f = async () => {
            if (!params.pref) {
                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const paramObj: any = {}
            paramObj["pref"] = params.pref

            if (cursor) {
                paramObj["cursor"] = cursor
            }
            if (params.sort && params.sort !== "" && params.sort !== "of") {
                paramObj["sort"] = params.sort
            }
            const res = await fetch(`https://githubusers-5dyx7gwrfq-de.a.run.app/?${new URLSearchParams(paramObj).toString()}`)
            const json = await res.json();
            setCount(json.data.search.userCount)
            setStart(json.data.search.pageInfo.startCursor)
            setEnd(json.data.search.pageInfo.endCursor)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setUsers(json.data.search.edges.map((e: any) => e.node))
        };
        f();
    }, [params.pref, cursor, params.sort])

    return (
        <div className='flex justify-center'>
            <div>
                <div className='sticky z-50 w-full bg-white-900/80 backdrop-blur-sm'>
                    <a href="https://kurehajime.github.io/jimoto_no_github_user"><h1 className='text-2xl lg:text-5xl font-black text-center pt-5 text-black'>🗾 地元のGitHubユーザー</h1></a>
                    <PrefElement
                        prefChange={(pref: string) => {
                            navigate(`/${params.sort ?? "of"}/${pref}`)
                        }}
                        sortChange={(sort: string) => {
                            navigate(`/${sort ?? "of"}/${params.pref}`)
                        }}
                        count={count}
                        pref={params.pref ?? ""}
                        sort={params.sort ?? "of"}
                    ></PrefElement >
                </div >
                <UserListElement
                    users={users}
                ></UserListElement>
                <PageNationElement
                    cursorChange={(next: boolean) => {
                        if (next) {
                            navigate(`/${params.sort ?? "of"}/${params.pref}/${end}`)
                        } else {
                            history.back()
                        }
                    }}
                ></PageNationElement>
                <FooterElement
                    pref={params.pref ?? ""}
                ></FooterElement>
            </div>
        </div >
    )
}