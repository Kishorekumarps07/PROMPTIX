import { useState, useRef, useEffect } from 'react';
import './LiveChat.css';

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! 👋 Welcome to PromptiX. How can we help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickReplies = [
        "💼 Services & Pricing",
        "📞 Contact Information",
        "⏰ Business Hours",
        "🚀 Get Started"
    ];

    const botResponses = {
        "services": "We offer Digital Solutions, Innovation Consulting, and Tech Integration. Would you like to know more about any specific service?",
        "pricing": "Our pricing is customized based on your project needs. Click the 'Get Quote' button or fill out our contact form for a personalized quote!",
        "contact": "📧 Email: info@promptix.com\n📱 Phone: +1 (555) 123-4567\n📍 Location: San Francisco, CA",
        "hours": "We're available Monday-Friday, 9 AM - 6 PM PST. For urgent matters, use our contact form and we'll get back to you within 24 hours!",
        "start": "Great! Let's get started. Please fill out our contact form with your project details, and our team will reach out to you within 24 hours!",
        "default": "Thanks for your message! For immediate assistance, please use our contact form or email us at info@promptix.com. Our team will respond shortly!"
    };

    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        if (message.includes('service') || message.includes('what do you do')) {
            return botResponses.services;
        } else if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
            return botResponses.pricing;
        } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
            return botResponses.contact;
        } else if (message.includes('hour') || message.includes('time') || message.includes('available')) {
            return botResponses.hours;
        } else if (message.includes('start') || message.includes('begin') || message.includes('get started')) {
            return botResponses.start;
        } else {
            return botResponses.default;
        }
    };

    const handleSendMessage = (text = inputMessage) => {
        if (!text.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        // Simulate bot typing
        setIsTyping(true);
        setTimeout(() => {
            const botMessage = {
                id: messages.length + 2,
                text: getBotResponse(text),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleQuickReply = (reply) => {
        const replyText = reply.replace(/[^\w\s]/gi, '').trim();
        handleSendMessage(replyText);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            {/* Chat Button */}
            <button
                className={`chat-button ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <span className="chat-icon">✕</span>
                ) : (
                    <span className="chat-icon">💬</span>
                )}
                {!isOpen && <span className="chat-badge">1</span>}
            </button>

            {/* Chat Window */}
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                {/* Chat Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar">
                            <span>🤖</span>
                        </div>
                        <div>
                            <h3>PromptiX Support</h3>
                            <p className="chat-status">
                                <span className="status-dot"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <button
                        className="chat-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat"
                    >
                        ✕
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.sender}`}
                        >
                            {message.sender === 'bot' && (
                                <div className="message-avatar">🤖</div>
                            )}
                            <div className="message-content">
                                <div className="message-bubble">
                                    {message.text}
                                </div>
                                <div className="message-time">
                                    {formatTime(message.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="message bot">
                            <div className="message-avatar">🤖</div>
                            <div className="message-content">
                                <div className="message-bubble typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length <= 2 && (
                    <div className="quick-replies">
                        {quickReplies.map((reply, index) => (
                            <button
                                key={index}
                                className="quick-reply-btn"
                                onClick={() => handleQuickReply(reply)}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}

                {/* Chat Input */}
                <div className="chat-input-container">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="chat-send-btn"
                        onClick={() => handleSendMessage()}
                        disabled={!inputMessage.trim()}
                    >
                        <span>➤</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default LiveChat;
