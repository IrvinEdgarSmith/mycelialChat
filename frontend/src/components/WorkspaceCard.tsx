import { useState } from 'react';

export interface Thread {
  id: string;
  name: string;
}

export interface Workspace {
  id: string;
  name: string;
  threads: Thread[];
  showIntegrations?: boolean;
}

interface Props {
  workspace: Workspace;
  onUpdate: (ws: Workspace) => void;
  onSelectThread: (wsId: string, threadId: string) => void;
}

export default function WorkspaceCard({ workspace, onUpdate, onSelectThread }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(workspace.name);

  const addThread = () => {
    const id = Date.now().toString();
    const newThread: Thread = { id, name: 'New Thread' };
    onUpdate({ ...workspace, threads: [...workspace.threads, newThread] });
  };

  const toggleIntegration = () => {
    onUpdate({ ...workspace, showIntegrations: !workspace.showIntegrations });
  };

  const saveName = () => {
    onUpdate({ ...workspace, name });
    setEditing(false);
  };

  return (
    <div className="workspace-card">
      <div className="workspace-header">
        {editing ? (
          <input value={name} onChange={e => setName(e.target.value)} onBlur={saveName} />
        ) : (
          <span onClick={() => setExpanded(!expanded)}>{workspace.name}</span>
        )}
        <button onClick={() => setEditing(!editing)}>✏️</button>
        <button onClick={toggleIntegration}>Notion Integrations</button>
        <button onClick={addThread}>New Thread</button>
      </div>
      {expanded && (
        <ul className="thread-list">
          {workspace.threads.map(t => (
            <li key={t.id} onClick={() => onSelectThread(workspace.id, t.id)}>{t.name}</li>
          ))}
        </ul>
      )}
      {workspace.showIntegrations && (
        <div className="integration-menu">Workspace Notion Settings</div>
      )}
    </div>
  );
}
