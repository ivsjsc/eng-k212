import React, { useState, useMemo } from 'react';
import type { Classes, Student, ClassData, ClassScheduleItem, Grade, Assignment, Announcement, AttendanceRecord } from '../types';
import { exportToExcel, readExcelFile, type ExcelData } from '../utils/excelHelper';
import { logger } from '../utils/logger';
import StudentCard from './StudentCard';
import StudentRow from './StudentRow';
import StudentReportModal from './StudentReportModal';
import CreateTestModal from './CreateTestModal';
import AssignHomeworkModal from './AssignHomeworkModal';
import AddClassModal from './AddClassModal';
import AddStudentModal from './AddStudentModal';
import DeleteClassModal from './DeleteClassModal';
import AttendanceModal from './AttendanceModal';
import AnnouncementModal from './AnnouncementModal';

interface TeacherDashboardProps {
  classes: Classes;
  setClasses: (classes: Classes) => void;
  language: 'en' | 'vi';
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ classes, setClasses, language }) => {
  const [expandedClassId, setExpandedClassId] = useState<string | null>(Object.keys(classes)[0] || null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [classForNewStudent, setClassForNewStudent] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Modal states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [isAddEditClassModalOpen, setIsAddEditClassModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isDeleteClassModalOpen, setIsDeleteClassModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  const [classToEdit, setClassToEdit] = useState<{ id: string; data: ClassData } | null>(null);
  const [classToDelete, setClassToDelete] = useState<{ id: string; data: ClassData } | null>(null);
  const [classForAttendance, setClassForAttendance] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [uploadMessage, setUploadMessage] = useState<{classId: string, type: 'success' | 'error', text: string} | null>(null);


  const t = {
    en: {
      actions: "Actions",
      noClassesTitle: "No Classes Found",
      noClassesDesc: "Get started by creating your first class.",
      createClass: "Create Class",
      dashboardTitle: "Teacher Dashboard",
      dashboardDesc: "Manage your classes and track student progress.",
      searchPlaceholder: "Search by class or student name...",
      assign: "Assign",
      createTest: "Create Test",
      attendance: "Attendance",
      announcement: "Announcement",
      addClass: "Add Class",
      addStudent: "Add Student",
      students: "Students",
      classAverage: "Class Avg.",
      struggling: "Struggling",
      noStudents: "No students in this class yet.",
      expand: "Expand",
      collapse: "Collapse",
      editClass: "Edit Class",
      deleteClass: "Delete Class",
      takeAttendance: "Take Attendance",
      manageStudentsTitle: "Manage Students",
      addStudentManually: "Add Manually",
      addStudentManuallyDesc: "Add students one by one by entering their name.",
      importFromExcel: "Import from Excel",
      downloadTemplate: "Download Template",
      uploadFile: "Upload File",
      uploading: "Uploading...",
      instructionsTitle: "Instructions",
      instruction1: "Download our template file.",
      instruction2: "Enter student information and grades in the corresponding columns.",
      instruction3: "The system will automatically calculate the weighted average score.",
      instruction4: "Save and upload the file. New students will be added with their grades.",
      excel: {
        header_stt: "No.",
        header_name: "Full Name",
        header_dob: "Date of Birth",
        header_gender: "Gender",
        header_oral: "Oral (x1)",
        header_15m: "15-minute (x1)",
        header_midterm: "Mid-term (x2)",
        header_final: "Final-term (x3)",
        example_name: "Alex Smith",
        example_dob: "2010-05-15",
        example_gender: "Male",
        example_oral: 9.0,
        example_15m: 8.0,
        example_midterm: 8.5,
        example_final: 9.5,
      },
      alert: {
        noNames: "No students with valid names found in the file. Please check the 'Full Name' column.",
        success: (count: number) => `${count} students added successfully!`,
        fail: "Failed to process the Excel file. Please ensure it follows the template format.",
      }
    },
    vi: {
      actions: "Hành động",
      noClassesTitle: "Không tìm thấy Lớp học",
      noClassesDesc: "Bắt đầu bằng cách tạo lớp học đầu tiên của bạn.",
      createClass: "Tạo Lớp",
      dashboardTitle: "Bảng điều khiển Giáo viên",
      dashboardDesc: "Quản lý các lớp học và theo dõi tiến độ của học sinh.",
      searchPlaceholder: "Tìm theo tên lớp hoặc học sinh...",
      assign: "Giao bài",
      createTest: "Tạo Bài kiểm tra",
      attendance: "Điểm danh",
      announcement: "Thông báo",
      addClass: "Thêm Lớp",
      addStudent: "Thêm Học sinh",
      students: "Học sinh",
      classAverage: "Điểm TB",
      struggling: "Cần chú ý",
      noStudents: "Chưa có học sinh nào trong lớp này.",
      expand: "Mở rộng",
      collapse: "Thu gọn",
      editClass: "Sửa Lớp",
      deleteClass: "Xóa Lớp",
      takeAttendance: "Điểm danh",
      manageStudentsTitle: "Quản lý Học sinh",
      addStudentManually: "Thêm thủ công",
      addStudentManuallyDesc: "Thêm từng học sinh một bằng cách nhập tên.",
      importFromExcel: "Nhập từ Excel",
      downloadTemplate: "Tải mẫu",
      uploadFile: "Tải file",
      uploading: "Đang tải...",
      instructionsTitle: "Hướng dẫn",
      instruction1: "Tải về tệp mẫu của chúng tôi.",
      instruction2: "Điền thông tin học sinh và điểm số vào các cột tương ứng.",
      instruction3: "Hệ thống sẽ tự động tính điểm trung bình môn theo hệ số.",
      instruction4: "Lưu tệp và tải lên. Học sinh mới sẽ được thêm vào lớp cùng với bảng điểm.",
      excel: {
        header_stt: "STT",
        header_name: "Họ và tên",
        header_dob: "Ngày sinh",
        header_gender: "Giới tính",
        header_oral: "Điểm Miệng (x1)",
        header_15m: "Điểm 15 phút (x1)",
        header_midterm: "Điểm Giữa kỳ (x2)",
        header_final: "Điểm Cuối kỳ (x3)",
        example_name: "Nguyễn Văn An",
        example_dob: "2010-05-15",
        example_gender: "Nam",
        example_oral: 9.0,
        example_15m: 8.0,
        example_midterm: 8.5,
        example_final: 9.5,
      },
      alert: {
        noNames: "Không tìm thấy học sinh có tên hợp lệ trong tệp. Vui lòng kiểm tra cột 'Họ và tên'.",
        success: (count: number) => `Đã thêm thành công ${count} học sinh!`,
        fail: "Không thể xử lý tệp Excel. Vui lòng đảm bảo tệp theo đúng định dạng mẫu.",
      }
    }
  }[language];
  
  const filteredClasses = useMemo(() => {
    if (!searchTerm.trim()) {
      return Object.entries(classes);
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return Object.entries(classes).filter(([classId, classData]) => {
      // FIX: Cast classData to ClassData to prevent 'property does not exist on type unknown' errors.
      const cd = classData as ClassData;
      const classNameMatch = cd.name.toLowerCase().includes(lowercasedFilter);
      const studentNameMatch = cd.students.some(student => student.name.toLowerCase().includes(lowercasedFilter));
      return classNameMatch || studentNameMatch;
    });
  }, [classes, searchTerm]);

  const handleOpenReport = (student: Student) => {
    setSelectedStudent(student);
    setIsReportModalOpen(true);
  };

  const handleSaveClass = (classData: { name: string; schedule: ClassScheduleItem[] }, classId?: string) => {
    if (classId) { // Editing
      const updatedClasses = { ...classes, [classId]: { ...classes[classId], name: classData.name, schedule: classData.schedule } };
      setClasses(updatedClasses);
    } else { // Adding
      const newClassId = `class-${Date.now()}`;
      const newClasses: Classes = { ...classes, [newClassId]: { name: classData.name, students: [], schedule: classData.schedule } };
      setClasses(newClasses);
      setExpandedClassId(newClassId);
    }
    setIsAddEditClassModalOpen(false);
    setClassToEdit(null);
  };

  const handleDeleteClass = () => {
    if (!classToDelete) return;
    const { [classToDelete.id]: _, ...remainingClasses } = classes;
    setClasses(remainingClasses);
    setIsDeleteClassModalOpen(false);
    setClassToDelete(null);
  };

  const handleAddStudent = (studentName: string) => {
    if (!classForNewStudent) return;
    const newStudent: Student = {
        id: `s-${Date.now()}`, name: studentName, avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        lastActivity: 'Never', progress: 0, averageScore: 0, timeSpent: '0h 0m',
        isStruggling: false, scoreHistory: [], assignments: [], grades: [],
    };
    const updatedClasses = { ...classes };
    updatedClasses[classForNewStudent].students.push(newStudent);
    setClasses(updatedClasses);
    setIsAddStudentModalOpen(false);
    setClassForNewStudent(null);
  };

  const handleAssignHomework = (assignment: Assignment) => {
    const updatedClasses = { ...classes };
    const classData = updatedClasses[assignment.classId];
    if (classData) {
      if (!classData.assignments) {
        classData.assignments = [];
      }
      classData.assignments.push(assignment);
      
      // Also add assignment to each assigned student
      assignment.assignedTo.forEach(studentId => {
        const student = classData.students.find(s => s.id === studentId);
        if (student) {
          student.assignments.push(assignment);
        }
      });
      
      setClasses(updatedClasses);
    }
  };

  const handleCreateTest = (testData: any) => {
    logger.info('Test created:', testData);
    // In a real implementation, this would save the test data
  };

  const handleSaveAttendance = (attendance: Record<string, AttendanceRecord>) => {
    if (!classForAttendance) return;
    
    const updatedClasses = { ...classes };
    const classData = updatedClasses[classForAttendance];
    
    if (classData) {
      Object.entries(attendance).forEach(([studentId, record]) => {
        const student = classData.students.find(s => s.id === studentId);
        if (student) {
          if (!student.attendance) {
            student.attendance = [];
          }
          student.attendance.push(record);
        }
      });
      
      setClasses(updatedClasses);
    }
    
    setIsAttendanceModalOpen(false);
    setClassForAttendance(null);
  };

  const handleBroadcastAnnouncement = (announcement: Announcement) => {
    const updatedClasses = { ...classes };
    
    Object.keys(updatedClasses).forEach(classId => {
      if (!updatedClasses[classId].announcements) {
        updatedClasses[classId].announcements = [];
      }
      updatedClasses[classId].announcements!.push(announcement);
    });
    
    setClasses(updatedClasses);
  };

  const handleDownloadTemplate = async () => {
    const headers = {
        stt: t.excel.header_stt,
        name: t.excel.header_name,
        dob: t.excel.header_dob,
        gender: t.excel.header_gender,
        oral: t.excel.header_oral,
        min15: t.excel.header_15m,
        midterm: t.excel.header_midterm,
        final: t.excel.header_final,
    };

    const excelData: ExcelData = {
      headers: [
        headers.stt,
        headers.name,
        headers.dob,
        headers.gender,
        headers.oral,
        headers.min15,
        headers.midterm,
        headers.final
      ],
      rows: [
        [
          1,
          t.excel.example_name,
          t.excel.example_dob,
          t.excel.example_gender,
          t.excel.example_oral,
          t.excel.example_15m,
          t.excel.example_midterm,
          t.excel.example_final
        ],
        [2, '', '', '', '', '', '', ''] // Empty row for user input
      ]
    };
    
    const fileName = language === 'vi' ? 'mau_nhap_diem_hoc_sinh.xlsx' : 'student_grade_template.xlsx';
    await exportToExcel(excelData, {
      filename: fileName,
      sheetName: "Student List",
      title: language === 'vi' ? 'Mẫu nhập điểm học sinh' : 'Student Grade Template'
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, classId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage(null);
    
    try {
      const excelData = await readExcelFile(file);
      const json = excelData.rows.map(row => {
        const obj: any = {};
        excelData.headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
        
        const headers = t.excel;
        const gradeCols: { header: string; coeff: 1 | 2 | 3, name: string }[] = [
            { header: headers.header_oral, coeff: 1, name: language === 'vi' ? 'Điểm Miệng' : 'Oral' },
            { header: headers.header_15m, coeff: 1, name: language === 'vi' ? '15 phút' : '15-min' },
            { header: headers.header_midterm, coeff: 2, name: language === 'vi' ? 'Giữa kỳ' : 'Mid-term' },
            { header: headers.header_final, coeff: 3, name: language === 'vi' ? 'Cuối kỳ' : 'Final-term' },
        ];

        const newStudents = json
            .map((row, index) => {
                const name = row[headers.header_name]?.toString().trim();
                if (!name) return null;

                let dob: string | undefined;
                const parsedDob = row[headers.header_dob];
                if (parsedDob instanceof Date) {
                    dob = parsedDob.toLocaleDateString('en-CA'); // YYYY-MM-DD
                } else if (parsedDob) {
                    dob = parsedDob.toString();
                }

                const gender = row[headers.header_gender]?.toString().trim();
                const importDate = new Date().toISOString().split('T')[0];
                
                const grades: Grade[] = [];
                gradeCols.forEach(col => {
                    const score = parseFloat(row[col.header]);
                    if (!isNaN(score) && score >= 0 && score <= 10) {
                        grades.push({
                            id: `g-${Date.now()}-${index}-${col.coeff}`,
                            name: col.name,
                            score: score,
                            coefficient: col.coeff,
                            date: importDate,
                        });
                    }
                });

                let averageScore = 0;
                if (grades.length > 0) {
                    const totalScore = grades.reduce((sum, g) => sum + g.score * g.coefficient, 0);
                    const totalCoefficients = grades.reduce((sum, g) => sum + g.coefficient, 0);
                    if (totalCoefficients > 0) {
                        averageScore = parseFloat((totalScore / totalCoefficients).toFixed(1));
                    }
                }
                
                const newStudent: Student = {
                    id: `s-${Date.now()}-${index}`,
                    name: name,
                    avatar: `https://i.pravatar.cc/150?u=${name.replace(/\s/g, '')}`,
                    lastActivity: 'Just Imported', progress: 0, averageScore, timeSpent: '0h 0m',
                    isStruggling: averageScore < 5.0, scoreHistory: [], assignments: [],
                    grades: grades,
                    dob: dob,
                    gender: gender,
                };
                return newStudent;
            })
            .filter((student): student is Student => student !== null);

        if (newStudents.length === 0) {
          setUploadMessage({ classId, type: 'error', text: t.alert.noNames });
          return;
        }

        const updatedClasses = { ...classes };
        updatedClasses[classId].students.push(...newStudents);
        setClasses(updatedClasses);

        setUploadMessage({ classId, type: 'success', text: t.alert.success(newStudents.length) });
    } catch (error) {
        logger.error("Error processing Excel file:", error);
        setUploadMessage({ classId, type: 'error', text: t.alert.fail });
    } finally {
        setIsUploading(false);
        if (event.target) event.target.value = '';
        setTimeout(() => setUploadMessage(null), 5000);
    }
  };

  if (Object.keys(classes).length === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <i className="fa-solid fa-school-circle-xmark text-6xl text-slate-400 mb-4"></i>
              <h2 className="text-2xl font-bold">{t.noClassesTitle}</h2>
              <p className="text-slate-500 mb-6">{t.noClassesDesc}</p>
              <button className="btn btn-primary" onClick={() => { setClassToEdit(null); setIsAddEditClassModalOpen(true); }}>
                  <i className="fa-solid fa-plus mr-2"></i> {t.createClass}
              </button>
              {isAddEditClassModalOpen && <AddClassModal onClose={() => setIsAddEditClassModalOpen(false)} onSave={handleSaveClass} language={language} />}
          </div>
      );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{t.dashboardTitle}</h1>
            <p className="mt-1 text-lg text-slate-600 dark:text-slate-400">{t.dashboardDesc}</p>
          </div>
          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => setIsAnnouncementModalOpen(true)} className="btn btn-secondary-outline"><i className="fa-solid fa-bullhorn mr-2"></i> {t.announcement}</button>
            <button onClick={() => setIsHomeworkModalOpen(true)} className="btn btn-secondary"><i className="fa-solid fa-file-pen mr-2"></i> {t.assign}</button>
            <button onClick={() => setIsTestModalOpen(true)} className="btn btn-primary"><i className="fa-solid fa-vial-circle-check mr-2"></i> {t.createTest}</button>
          </div>
          {/* Mobile Dropdown */}
          <div className="sm:hidden relative">
            <button onClick={() => setIsActionMenuOpen(!isActionMenuOpen)} onBlur={() => setTimeout(() => setIsActionMenuOpen(false), 200)} className="btn btn-secondary w-full">
              {t.actions} <i className="fa-solid fa-chevron-down ml-2 text-xs"></i>
            </button>
            {isActionMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-xl z-10 animate-fade-in">
                  <button onClick={() => { setIsAnnouncementModalOpen(true); setIsActionMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-t-lg"><i className="fa-solid fa-bullhorn mr-2 w-4"></i> {t.announcement}</button>
                  <button onClick={() => { setIsHomeworkModalOpen(true); setIsActionMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600"><i className="fa-solid fa-file-pen mr-2 w-4"></i> {t.assign}</button>
                  <button onClick={() => { setIsTestModalOpen(true); setIsActionMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-b-lg"><i className="fa-solid fa-vial-circle-check mr-2 w-4"></i> {t.createTest}</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="form-input pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => { setClassToEdit(null); setIsAddEditClassModalOpen(true); }} className="btn btn-secondary-outline"><i className="fa-solid fa-plus mr-2"></i> {t.addClass}</button>
      </div>

      <div className="space-y-4">
        {filteredClasses.map(([classId, classDataUntyped]) => {
          const classData = classDataUntyped as ClassData;
          const isExpanded = expandedClassId === classId;
          const classAvg = classData.students.length > 0 ? (classData.students.reduce((acc, s) => acc + s.averageScore, 0) / classData.students.length).toFixed(1) : 'N/A';
          const strugglingCount = classData.students.filter(s => s.isStruggling).length;

          return (
            <div key={classId} className="card-glass overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <div className="flex-grow" onClick={() => setExpandedClassId(isExpanded ? null : classId)}>
                  <h2 className="text-xl font-bold">{classData.name}</h2>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500 mt-1">
                    <span><i className="fa-solid fa-users mr-1"></i> {classData.students.length} {t.students}</span>
                    <span><i className="fa-solid fa-star-half-alt mr-1 text-green-500"></i> {t.classAverage}: {classAvg}</span>
                    <span className={strugglingCount > 0 ? 'text-amber-500' : ''}><i className="fa-solid fa-triangle-exclamation mr-1"></i> {strugglingCount} {t.struggling}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={() => { setClassForAttendance(classId); setIsAttendanceModalOpen(true); }} className="btn btn-icon text-green-500" title={t.takeAttendance}><i className="fa-solid fa-calendar-check"></i></button>
                    <button onClick={() => { setClassToEdit({ id: classId, data: classData }); setIsAddEditClassModalOpen(true); }} className="btn btn-icon text-blue-500" title={t.editClass}><i className="fa-solid fa-pencil"></i></button>
                    <button onClick={() => { setClassToDelete({ id: classId, data: classData }); setIsDeleteClassModalOpen(true); }} className="btn btn-icon text-red-500" title={t.deleteClass}><i className="fa-solid fa-trash"></i></button>
                    <button onClick={() => setExpandedClassId(isExpanded ? null : classId)} className="btn btn-icon text-slate-500" title={isExpanded ? t.collapse : t.expand}>
                      <i className={`fa-solid fa-chevron-down transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>
                    </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 border-t dark:border-slate-700 animate-fade-in">
                  {classData.students.length > 0 ? (
                      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {classData.students.map(student => (
                          <StudentCard key={student.id} student={student} onReportClick={() => handleOpenReport(student)} language={language} />
                        ))}
                      </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500">{t.noStudents}</div>
                  )}
                  {/* Mobile List */}
                  {classData.students.length > 0 && (
                    <div className="md:hidden space-y-3">
                        {classData.students.map(student => (
                        <StudentRow key={student.id} student={student} onReportClick={() => handleOpenReport(student)} language={language} />
                      ))}
                    </div>
                  )}

                  {/* Student Management Section */}
                  <div className="mt-6 pt-6 border-t dark:border-slate-700">
                      <h4 className="font-semibold text-center mb-4">{t.manageStudentsTitle}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
                          <div className="card-glass p-4 text-center bg-slate-50 dark:bg-slate-800/50">
                              <h5 className="font-medium mb-2">{t.addStudentManually}</h5>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{t.addStudentManuallyDesc}</p>
                              <button onClick={() => { setClassForNewStudent(classId); setIsAddStudentModalOpen(true); }} className="btn btn-secondary w-full text-sm">
                                  <i className="fa-solid fa-user-plus mr-2"></i> {t.addStudent}
                              </button>
                          </div>
                          <div className="card-glass p-4 text-left bg-slate-50 dark:bg-slate-800/50">
                              <h5 className="font-medium mb-2 text-center">{t.importFromExcel}</h5>
                              <div className="flex gap-2 justify-center mb-4">
                                  <button onClick={handleDownloadTemplate} className="btn btn-secondary-outline text-sm flex-1">
                                      <i className="fa-solid fa-download mr-2"></i> {t.downloadTemplate}
                                  </button>
                                  <label className={`btn btn-secondary-outline text-sm flex-1 cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                      <i className={`fa-solid ${isUploading ? 'fa-spinner animate-spin' : 'fa-upload'} mr-2`}></i> 
                                      {isUploading ? t.uploading : t.uploadFile}
                                      <input type="file" accept=".xlsx, .xls" className="hidden" onChange={(e) => handleFileUpload(e, classId)} disabled={isUploading} />
                                  </label>
                              </div>

                              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2 px-2">
                                  <p className="font-semibold">{t.instructionsTitle}:</p>
                                  <ol className="list-decimal list-inside space-y-1">
                                      <li>{t.instruction1}</li>
                                      <li>{t.instruction2}</li>
                                      <li>{t.instruction3}</li>
                                      <li>{t.instruction4}</li>
                                  </ol>
                              </div>

                              {uploadMessage && uploadMessage.classId === classId && (
                                <p className={`mt-3 text-xs text-center ${uploadMessage.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {uploadMessage.text}
                                </p>
                              )}
                          </div>
                      </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {isReportModalOpen && selectedStudent && (
        <StudentReportModal student={selectedStudent} onClose={() => {setIsReportModalOpen(false); setSelectedStudent(null);}} classes={classes} setClasses={setClasses} classId={expandedClassId!} language={language}/>
      )}
      {isTestModalOpen && <CreateTestModal onClose={() => setIsTestModalOpen(false)} onCreateTest={handleCreateTest} language={language} />}
      {/* FIX: Cast result of Object.values to ClassData[] to prevent 'property does not exist on type unknown' error. */}
      {isHomeworkModalOpen && expandedClassId && (
        <AssignHomeworkModal 
          students={classes[expandedClassId]?.students || []} 
          classId={expandedClassId}
          onClose={() => setIsHomeworkModalOpen(false)} 
          onAssign={handleAssignHomework}
          language={language} 
        />
      )}
      {isAttendanceModalOpen && classForAttendance && (
        <AttendanceModal
          students={classes[classForAttendance]?.students || []}
          classId={classForAttendance}
          onClose={() => { setIsAttendanceModalOpen(false); setClassForAttendance(null); }}
          onSaveAttendance={handleSaveAttendance}
          language={language}
        />
      )}
      {isAnnouncementModalOpen && (
        <AnnouncementModal
          onClose={() => setIsAnnouncementModalOpen(false)}
          onSave={handleBroadcastAnnouncement}
          language={language}
        />
      )}
      {isAddEditClassModalOpen && <AddClassModal onClose={() => { setIsAddEditClassModalOpen(false); setClassToEdit(null); }} onSave={handleSaveClass} language={language} classToEdit={classToEdit}/>}
      {isAddStudentModalOpen && <AddStudentModal onClose={() => { setIsAddStudentModalOpen(false); setClassForNewStudent(null); }} onAddStudent={handleAddStudent} language={language} />}
      {isDeleteClassModalOpen && classToDelete && <DeleteClassModal className={classToDelete.data.name} onClose={() => { setIsDeleteClassModalOpen(false); setClassToDelete(null); }} onConfirm={handleDeleteClass} language={language}/>}
    </div>
  );
};

export default TeacherDashboard;
