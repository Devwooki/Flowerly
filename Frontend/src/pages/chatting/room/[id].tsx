import { useRouter } from "next/router";

import ChattingRoom from "@/components/chatting/room/ChattingRoom";
import { GetServerSideProps } from "next";

const User = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  if (isNaN(id)) {
    // id 값이 유효하지 않은 경우 추가적인 로직 여기서 구현
    return <></>;
  }

  return (
    <>
      <ChattingRoom chattingId={id} />
    </>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  return {
    props: { id },
  };
};
