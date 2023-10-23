import { useRouter } from "next/router";

const user = () => {
  const router = useRouter();
  const { nobody } = router.query;

  return <div>{nobody}가 누군데</div>;
};

export default user;
