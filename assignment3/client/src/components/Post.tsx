import styles from "./Post.module.css";

export interface IPost {
    title: string;
    author: string;
    createdAt: string;
}

export const Post: React.FC<IPost> = ({ title, author, createdAt }) => {
    return (
        <div className={styles["post-wrapper"]}>
            <h3>{title}</h3>
            <p>글쓴이 : {author}</p>
            <p>작성시간 : {createdAt}</p>
        </div>
    );
};
