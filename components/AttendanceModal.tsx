import React, { useState } from 'react';
import { Student, AttendanceRecord } from '../types';

interface AttendanceModalProps {
  students: Student[];
  classId: string;
  onClose: () => void;
  onSaveAttendance: (attendance: Record<string, AttendanceRecord>) => void;
  language: 'en' | 'vi';
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ students, classId, onClose, onSaveAttendance, language }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>>(() => {
    const initial: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = {};
    students.forEach(s => initial[s.id] = 'Present');
    return initial;
  });
  const [notes, setNotes] = useState<Record<string, string>>({});

  const t = {
    en: {
      title: "Take Attendance",
      dateLabel: "Date",
      studentHeader: "Student",
      statusHeader: "Status",
      notesHeader: "Notes",
      present: "Present",
      absent: "Absent",
      late: "Late",
      excused: "Excused",
      notePlaceholder: "Add note (optional)",
      cancel: "Cancel",
      save: "Save Attendance",
      quickActions: "Quick Actions",
      markAllPresent: "Mark All Present",
      summary: (present: number, total: number) => `${present} of ${total} present`,
    },
    vi: {
      title: "Điểm danh",
      dateLabel: "Ngày",
      studentHeader: "Học sinh",
      statusHeader: "Trạng thái",
      notesHeader: "Ghi chú",
      present: "Có mặt",
      absent: "Vắng mặt",
      late: "Đi muộn",
      excused: "Có phép",
      notePlaceholder: "Thêm ghi chú (tùy chọn)",
      cancel: "Hủy",
      save: "Lưu điểm danh",
      quickActions: "Thao tác nhanh",
      markAllPresent: "Đánh dấu tất cả có mặt",
      summary: (present: number, total: number) => `${present} trong ${total} có mặt`,
    }
  }[language];

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleNoteChange = (studentId: string, note: string) => {
    setNotes(prev => ({ ...prev, [studentId]: note }));
  };

  const handleMarkAllPresent = () => {
    const allPresent: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = {};
    students.forEach(s => allPresent[s.id] = 'Present');
    setAttendance(allPresent);
  };

  const handleSave = () => {
    const attendanceRecords: Record<string, AttendanceRecord> = {};
    
    students.forEach(student => {
      attendanceRecords[student.id] = {
        id: `att-${Date.now()}-${student.id}`,
        date,
        status: attendance[student.id],
        notes: notes[student.id]
      };
    });

    onSaveAttendance(attendanceRecords);
    onClose();
  };

  const presentCount = Object.values(attendance).filter(s => s === 'Present').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity animate-fade-in p-4">
      <div className="modal-content p-6 w-full max-w-4xl m-4 transform transition-all animate-slide-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 dark:border-slate-700">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{t.summary(presentCount, students.length)}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        
        <div className="mt-6 space-y-4">
          {/* Date and Quick Actions */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-shrink-0">
              <label htmlFor="attendance-date" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
                {t.dateLabel}
              </label>
              <input
                id="attendance-date"
                type="date"
                className="form-input"
                value={date}
                onChange={e => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
                {t.quickActions}
              </label>
              <button onClick={handleMarkAllPresent} className="btn btn-secondary-outline">
                <i className="fa-solid fa-check-double mr-2"></i>
                {t.markAllPresent}
              </button>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="border dark:border-slate-600 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="p-3 text-left font-semibold">{t.studentHeader}</th>
                    <th className="p-3 text-center font-semibold">{t.statusHeader}</th>
                    <th className="p-3 text-left font-semibold">{t.notesHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id} className={`border-t dark:border-slate-700 ${index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
                      <td className="p-3">
                        <div className="flex items-center">
                          <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-3" />
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleStatusChange(student.id, 'Present')}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              attendance[student.id] === 'Present'
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-green-400'
                            }`}
                            title={t.present}
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'Absent')}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              attendance[student.id] === 'Absent'
                                ? 'bg-red-500 text-white'
                                : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-red-400'
                            }`}
                            title={t.absent}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'Late')}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              attendance[student.id] === 'Late'
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-amber-400'
                            }`}
                            title={t.late}
                          >
                            <i className="fa-solid fa-clock"></i>
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'Excused')}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              attendance[student.id] === 'Excused'
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-blue-400'
                            }`}
                            title={t.excused}
                          >
                            <i className="fa-solid fa-file-circle-check"></i>
                          </button>
                        </div>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          className="form-input text-sm"
                          placeholder={t.notePlaceholder}
                          value={notes[student.id] || ''}
                          onChange={e => handleNoteChange(student.id, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3 pt-4 border-t dark:border-slate-700">
          <button onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            <i className="fa-solid fa-save mr-2"></i>
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
