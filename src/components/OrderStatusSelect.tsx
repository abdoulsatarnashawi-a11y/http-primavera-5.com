'use client';

interface Props {
  orderId: string;
  currentStatus: string;
}

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrderStatusSelect({ orderId, currentStatus }: Props) {
  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: e.target.value }),
    });
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="input-field w-auto text-sm"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
