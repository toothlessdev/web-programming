import { useRouter } from "next/router";
import { SetStateAction, useCallback, useRef, useState } from "react";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const PerPageController = () => {
  const router = useRouter();
  const perPageRef = useRef<HTMLSelectElement>(null);
  const [perPage, setPerPage] = useState<number>(10);

  const onChange = useCallback(() => {
    setPerPage(perPageRef.current?.value);
    router.push(`/?page=${1}&per_page=${perPage}`);
  }, []);

  return (
    <>
      <select name="perpage" id="" onChange={onChange} ref={perPageRef}>
        <option value="10" selected>
          10 개씩 보기
        </option>
        <option value="20">20 개씩 보기</option>
        <option value="30">30 개씩 보기</option>
      </select>

      <style jsx>{`
        select {
          display: block;
          width: 130px;
          height: 40px;

          color: #fff;
          background-color: black;

          border-radius: 5px;
          border: 1px solid #fff;
          padding: 0px 5px;
        }
      `}</style>
    </>
  );
};
