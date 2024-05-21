import { useState } from 'react';
export default function ChatSlider() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>open</button>
      {open && <div>chat</div>}
    </div>
  );
}
