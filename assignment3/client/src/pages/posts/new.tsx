import { api } from "@/services/api";
import { postService } from "@/services/post.service";
import styles from "@/styles/NewPostPage.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function NewPostPage() {
    const router = useRouter();

    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const onClick = () => {
        postService
            .createPost({
                title: titleRef.current?.value as string,
                author: authorRef.current?.value as string,
                content: contentRef.current?.value as string,
            })
            .then(() => {
                alert("글이 성공적으로 등록되었습니다");
                router.replace("/");
            });
    };

    return (
        <main className={styles["main"]}>
            <h2>글쓰기</h2>

            <div className={styles["input-item"]}>
                <label htmlFor="title">글 제목</label>
                <input id="title" type="text" ref={titleRef} />
            </div>

            <div className={styles["input-item"]}>
                <label htmlFor="author">글쓴이</label>
                <input id="author" type="text" ref={authorRef} />
            </div>

            <div className={styles["input-item"]}>
                <label htmlFor="content">내용</label>
                <textarea name="content" id="content" cols={30} rows={10} ref={contentRef}></textarea>
            </div>

            <div className={styles["input-item"]}>
                <button onClick={onClick}>글쓰기</button>
            </div>
        </main>
    );
}
