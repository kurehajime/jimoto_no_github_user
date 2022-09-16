import "./UserListElement.css"

type Props = {
    pref: string
}
export default function FooterElement(props: Props) {

    return (
        props.pref !== "" ? <footer className="text-center text-green-900 text-sm hutoji mb-2">
            GitHubのlocationに「{props.pref}」を含む文字列を設定しているユーザーを表示しています。
        </footer> : <></>)
}