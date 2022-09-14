import "./PrefElement.css";

type Props = {
    prefChange: (pref: string) => void
    pref: string
    count: number
}
export default function PrefElement(props: Props) {
    const prefs = [
        ["Japan", "日本"],
        ["Hokkaido", "北海道"],
        ["Aomori", "青森県"],
        ["Iwate", "岩手県"],
        ["Miyagi", "宮城県"],
        ["Akita", "秋田県"],
        ["Yamagata", "山形県"],
        ["Fukushima", "福島県"],
        ["Ibaraki", "茨城県"],
        ["Tochigi", "栃木県"],
        ["Gunma", "群馬県"],
        ["Saitama", "埼玉県"],
        ["Chiba", "千葉県"],
        ["Tokyo", "東京都"],
        ["Kanagawa", "神奈川県"],
        ["Niigata", "新潟県"],
        ["Toyama", "富山県"],
        ["Ishikawa", "石川県"],
        ["Fukui", "福井県"],
        ["Yamanashi", "山梨県"],
        ["Nagano", "長野県"],
        ["Gifu", "岐阜県"],
        ["Shizuoka", "静岡県"],
        ["Aichi", "愛知県"],
        ["Mie", "三重県"],
        ["Shiga", "滋賀県"],
        ["Kyoto", "京都府"],
        ["Osaka", "大阪府"],
        ["Hyogo", "兵庫県"],
        ["Nara", "奈良県"],
        ["Wakayama", "和歌山県"],
        ["Tottori", "鳥取県"],
        ["Shimane", "島根県"],
        ["Okayama", "岡山県"],
        ["Hiroshima", "広島県"],
        ["Yamaguchi", "山口県"],
        ["Tokushima", "徳島県"],
        ["Kagawa", "香川県"],
        ["Ehime", "愛媛県"],
        ["Kochi", "高知県"],
        ["Fukuoka", "福岡県"],
        ["Saga", "佐賀県"],
        ["Nagasaki", "長崎県"],
        ["Kumamoto", "熊本県"],
        ["Oita", "大分県"],
        ["Miyazaki", "宮崎県"],
        ["Kagoshima", "鹿児島県"],
        ["Okinawa", "沖縄県"],
    ]
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const now = new Date();
        const y = (now.getFullYear()).toString().padStart(4, "0");
        const m = (now.getMonth() + 1).toString().padStart(2, "0");
        const d = (now.getDate()).toString().padStart(2, "0");
        window.open(`https://connpass.com/search/?q=&start_from=${y}%2F${m}%2F${d}&start_to=&prefectures=${props.pref.toLowerCase()}`, '_blank');
        e.preventDefault();
    }

    return (<form className="form" >
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row pb-1 pt-3 content-start">
                <select name="pref select border border-gray-300 form-input"
                    value={props.pref}
                    onChange={(e) => { props.prefChange(e.target.value) }}>
                    {
                        prefs.map((p, i) => {
                            return (
                                <option value={p[0]}
                                    key={i}
                                >{p[1]}</option>)
                        })
                    }
                </select>
                <div className="pl-5 form-input">{props.count}人</div>
            </div>
            <div className="flex flex-row pb-1 pt-3 content-end justify-end	">
                <button className="bg-white w-48 border-solid border-2 border-gray-300 rounded-md hover:bg-gray-200"
                    onClick={onClick}
                >{prefs.filter(p => { return p[0] === props.pref }).map(p => p[1])[0]}の勉強会</button>
            </div>
        </div>
    </form >)
}