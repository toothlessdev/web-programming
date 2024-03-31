import { postService } from "@/services/post.service";
import styles from "@/styles/NewPostPage.module.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function EditPostPage(props: PageProps) {
    const router = useRouter();

    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const onEditBtnClicked = () => {
        postService
            .patchPost(Number(router.query.id), {
                title: titleRef.current?.value as string,
                author: authorRef.current?.value as string,
                content: contentRef.current?.value as string,
            })
            .then(() => {
                alert("글이 성공적으로 수정되었습니다");
                router.push(`/`);
            });
    };

    return (
        <main className={styles["main"]}>
            <h2>글 수정하기</h2>

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

            <div className={styles["input-item"]} style={{ display: "flex", gap: "10px" }}>
                <button onClick={onEditBtnClicked}>수정하기</button>
            </div>
        </main>
    );
}
