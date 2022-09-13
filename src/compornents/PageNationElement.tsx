
type Props = {
    pageChange: (page: number) => void
    page: number
}
export default function PageNationElement(props: Props) {
    return (<form className="form mb-5 mt-5" >
        <div className=" text-center">
            <button className="rounded-full bg-blue-500 text-white px-4 py-2 m-2"
                onClick={
                    (e) => {
                        if (props.page > 1) {
                            console.log(props.page)
                            props.pageChange(props.page - 1)
                        }
                        e.preventDefault()
                    }
                }
            >←</button>
            <input type="number" min="1" step="1" value={props.page} readOnly
                className="page rounded-full bg-blue-100 text-black px-4 py-2 m-2 text-l font-black w-32"
                onChange={(e) => { props.pageChange(parseInt(e.target.value)) }}></input>
            <button className="rounded-full bg-blue-500 text-white px-4 py-2 m-2"
                onClick={
                    (e) => {
                        console.log(props.page)
                        props.pageChange(props.page + 1)
                        e.preventDefault()
                    }
                }
            >→</button>

        </div>
    </form >)
}