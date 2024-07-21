import PrefElement from './PrefElement'
import React, { useEffect } from 'react';
import UserListElement from './UserListElement';
import "./MainElement.css";
import { useParams, useNavigate } from 'react-router-dom';
import PageNationElement from './PageNationElement';
import FooterElement from './FooterElement';
import { useQuery } from '@tanstack/react-query';

export default function MainElement() {
    const params = useParams();
    const navigate = useNavigate();
    const [cursor, setCursor] = React.useState<string | null>(null);

    useEffect(() => {
        if (params.pref && params.cursor && params.sort) {
            setCursor(params.cursor)
        } else if (params.pref && params.sort) {
            setCursor(null)
        } else {
            navigate(`/of/Tokyo,東京`, { replace: true })
        }
    }, [params.pref, params.cursor]);

    const { isPending, data } = useQuery({
        queryKey: [params.pref, cursor, params.sort],
        queryFn: async () => {
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
            const result = await fetch(`https://githubusers-5dyx7gwrfq-de.a.run.app/?${new URLSearchParams(paramObj).toString()}`);
            const j = await result.json();
            return {
                count: j.data.count,
                start: j.data.search.pageInfo.startCursor,
                end: j.data.search.pageInfo.endCursor,
                users: j.data.search.edges.map((e: any) => e.node),
            }
        }
    });
    if (isPending || data === undefined) return <div>Loading...</div>;
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
                        count={data.count}
                        pref={params.pref ?? ""}
                        sort={params.sort ?? "of"}
                    ></PrefElement >
                </div >
                <UserListElement
                    users={data.users}
                ></UserListElement>
                <PageNationElement
                    cursorChange={(next: boolean) => {
                        if (next) {
                            navigate(`/${params.sort ?? "of"}/${params.pref}/${data.end}`)
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