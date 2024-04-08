import { API_BASE_URL } from "@/services/api";
import { postService } from "@/services/post.service";
import styles from "@/styles/NewPostPage.module.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export interface PageProps {
    title: string;
    author: string;
    content: string;
    createdAt: string;
    image?: string;
}

export default function PostDetailPage(props: PageProps) {
    const router = useRouter();

    const onEditBtnClicked = () => {
        router.push(`/posts/edit/${router.query.id}`);
    };
    const onDeleteBtnClicked = () => {
        postService.deletePost(Number(router.query.id)).then(() => {
            alert("글이 성공적으로 삭제되었습니다");
            router.push(`/`);
        });
    };

    return (
        <main className={styles["main"]}>
            <h2>글 상세정보</h2>

            <div className={styles["input-item"]}>
                <label htmlFor="title">글 제목</label>
                <input id="title" type="text" value={props.title} />
            </div>

            <div className={styles["input-item"]}>
                <label htmlFor="author">글쓴이</label>
                <input id="author" type="text" value={props.author} />
            </div>

            <div className={styles["input-item"]}>
                <label htmlFor="content">내용</label>
                <textarea name="content" id="content" cols={30} rows={10} value={props.content}></textarea>
            </div>

            <div className={styles["input-item"]} style={{ display: "flex", gap: "10px" }}>
                <button onClick={onEditBtnClicked}>수정하기</button>
                <button onClick={onDeleteBtnClicked}>삭제하기</button>
            </div>

            <div className={styles["img-container"]}>{props.image && <img src={API_BASE_URL + props.image} alt="" />}</div>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
    const { id } = context.query;
    const { title, author, content, createdAt, image } = await postService.readPostById(Number(id));

    return {
        props: { title, author, content, createdAt, image },
    };
};
