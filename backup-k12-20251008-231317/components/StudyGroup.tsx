import React, { useState } from 'react';

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

interface StudyGroupProps {
  language: 'en' | 'vi';
}

const StudyGroup: React.FC<StudyGroupProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'members' | 'chat'>('members');

  const t = {
    en: {
      title: 'Study Group',
      members: 'Members',
      chat: 'Chat',
      online: 'Online',
      offline: 'Offline',
      noMembers: 'No members in your study group yet',
      joinGroup: 'Join a Group',
      sendMessage: 'Send message...',
      comingSoon: 'Chat feature coming soon!'
    },
    vi: {
      title: 'Nhóm học tập',
      members: 'Thành viên',
      chat: 'Trò chuyện',
      online: 'Trực tuyến',
      offline: 'Ngoại tuyến',
      noMembers: 'Chưa có thành viên nào trong nhóm học tập của bạn',
      joinGroup: 'Tham gia nhóm',
      sendMessage: 'Gửi tin nhắn...',
      comingSoon: 'Tính năng trò chuyện sắp ra mắt!'
    }
  }[language];

  // Mock data - in real app this would come from props or API
  const members: GroupMember[] = [
    { id: '1', name: 'An Nguyen', avatar: 'https://i.pravatar.cc/150?u=an', status: 'online' },
    { id: '2', name: 'Binh Pham', avatar: 'https://i.pravatar.cc/150?u=binh', status: 'offline' },
    { id: '3', name: 'Chi Tran', avatar: 'https://i.pravatar.cc/150?u=chi', status: 'online' },
  ];

  return (
    <div className="card-glass p-6">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
        <i className="fa-solid fa-users mr-2 text-indigo-500"></i>
        {t.title}
      </h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-slate-200 dark:border-slate-700">
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'members'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('members')}
        >
          {t.members}
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'chat'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          {t.chat}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'members' ? (
        <div className="space-y-3">
          {members.length > 0 ? (
            members.map(member => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-slate-400'
                    }`}
                  ></span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-700 dark:text-slate-300">{member.name}</p>
                  <p className="text-xs text-slate-500">
                    {member.status === 'online' ? t.online : t.offline}
                  </p>
                </div>
                <button className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                  <i className="fa-solid fa-message"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <i className="fa-solid fa-user-group text-4xl text-slate-400 mb-3"></i>
              <p className="text-slate-500 mb-4">{t.noMembers}</p>
              <button className="btn btn-sm btn-primary">
                {t.joinGroup}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="fa-solid fa-comments text-4xl text-slate-400 mb-3"></i>
          <p className="text-slate-500">{t.comingSoon}</p>
        </div>
      )}
    </div>
  );
};

export default StudyGroup;
