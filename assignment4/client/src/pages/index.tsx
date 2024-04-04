import { Controller } from "@/components/Controller";
import { Post } from "@/components/Post";
import { postService } from "@/services/post.service";
import { Post as PostType } from "@/services/post.types";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface PageProps {
    posts: Omit<PostType, "content">[];
}

export default function Home(props: PageProps) {
    return (
        <main className={styles["main"]}>
            <Controller maxPage={5} />

            {props.posts.map((element) => {
                return <Post key={element.id} id={element.id} title={element.title} author={element.author} createdAt={element.createdAt}></Post>;
            })}
        </main>
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
    let page = context.query.page ?? "1";
    let per_page = context.query.per_page ?? "10";

    const data = await postService.readPosts(page as string, per_page as string);

    return {
        props: {
            posts: data.posts,
        },
    };
};
