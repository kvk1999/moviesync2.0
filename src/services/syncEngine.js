// Real-time synchronization state simulator for watch parties

export class SyncEngine {
  constructor(roomId, user) {
    this.roomId = roomId;
    this.user = user || { id: 'usr_' + Math.random().toString(36).substr(2, 5), name: 'Viewer ' + Math.floor(Math.random() * 1000) };
    this.listeners = new Set();
    this.state = {
      isPlaying: false,
      currentTime: 0,
      hostId: this.user.id,
      participants: [
        { id: this.user.id, name: this.user.name + ' (Host)', isHost: true, avatar: '🎬' },
        { id: 'usr_alex', name: 'Alex Rivera', isHost: false, avatar: '🍿' },
        { id: 'usr_sam', name: 'Samantha Chen', isHost: false, avatar: '🎧' }
      ],
      messages: [
        { id: 'm1', user: 'Alex Rivera', text: 'Hey everyone! Excited for this movie! 🎉', time: '10:02 PM' },
        { id: 'm2', user: 'Samantha Chen', text: 'Pass the virtual popcorn! 🍿', time: '10:03 PM' }
      ]
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.state);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb({ ...this.state }));
  }

  togglePlayPause(isPlaying, currentTime) {
    this.state.isPlaying = isPlaying;
    this.state.currentTime = currentTime;
    
    // Add system message
    const actionText = isPlaying ? 'resumed playback' : 'paused playback';
    this.addSystemMessage(`${this.user.name} ${actionText}`);
    this.notify();
  }

  seekTo(currentTime) {
    this.state.currentTime = currentTime;
    const formatted = Math.floor(currentTime) + 's';
    this.addSystemMessage(`${this.user.name} seeked video to ${formatted}`);
    this.notify();
  }

  sendMessage(text) {
    if (!text.trim()) return;
    const newMsg = {
      id: 'msg_' + Date.now(),
      user: this.user.name,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.state.messages.push(newMsg);
    this.notify();
  }

  sendReaction(emoji) {
    const newMsg = {
      id: 'rxn_' + Date.now(),
      user: this.user.name,
      text: `Reacted ${emoji}`,
      isReaction: true,
      emoji,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.state.messages.push(newMsg);
    this.notify();
  }

  addSystemMessage(text) {
    this.state.messages.push({
      id: 'sys_' + Date.now(),
      user: 'System',
      text,
      isSystem: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }
}
