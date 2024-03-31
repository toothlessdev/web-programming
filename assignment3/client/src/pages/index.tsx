import { Controller } from "@/components/Controller";
import { Post } from "@/components/Post";
import styles from "@/styles/Home.module.css";

export default function Home() {
    return (
        <main className={styles["main"]}>
            <Controller maxPage={5} />

            <Post title="제목" author="author" createdAt="2024-04-01"></Post>
            <Post title="제목" author="author" createdAt="2024-04-01"></Post>
            <Post title="제목" author="author" createdAt="2024-04-01"></Post>
        </main>
    );
}
