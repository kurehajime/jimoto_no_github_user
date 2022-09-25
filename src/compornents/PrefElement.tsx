import "./PrefElement.css";

type Props = {
    prefChange: (pref: string) => void
    sortChange: (sort: string) => void
    pref: string
    count: number
    sort: string
}
export default function PrefElement(props: Props) {
    const prefs = [
        ["Japan,日本", "日本"],
        ["Hokkaido,Sapporo,北海道,札幌", "北海道"],
        ["Aomori,青森", "青森県"],
        ["Iwate,Morioka,岩手,盛岡", "岩手県"],
        ["Miyagi,Sendai,宮城,仙台", "宮城県"],
        ["Akita,秋田", "秋田県"],
        ["Yamagata,山形", "山形県"],
        ["Fukushima,福島", "福島県"],
        ["Ibaraki,Mito,茨城,水戸", "茨城県"],
        ["Tochigi,Utsunomiya,栃木,宇都宮", "栃木県"],
        ["Gunma,Maebashi,群馬,前橋", "群馬県"],
        ["Saitama,埼玉", "埼玉県"],
        ["Chiba,千葉", "千葉県"],
        ["Tokyo,東京", "東京都"],
        ["Kanagawa,Yokohama,神奈川,横浜", "神奈川県"],
        ["Niigata,新潟", "新潟県"],
        ["Toyama,富山", "富山県"],
        ["Ishikawa,Kanazawa,石川,金沢", "石川県"],
        ["Fukui,福井", "福井県"],
        ["Yamanashi,Kofu,山梨,甲府", "山梨県"],
        ["Nagano,長野", "長野県"],
        ["Gifu,岐阜", "岐阜県"],
        ["Shizuoka,静岡", "静岡県"],
        ["Aichi,Nagoya,愛知", "愛知県"],
        ["Mie,Tsu,三重", "三重県"], // 天津が大量に引っかかるので「津」の漢字表記は泣く泣く除外
        ["Shiga,Otsu,滋賀,大津", "滋賀県"],
        ["Kyoto,京都", "京都府"],
        ["Osaka,大阪", "大阪府"],
        ["Hyogo,Kobe,兵庫,神戸", "兵庫県"],
        ["Nara,奈良", "奈良県"],
        ["Wakayama,和歌山", "和歌山県"],
        ["Tottori", "鳥取県"],
        ["Shimane,Matsue,島根,松江", "島根県"],
        ["Okayama,岡山", "岡山県"],
        ["Hiroshima,広島", "広島県"],
        ["Yamaguchi,山口", "山口県"],
        ["Tokushima,徳島", "徳島県"],
        ["Kagawa,Takamatsu,香川,高松", "香川県"],
        ["Ehime,Matsuyama,愛媛,松山", "愛媛県"],
        ["Kochi,高知", "高知県"],
        ["Fukuoka,福岡", "福岡県"],
        ["Saga,佐賀", "佐賀県"],
        ["Nagasaki,長崎", "長崎県"],
        ["Kumamoto,熊本", "熊本県"],
        ["Oita,大分", "大分県"],
        ["Miyazaki,宮崎", "宮崎県"],
        ["Kagoshima,鹿児島", "鹿児島県"],
        ["Okinawa,Naha,沖縄,那覇", "沖縄県"],
    ]
    const sorts = [
        ["of", "おすすめ順"],
        ["repositories", "リポジトリ数順"],
        ["followers", "フォロワー数順"],
        ["joined", "新着順"],
        ["joined-asc", "古株順"],
    ]
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const now = new Date();
        const y = (now.getFullYear()).toString().padStart(4, "0");
        const m = (now.getMonth() + 1).toString().padStart(2, "0");
        const d = (now.getDate()).toString().padStart(2, "0");
        window.open(`https://connpass.com/search/?q=&start_from=${y}%2F${m}%2F${d}&start_to=&prefectures=${props.pref.toLowerCase().split(",")[0]}`, '_blank');
        e.preventDefault();
    }
    return (<form className="form" >
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row pb-1 pt-3 content-start">
                <div className="flex flex-row">
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
                    <select name="pref select border border-gray-300 form-input"
                        value={props.sort}
                        onChange={(e) => { props.sortChange(e.target.value) }}>
                        {
                            sorts.map((p, i) => {
                                return (
                                    <option value={p[0]}
                                        key={i}
                                    >{p[1]}</option>)
                            })
                        }
                    </select>
                    <div className="pl-5 form-input">{props.count}人</div>
                </div>
            </div>
            <div className="flex flex-row pb-1 pt-3 content-end justify-end	">
                <button className="bg-white w-48 border-solid border-2 border-gray-300 hover:bg-gray-200 hutoji"
                    onClick={onClick}
                >👥 {prefs.filter(p => { return p[0] === props.pref }).map(p => p[1])[0]}の勉強会</button>
            </div>
        </div>
    </form >)
}