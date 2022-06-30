export async function register(data) {
  const res = await fetch("https://frontend-test.getsandbox.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  return await res.json();
}

export async function login(data) {
  const res = await fetch("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  return await res.json();
}

export async function getInfo() {
  const res = await fetch("/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  return await res.json();
}
