// ... existing code ...

export async function getGuestBooks() {
  const res = await fetch('/api/guest-books');
  if (!res.ok) throw new Error('Failed to fetch guest books');
  return res.json();
}

export async function createGuestBook(data: any) {
  const res = await fetch('/api/guest-books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create guest book');
  return res.json();
}