interface Props {
  messages: { id: string; role: string; content: string }[];
}

export default function ChatArea({ messages }: Props) {
  return (
    <div className="chat-area">
      {messages.map(m => (
        <div key={m.id} className={`message ${m.role}`}>{m.content}</div>
      ))}
    </div>
  );
}
