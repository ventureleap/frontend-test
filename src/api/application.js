export async function add(data) {
  const res = await fetch("/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  return await res.json();
}

export async function update(id, data) {
  const res = await fetch(`/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  return await res.json();
}

export async function remove(id) {
  const res = await fetch(`/applications/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  return await res.json();
}

export async function getList() {
  const res = await fetch("/applications", {
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
