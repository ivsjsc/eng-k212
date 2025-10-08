import React, { useState, useEffect } from 'react';
import type { ClassScheduleItem, ClassData } from '../types';

interface AddClassModalProps {
  onClose: () => void;
  onSave: (classData: { name: string, schedule: ClassScheduleItem[] }, classId?: string) => void;
  language: 'en' | 'vi';
  classToEdit?: { id: string, data: ClassData } | null;
}

const AddClassModal: React.FC<AddClassModalProps> = ({ onClose, onSave, language, classToEdit }) => {
  const [className, setClassName] = useState('');
  const [schedule, setSchedule] = useState<ClassScheduleItem[]>([]);
  const [itemToAdd, setItemToAdd] = useState({
    day: 'Monday' as ClassScheduleItem['day'],
    period: '' as number | '',
    startTime: '',
    endTime: ''
  });

  const isEditing = !!classToEdit;

  useEffect(() => {
    if (isEditing) {
      setClassName(classToEdit.data.name);
      setSchedule(classToEdit.data.schedule || []);
    }
  }, [classToEdit, isEditing]);

  const t = {
    en: {
      createTitle: "Create New Class",
      editTitle: "Edit Class",
      label: "Class Name",
      placeholder: "e.g., Grade 6A, Advanced English",
      scheduleTitle: "Class Schedule",
      addSession: "Add Session",
      day: "Day",
      period: "Period",
      startTime: "Start Time",
      endTime: "End Time",
      addedSessions: "Added Sessions",
      noSessions: "No sessions added yet.",
      cancel: "Cancel",
      create: "Create Class",
      save: "Save Changes",
    },
    vi: {
      createTitle: "Tạo Lớp Mới",
      editTitle: "Chỉnh sửa Lớp học",
      label: "Tên Lớp",
      placeholder: "VD: Lớp 6A, Tiếng Anh Nâng cao",
      scheduleTitle: "Lịch học",
      addSession: "Thêm Buổi học",
      day: "Thứ",
      period: "Tiết",
      startTime: "Bắt đầu",
      endTime: "Kết thúc",
      addedSessions: "Các buổi đã thêm",
      noSessions: "Chưa có buổi học nào được thêm.",
      cancel: "Hủy",
      create: "Tạo Lớp",
      save: "Lưu thay đổi",
    }
  }[language];
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItemToAdd(prev => ({...prev, [name]: name === 'period' ? (value === '' ? '' : parseInt(value)) : value }));
  };

  const handleAddScheduleItem = () => {
    if (itemToAdd.period && itemToAdd.startTime && itemToAdd.endTime) {
      setSchedule(prev => [...prev, { ...itemToAdd, period: itemToAdd.period as number, id: `sch-${Date.now()}` }]);
      setItemToAdd({ day: 'Monday', period: '', startTime: '', endTime: '' });
    }
  };

  const handleRemoveScheduleItem = (id: string) => {
    setSchedule(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (className.trim()) {
      onSave({ name: className.trim(), schedule }, classToEdit?.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity animate-fade-in p-4">
      <form onSubmit={handleSubmit} className="modal-content p-6 w-full max-w-lg m-4 transform transition-all animate-slide-in-up max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b pb-3 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{isEditing ? t.editTitle : t.createTitle}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">&times;</button>
        </div>
        
        <div className="mt-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
          <div>
            <label htmlFor="className" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.label}</label>
            <input
              id="className" type="text" value={className} onChange={(e) => setClassName(e.target.value)}
              className="form-input" placeholder={t.placeholder} required
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">{t.scheduleTitle}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end p-3 rounded-md bg-slate-100 dark:bg-slate-700/50">
                <div className="sm:col-span-2 md:col-span-1">
                    <label className="text-xs">{t.day}</label>
                    <select name="day" value={itemToAdd.day} onChange={handleItemChange} className="form-select text-sm p-2">
                        {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-xs">{t.period}</label>
                    <input type="number" name="period" value={itemToAdd.period} onChange={handleItemChange} className="form-input text-sm p-2" />
                </div>
                <div>
                    <label className="text-xs">{t.startTime}</label>
                    <input type="time" name="startTime" value={itemToAdd.startTime} onChange={handleItemChange} className="form-input text-sm p-2" />
                </div>
                <div>
                    <label className="text-xs">{t.endTime}</label>
                    <input type="time" name="endTime" value={itemToAdd.endTime} onChange={handleItemChange} className="form-input text-sm p-2" />
                </div>
                <button type="button" onClick={handleAddScheduleItem} className="btn btn-secondary text-sm p-2 h-fit">{t.addSession}</button>
            </div>

            <div className="mt-4">
                <h5 className="font-semibold text-sm mb-2">{t.addedSessions}</h5>
                {schedule.length > 0 ? (
                    <ul className="space-y-2">
                        {schedule.map(item => (
                            <li key={item.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-700/30 p-2 rounded-md text-sm">
                                <span><strong>{item.day}</strong>, {t.period} {item.period}: {item.startTime} - {item.endTime}</span>
                                <button type="button" onClick={() => handleRemoveScheduleItem(item.id)} className="btn-icon text-red-500 hover:text-red-700 text-xs"><i className="fa-solid fa-trash"></i></button>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-xs text-slate-500 text-center p-4">{t.noSessions}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3 pt-4 border-t dark:border-slate-700">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {t.cancel}
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? t.save : t.create}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClassModal;