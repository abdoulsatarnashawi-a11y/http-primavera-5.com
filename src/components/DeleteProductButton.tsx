'use client';

interface Props {
  id: string;
}

export default function DeleteProductButton({ id }: Props) {
  async function handleDelete() {
    if (!confirm('Сигурни ли сте?')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    window.location.reload();
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline text-xs">
      Изтрий
    </button>
  );
}
