'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BG } from '@/lib/i18n';

interface BackupMeta {
  id: string;
  label: string | null;
  createdBy: string | null;
  createdAt: string;
}

export default function BackupPanel() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backups, setBackups] = useState<BackupMeta[]>([]);
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadBackups = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/backup', { credentials: 'include' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || BG.admin.backupForbidden);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setBackups(data.backups ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadBackups();
  }, [loadBackups]);

  async function handleCreate() {
    setCreating(true);
    setError('');
    setMessage('');
    const res = await fetch('/api/admin/backup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || BG.admin.backupForbidden);
      setCreating(false);
      return;
    }
    setLabel('');
    setMessage(BG.admin.backupCreated);
    await loadBackups();
    setCreating(false);
  }

  async function handleDownload(id: string, backupLabel: string | null) {
    setError('');
    const res = await fetch(`/api/admin/backup/${id}`, { credentials: 'include' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || BG.admin.backupForbidden);
      return;
    }
    const blob = new Blob([JSON.stringify(data.payload ?? data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const safeLabel = (backupLabel || id).replace(/\s+/g, '-');
    anchor.href = url;
    anchor.download = `primavera5-backup-${safeLabel}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function handleRestore(id: string) {
    if (!window.confirm(BG.admin.backupRestoreConfirm)) return;
    setError('');
    const res = await fetch(`/api/admin/backup/${id}`, { credentials: 'include' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || BG.admin.backupForbidden);
      return;
    }
    const restoreRes = await fetch('/api/admin/backup/restore', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: data.payload }),
    });
    const restoreData = await restoreRes.json().catch(() => ({}));
    if (!restoreRes.ok) {
      setError(restoreData.error || BG.admin.backupForbidden);
      return;
    }
    setMessage(BG.admin.backupRestored);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!window.confirm(BG.admin.backupDeleteConfirm)) return;
    setError('');
    const res = await fetch(`/api/admin/backup/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || BG.admin.backupForbidden);
      return;
    }
    setMessage(BG.admin.backupDeleted);
    await loadBackups();
  }

  async function handleFileRestore(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const payload = parsed.payload ?? parsed;
      if (!payload || typeof payload !== 'object') {
        throw new Error(BG.admin.backupInvalidFile);
      }
      if (!window.confirm(BG.admin.backupRestoreConfirm)) return;
      const res = await fetch('/api/admin/backup/restore', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || BG.admin.backupForbidden);
        return;
      }
      setMessage(BG.admin.backupRestored);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : BG.admin.backupInvalidFile);
    } finally {
      e.target.value = '';
    }
  }

  return (
    <div className="card p-6 space-y-4">
      <h2 className="text-xl font-bold text-primary">{BG.admin.backupTitle}</h2>
      <p className="text-sm text-gray-600">{BG.admin.backupDescription}</p>

      {message && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">{message}</div>}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>}

      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="label">{BG.admin.backupLabel}</label>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="input-field"
            placeholder={BG.admin.backupLabelPlaceholder}
          />
        </div>
        <button type="button" onClick={handleCreate} disabled={creating} className="btn-primary">
          {creating ? '...' : BG.admin.backupCreate}
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn-outline"
        >
          {BG.admin.backupUpload}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={handleFileRestore}
        />
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">{BG.admin.backupLoading}</p>
      ) : backups.length === 0 ? (
        <p className="text-sm text-gray-500">{BG.admin.backupEmpty}</p>
      ) : (
        <div className="space-y-3">
          {backups.map((backup) => (
            <div key={backup.id} className="rounded-lg border p-4 flex flex-wrap gap-3 justify-between items-center">
              <div>
                <p className="font-medium">{backup.label || backup.id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(backup.createdAt).toLocaleString('bg-BG')}
                  {backup.createdBy ? ` · ${backup.createdBy}` : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn-outline text-xs py-1 px-3"
                  onClick={() => handleDownload(backup.id, backup.label)}
                >
                  {BG.admin.backupDownload}
                </button>
                <button
                  type="button"
                  className="btn-outline text-xs py-1 px-3"
                  onClick={() => handleRestore(backup.id)}
                >
                  {BG.admin.backupRestore}
                </button>
                <button
                  type="button"
                  className="text-xs py-1 px-3 text-red-600 hover:underline"
                  onClick={() => handleDelete(backup.id)}
                >
                  {BG.admin.backupDelete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
