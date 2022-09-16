
type Props = {
    cursorChange: (next: boolean) => void
}
export default function PageNationElement(props: Props) {
    return (<form className="form mb-5 mt-5" >
        <div className=" text-center">
            <button className="rounded-full bg-green-100 text-black px-4 py-2 m-2 text-3xl hutoji"
                onClick={(e) => {
                    props.cursorChange(false)
                    e.preventDefault()
                }}
            >戻る</button>
            <button className="rounded-full bg-green-100 text-black px-4 py-2 m-2 text-3xl hutoji"
                onClick={(e) => {
                    props.cursorChange(true)
                    e.preventDefault()
                }}
            >次へ</button>

        </div>
    </form >)
}