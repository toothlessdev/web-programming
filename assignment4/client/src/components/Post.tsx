import { useRouter } from "next/router";
import styles from "./Post.module.css";

export interface IPost {
    id: number;
    title: string;
    author: string;
    createdAt: string;
}

export const Post: React.FC<IPost> = ({ id, title, author, createdAt }) => {
    const router = useRouter();

    return (
        <div
            className={styles["post-wrapper"]}
            onClick={() => {
                router.push(`/posts/${id}`);
            }}>
            <h3>{title}</h3>
            <p>글쓴이 : {author}</p>
            <p>작성시간 : {createdAt}</p>
        </div>
    );
};
