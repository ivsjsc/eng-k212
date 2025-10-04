import React, { useState } from 'react';
import { Student, Assignment } from '../types';

interface AssignHomeworkModalProps {
  students: Student[];
  classId: string;
  onClose: () => void;
  onAssign: (assignment: Assignment) => void;
  language: 'en' | 'vi';
}

const AssignHomeworkModal: React.FC<AssignHomeworkModalProps> = ({ students, classId, onClose, onAssign, language }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const t = {
    en: {
      title: "Assign Homework",
      titleLabel: "Assignment Title",
      titlePlaceholder: "e.g., Chapter 3 Exercises",
      descLabel: "Description & Instructions",
      descPlaceholder: "Enter assignment details, instructions, and requirements...",
      dueDateLabel: "Due Date",
      selectLabel: "Select Student(s)",
      allStudents: "All Students",
      selectedCount: (count: number) => `${count} student(s) selected`,
      cancel: "Cancel",
      assign: "Assign",
      reminderInfo: "Students will receive a reminder 24 hours before the due date.",
      validation: {
        titleRequired: "Please enter an assignment title",
        dueDateRequired: "Please select a due date",
        studentsRequired: "Please select at least one student"
      }
    },
    vi: {
      title: "Giao Bài tập",
      titleLabel: "Tiêu đề Bài tập",
      titlePlaceholder: "VD: Bài tập Chương 3",
      descLabel: "Mô tả & Hướng dẫn",
      descPlaceholder: "Nhập chi tiết bài tập, hướng dẫn và yêu cầu...",
      dueDateLabel: "Hạn nộp",
      selectLabel: "Chọn Học sinh",
      allStudents: "Tất cả Học sinh",
      selectedCount: (count: number) => `Đã chọn ${count} học sinh`,
      cancel: "Hủy",
      assign: "Giao bài",
      reminderInfo: "Học sinh sẽ nhận được thông báo nhắc nhở 24 giờ trước hạn nộp.",
      validation: {
        titleRequired: "Vui lòng nhập tiêu đề bài tập",
        dueDateRequired: "Vui lòng chọn hạn nộp",
        studentsRequired: "Vui lòng chọn ít nhất một học sinh"
      }
    }
  }[language];

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedStudents(students.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSubmit = () => {
    // Validation
    if (!title.trim()) {
      alert(t.validation.titleRequired);
      return;
    }
    if (!dueDate) {
      alert(t.validation.dueDateRequired);
      return;
    }
    if (selectedStudents.length === 0) {
      alert(t.validation.studentsRequired);
      return;
    }

    const newAssignment: Assignment = {
      id: `a-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      assignedTo: selectedStudents,
      classId,
      submissions: []
    };

    onAssign(newAssignment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity animate-fade-in p-4">
      <div className="modal-content p-6 w-full max-w-2xl m-4 transform transition-all animate-slide-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        
        <div className="mt-6 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="assignment-title" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
              {t.titleLabel} <span className="text-red-500">*</span>
            </label>
            <input
              id="assignment-title"
              type="text"
              className="form-input"
              placeholder={t.titlePlaceholder}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="assignment-desc" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
              {t.descLabel}
            </label>
            <textarea
              id="assignment-desc"
              className="form-input min-h-[100px]"
              placeholder={t.descPlaceholder}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="due-date" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">
              {t.dueDateLabel} <span className="text-red-500">*</span>
            </label>
            <input
              id="due-date"
              type="date"
              className="form-input"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Student Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-2">
              {t.selectLabel} <span className="text-red-500">*</span>
            </label>
            
            {/* Select All */}
            <label className="flex items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-lg mb-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={e => handleSelectAll(e.target.checked)}
                className="mr-3 w-4 h-4"
              />
              <span className="font-medium">{t.allStudents}</span>
            </label>

            {/* Student List */}
            <div className="max-h-48 overflow-y-auto border dark:border-slate-600 rounded-lg p-2">
              {students.map(student => (
                <label key={student.id} className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentToggle(student.id)}
                    className="mr-3 w-4 h-4"
                  />
                  <img src={student.avatar} alt={student.name} className="w-6 h-6 rounded-full mr-2" />
                  <span>{student.name}</span>
                </label>
              ))}
            </div>
            
            <p className="text-sm text-slate-500 mt-2">
              {t.selectedCount(selectedStudents.length)}
            </p>
          </div>

          {/* Reminder Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start">
              <i className="fa-solid fa-info-circle text-blue-500 mt-0.5 mr-2"></i>
              <p className="text-sm text-blue-700 dark:text-blue-300">{t.reminderInfo}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3 pt-4 border-t dark:border-slate-700">
          <button onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            <i className="fa-solid fa-paper-plane mr-2"></i>
            {t.assign}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignHomeworkModal;