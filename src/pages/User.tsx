import { useParams } from "react-router-dom";

export default function User() {
  const { userId } = useParams<{ userId: string }>();
  return <h1>用户详情：{userId}</h1>;
}
