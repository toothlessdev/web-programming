// eslint-disable-next-line react/display-name
export const PerPageController = () => {
  return (
    <>
      <select name="perpage" id="">
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
