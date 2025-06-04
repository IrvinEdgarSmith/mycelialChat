
interface Props {
  open: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (k: string) => void;
  notionKey: string;
  setNotionKey: (k: string) => void;
}

export default function GlobalSettings({ open, onClose, apiKey, setApiKey, notionKey, setNotionKey }: Props) {
  if (!open) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Global Settings</h2>
        <label>
          OpenRouter API Key
          <input value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </label>
        <label>
          Notion API Key
          <input value={notionKey} onChange={e => setNotionKey(e.target.value)} />
        </label>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
