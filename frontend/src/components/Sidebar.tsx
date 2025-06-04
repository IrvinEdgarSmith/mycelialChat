import type { Workspace } from './WorkspaceCard';
import WorkspaceCard from "./WorkspaceCard";

interface SidebarProps {
  workspaces: Workspace[];
  onAddWorkspace: () => void;
  onUpdateWorkspace: (ws: Workspace) => void;
  onSelectThread: (wsId: string, threadId: string) => void;
}

export default function Sidebar({ workspaces, onAddWorkspace, onUpdateWorkspace, onSelectThread }: SidebarProps) {
  return (
    <div className="sidebar">
      <button className="new-workspace" onClick={onAddWorkspace}>New Workspace</button>
      <div className="workspace-list">
        {workspaces.map(ws => (
          <WorkspaceCard
            key={ws.id}
            workspace={ws}
            onUpdate={onUpdateWorkspace}
            onSelectThread={onSelectThread}
          />
        ))}
      </div>
    </div>
  );
}
