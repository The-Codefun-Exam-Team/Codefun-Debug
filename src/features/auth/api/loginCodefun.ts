export const loginCodefun = async (username: string, password: string) => {
  const requestToCodefun = await fetch("https://codefun.vn/api/auth", {
    method: "POST",
    body: new URLSearchParams({
      username,
      password,
    }),
    cache: "no-store",
  });
  if (!requestToCodefun.ok) {
    const res = await requestToCodefun.json();
    throw new Error(res.error);
  }
  const res = await requestToCodefun.json();
  return res.data;
};
