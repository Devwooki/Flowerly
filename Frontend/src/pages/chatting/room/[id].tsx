import { useRouter } from "next/router";

import ChattingRoom from "@/components/chatting/ChattingRoom";

const User = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  return (
    <>
      <ChattingRoom chattingId={id} />
    </>
  );
};

export default User;
