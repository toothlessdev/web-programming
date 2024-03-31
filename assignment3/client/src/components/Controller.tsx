/* eslint-disable react/display-name */
import { ChangeEvent, ChangeEventHandler, forwardRef, useEffect } from "react";
import styles from "./Controller.module.css";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export interface IController {
    maxPage: number;
}

export const Controller = forwardRef<HTMLSelectElement, IController>((props, ref) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <div className={styles["controller-wrapper"]}>
            <select
                name="per-page"
                id=""
                ref={ref}
                defaultValue="10"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    router.replace(`${router.pathname}?page=${searchParams.get("page")}&per_page=${e.target.value}`);
                }}>
                <option value="10">10개씩</option>
                <option value="20">20개씩</option>
                <option value="30">30개씩</option>
            </select>

            <div className={styles["controller-page"]}>
                {Array.from({ length: props.maxPage }, (v, k) => {
                    return (
                        <div
                            key={k + 1}
                            className={styles["page"]}
                            onClick={() => {
                                router.replace(`${router.pathname}?page=${k + 1}&per_page=${searchParams.get("per_page")}`);
                            }}>
                            {k + 1}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
