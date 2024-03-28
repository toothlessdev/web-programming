import { PerPageController } from "@/components/PerPageController";
import { PostCard } from "@/components/PostCard";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function PostListPage(props) {
  const router = useRouter();

  return (
    <main>
      <div className="controller">
        <PerPageController />
      </div>

      {props.data.posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            createdAt={post.createdAt}
          ></PostCard>
        );
      })}

      <style jsx>{`
        main {
          width: min(100%, 600px);
          margin: 0px auto;
        }
        .controller {
          margin: 10px 0px;
        }
      `}</style>
    </main>
  );
}

export async function getServerSideProps() {
  const page = 1,
    perPage = 10;

  const request = async () => {
    const response = await fetch(
      process.env.API_BASE + `/posts?page=${page}&per_page=${perPage}`
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  };

  const data = await request();

  return { props: { data } };
}
