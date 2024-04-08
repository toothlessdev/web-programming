import { API_BASE_URL, api } from "@/services/api";
import { postService } from "@/services/post.service";
import styles from "@/styles/NewPostPage.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function NewPostPage() {
    const router = useRouter();

    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const onClick = () => {
        const formData = new FormData();
        const image = imageRef.current?.files && imageRef.current?.files[0];
        if (image) formData.append("image", image);

        formData.append("title", titleRef.current?.value as string);
        formData.append("author", authorRef.current?.value as string);
        formData.append("content", contentRef.current?.value as string);

        fetch(API_BASE_URL + "/posts", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                alert("글이 성공적으로 등록되었습니다");
                router.replace("/");
            })
            .catch((err) => {
                console.log(formData);
                alert("글 등록에 실패하였습니다");
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
                <label htmlFor="content">이미지 업로드</label>
                <input type="file" accept="image/jpg, image/jpeg, image/png" ref={imageRef} />
            </div>

            <div className={styles["input-item"]}>
                <button onClick={onClick}>글쓰기</button>
            </div>
        </main>
    );
}
