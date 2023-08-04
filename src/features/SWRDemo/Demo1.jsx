import useSWR from "swr";

const fetchLogin = async () => await fetch("/login.json").then((resp) => resp.json()).then(() => Promise.reject());
const fetchUser = (id) => fetch(`/${id}.json`).then((resp) => resp.json());

const login = async () => {
  const loginResp = await fetchLogin();
  return await fetchUser(loginResp.id);
};



export default function Demo1 () {
  const { data: user } = useSWR("login", login);


  return <div>current user:{JSON.stringify(user)}</div>;
}