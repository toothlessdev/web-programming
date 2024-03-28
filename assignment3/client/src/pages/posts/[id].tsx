import { useRouter } from "next/router";

export default function PostDetailPage(props) {
    const router = useRouter();

    return (
        <>
            <main>
                <div>
                    <h2>{props.title}</h2>
                    <p>글쓴이 : {props.author}</p>
                    <p>작성시간 : {props.createdAt}</p>
                    <p>내용</p>
                    <p className="content">{props.content}</p>
                </div>
            </main>

            <style jsx>{`
                div {
                    width: min(100%, 600px);
                    margin: 0px auto;
                    padding: 20px 0px;
                }
                div > h2 {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .content {
                    margin: 10px 0px;
                    border: 1px solid #fff;
                    border-radius: 10px;
                    padding: 10px;
                }
            `}</style>
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    const request = async () => {
        const response = await fetch(process.env.API_BASE + `/posts/${id}`);
        if (!response.ok) throw new Error();
        return response.json();
    };

    const data = await request();

    return { props: data };
}
