import { useRouter } from "next/router";
import { useCallback } from "react";

export interface IPostCard {
    id: number;
    title: string;
    createdAt: string;
    author: string;
}

export const PostCard: React.FC<IPostCard> = ({ id, title, createdAt, author }) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/posts/${id}`);
    }, [id, router]);

    return (
        <>
            <div onClick={handleClick}>
                <h2>{title}</h2>
                <p>글쓴이 : {author}</p>
                <p>작성시간 : {createdAt}</p>
            </div>

            <style jsx>{`
                div {
                    margin: 10px 0px;
                    padding: 10px;
                    border: 1px solid #fff;
                    border-radius: 5px;
                }
                div > h2 {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                div:hover {
                    cursor: pointer;
                }
            `}</style>
        </>
    );
};
