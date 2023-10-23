import { useRouter } from "next/router";

const user = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}를 가져왔다 임마</div>;
};

export default user;
