import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import GlobalSettings from './components/GlobalSettings';
import type { Workspace } from './components/WorkspaceCard';
import "./App.css";

interface Message { id: string; role: string; content: string; threadId: string; wsId: string; }

function App() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [messages] = useState<Message[]>([]);
  const [currentThread, setCurrentThread] = useState<{wsId: string; threadId: string} | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [notionKey, setNotionKey] = useState('');

  const addWorkspace = () => {
    const id = Date.now().toString();
    setWorkspaces([...workspaces, { id, name: 'New Workspace', threads: [] }]);
  };

  const updateWorkspace = (ws: Workspace) => {
    setWorkspaces(workspaces.map(w => w.id === ws.id ? ws : w));
  };

  const selectThread = (wsId: string, threadId: string) => {
    setCurrentThread({ wsId, threadId });
  };

  const currentMessages = messages.filter(m => currentThread && m.threadId === currentThread.threadId && m.wsId === currentThread.wsId);

  return (
    <div className="app-container">
      <Sidebar workspaces={workspaces} onAddWorkspace={addWorkspace} onUpdateWorkspace={updateWorkspace} onSelectThread={selectThread} />
      <div className="main-area">
        <button className="settings-button" onClick={() => setSettingsOpen(true)}>⚙️</button>
        {currentThread ? (
          <ChatArea messages={currentMessages} />
        ) : (
          <div className="placeholder">Select a thread</div>
        )}
      </div>
      <GlobalSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} apiKey={apiKey} setApiKey={setApiKey} notionKey={notionKey} setNotionKey={setNotionKey} />
    </div>
  );
}

export default App;
