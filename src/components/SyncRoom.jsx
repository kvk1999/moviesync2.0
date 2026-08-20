import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Send, Users, Smile, Share2, MessageSquare, Volume2, VolumeX } from 'lucide-react';
import { SyncEngine } from '../services/syncEngine.js';
import './SyncRoom.css';

const EMOJIS = ["🔥", "🍿", "😱", "😂", "👏", "❤️"];

export default function SyncRoom({ movie, roomCode, user, onLeaveRoom }) {
  const [engine, setEngine] = useState(null);
  const [roomState, setRoomState] = useState(null);
  const [inputMsg, setInputMsg] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const syncInstance = new SyncEngine(roomCode, user);
    setEngine(syncInstance);

    const unsubscribe = syncInstance.subscribe(state => {
      setRoomState(state);
    });

    return () => unsubscribe();
  }, [roomCode, user]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [roomState?.messages]);

  if (!roomState || !engine) return <div className="loading-room">Loading synchronized room...</div>;

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      engine.togglePlayPause(true, video.currentTime);
    } else {
      video.pause();
      engine.togglePlayPause(false, video.currentTime);
    }
  };

  const handleSeek = (e) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
    engine.seekTo(targetTime);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    engine.sendMessage(inputMsg);
    setInputMsg('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sync-room-container animate-fade-in">
      {/* Header Bar */}
      <div className="room-header">
        <div className="room-title-info">
          <span className="live-badge"><span className="live-dot"></span> WATCH PARTY</span>
          <h2>{movie.title}</h2>
          <span className="room-code-tag">Room: <strong>{roomCode}</strong></span>
        </div>

        <div className="room-actions">
          <button className="btn btn-secondary" onClick={handleCopyLink}>
            <Share2 size={16} />
            {copied ? 'Link Copied!' : 'Share Room'}
          </button>
          <button className="btn btn-primary" onClick={onLeaveRoom}>
            Leave Party
          </button>
        </div>
      </div>

      {/* Main Grid: Video Player + Sidebar */}
      <div className="room-grid">
        {/* Video Player Column */}
        <div className="player-column">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              src={movie.videoUrl}
              poster={movie.bannerUrl}
              muted={isMuted}
              onTimeUpdate={() => {
                if (videoRef.current) {
                  // Local progress update
                }
              }}
            />

            {/* Custom Controls Bar */}
            <div className="player-controls">
              <button className="ctrl-btn" onClick={handlePlayPause}>
                {roomState.isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button className="ctrl-btn" onClick={() => handleSeek({ target: { value: 0 } })}>
                <RotateCcw size={18} />
              </button>

              <input
                type="range"
                className="seek-bar"
                min="0"
                max={videoRef.current?.duration || 100}
                value={videoRef.current?.currentTime || 0}
                onChange={handleSeek}
              />

              <button className="ctrl-btn" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>

          {/* Quick Reaction Emoji Toolbar */}
          <div className="reaction-bar">
            <span className="reaction-label">Quick Reactions:</span>
            {EMOJIS.map(emoji => (
              <button key={emoji} className="emoji-btn" onClick={() => engine.sendReaction(emoji)}>
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Column: Participants + Chat */}
        <div className="sidebar-column">
          {/* Active Participants */}
          <div className="participants-box">
            <div className="box-header">
              <Users size={16} />
              <span>Participants ({roomState.participants.length})</span>
            </div>
            <div className="participants-list">
              {roomState.participants.map(p => (
                <div key={p.id} className="participant-chip">
                  <span>{p.avatar} {p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Chat */}
          <div className="chat-box">
            <div className="box-header">
              <MessageSquare size={16} />
              <span>Party Chat</span>
            </div>

            <div className="chat-messages">
              {roomState.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`chat-msg ${msg.isSystem ? 'system-msg' : msg.isReaction ? 'rxn-msg' : ''}`}
                >
                  {!msg.isSystem && <span className="msg-user">{msg.user}:</span>}
                  <span className="msg-text">{msg.text}</span>
                  <span className="msg-time">{msg.time}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSendChat}>
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
              />
              <button type="submit" className="btn btn-primary chat-send-btn">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
