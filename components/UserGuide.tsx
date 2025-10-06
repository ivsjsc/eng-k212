import React from 'react';
import { curriculumData } from '../data/curriculum';

interface UserGuideProps {
    language: 'en' | 'vi';
}

const GuideSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <section className="card-glass p-6 mb-6">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{title}</h2>
        <div className="space-y-4 text-slate-700 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none">
            {children}
        </div>
    </section>
);

const UserGuide: React.FC<UserGuideProps> = ({ language }) => {
    const isVietnamese = language === 'vi';

    const content = {
        title: isVietnamese ? 'Hướng dẫn sử dụng' : 'User Guide',
        intro_title: isVietnamese ? 'Chào mừng đến với IVS English!' : 'Welcome to IVS English!',
        intro_p1: isVietnamese
            ? 'Ứng dụng này là một nền tảng học tiếng Anh tích hợp dành cho học sinh K-12, bao gồm sách điện tử tương tác, công cụ luyện tập AI, gamification và các tính năng quản lý toàn diện cho giáo viên.'
            : 'This application is an integrated English learning platform for K-12 students, featuring interactive ebooks, AI-powered practice tools, gamification, and comprehensive teacher management features.',
        
        getting_started_title: isVietnamese ? 'Bắt đầu' : 'Getting Started',
        getting_started_role: isVietnamese
            ? 'Khi bạn sử dụng ứng dụng lần đầu tiên, bạn sẽ được yêu cầu chọn vai trò của mình: **Học sinh** hoặc **Giáo viên**. Lựa chọn này sẽ tùy chỉnh giao diện và các tính năng có sẵn cho bạn.'
            : 'When you first use the app, you will be asked to select your role: **Student** or **Teacher**. This choice customizes the interface and features available to you.',
        getting_started_nav: isVietnamese
            ? 'Sử dụng **thanh điều hướng bên trái (sidebar)** để truy cập các phần khác nhau của ứng dụng như Trang chủ, Chương trình, Công cụ AI và Cài đặt.'
            : 'Use the **sidebar on the left** to navigate to different sections of the app like Home, Curriculum, AI Tools, and Settings.',

        install_title: isVietnamese ? 'Cài đặt Ứng dụng (Truy cập Nhanh)' : 'Installing the App (Quick Access)',
        install_intro: isVietnamese
            ? 'Để truy cập nhanh hơn và có trải nghiệm giống như một ứng dụng gốc, bạn có thể cài đặt IVS English trực tiếp lên màn hình chính hoặc máy tính của bạn.'
            : 'For faster access and a native app-like experience, you can install IVS English directly onto your home screen or desktop.',
        install_windows_title: isVietnamese ? 'Trên Windows (Sử dụng Chrome)' : 'On Windows (Using Chrome)',
        install_windows_step1: isVietnamese
            ? `Nhấp vào biểu tượng ba chấm (<i class="fa-solid fa-ellipsis-vertical mx-1"></i>) ở góc trên bên phải của trình duyệt.`
            : `Click the three-dots icon (<i class="fa-solid fa-ellipsis-vertical mx-1"></i>) in the top-right corner of the browser.`,
        install_windows_step2: isVietnamese
            ? `Chọn <strong>"Cài đặt IVS English App"</strong> hoặc tìm trong "Lưu và chia sẻ" &rarr; "Cài đặt...".`
            : `Select <strong>"Install IVS English App"</strong> or look under "Save and share" &rarr; "Install...".`,
        install_windows_step3: isVietnamese
            ? 'Làm theo hướng dẫn để thêm ứng dụng vào màn hình desktop hoặc menu Start của bạn.'
            : 'Follow the prompts to add the app to your desktop or Start Menu.',

        install_ios_title: isVietnamese ? 'Trên iPhone / iPad (Sử dụng Safari)' : 'On iPhone / iPad (Using Safari)',
        install_ios_step1: isVietnamese
            ? `Nhấn vào biểu tượng Chia sẻ (<i class="fa-solid fa-arrow-up-from-bracket mx-1"></i>) trên thanh công cụ (thường ở dưới cùng).`
            : `Tap the Share icon (<i class="fa-solid fa-arrow-up-from-bracket mx-1"></i>) in the toolbar (usually at the bottom).`,
        install_ios_step2: isVietnamese
            ? 'Cuộn xuống danh sách và nhấn vào <strong>"Thêm vào MH chính"</strong>.'
            : 'Scroll down the list and tap <strong>"Add to Home Screen"</strong>.',
        install_ios_step3: isVietnamese
            ? 'Xác nhận tên cho ứng dụng và nhấn <strong>"Thêm"</strong> ở góc trên bên phải.'
            : 'Confirm the name for the app and tap <strong>"Add"</strong> in the top-right corner.',

        install_android_title: isVietnamese ? 'Trên Android (Sử dụng Chrome)' : 'On Android (Using Chrome)',
        install_android_step1: isVietnamese
            ? `Nhấn vào biểu tượng ba chấm (<i class="fa-solid fa-ellipsis-vertical mx-1"></i>) ở góc trên bên phải của trình duyệt.`
            : `Tap the three-dots icon (<i class="fa-solid fa-ellipsis-vertical mx-1"></i>) in the top-right corner of the browser.`,
        install_android_step2: isVietnamese
            ? 'Từ menu thả xuống, nhấn vào <strong>"Cài đặt ứng dụng"</strong> (hoặc "Thêm vào màn hình chính").'
            : 'From the dropdown menu, tap <strong>"Install app"</strong> (or "Add to Home screen").',
        install_android_step3: isVietnamese
            ? 'Làm theo hướng dẫn trên màn hình để xác nhận và thêm ứng dụng.'
            : 'Follow the on-screen prompts to confirm and add the app.',

        features_title: isVietnamese ? 'Tính năng cho Mọi người' : 'Features for Everyone',
        features_pinning_title: isVietnamese ? 'Chương trình & Ghim Khóa học' : 'Curriculum & Pinning Courses',
        features_pinning_p1: isVietnamese
            ? 'Trang **Chương trình** chứa tất cả các khóa học có sẵn từ Mầm non đến Lớp 12.'
            : 'The **Curriculum** page contains all available courses from Kindergarten to Grade 12.',
        features_pinning_p2: isVietnamese
            ? 'Để truy cập nhanh một khóa học, hãy nhấp vào **biểu tượng ghim** (<i class="fa-solid fa-thumbtack"></i>) trên thẻ khóa học. Các khóa học đã ghim sẽ xuất hiện trong mục "Các khóa học của tôi" trên **Trang chủ** của bạn.'
            : 'To quickly access a course, click the **pin icon** (<i class="fa-solid fa-thumbtack"></i>) on the course card. Pinned courses will appear under "My Courses" on your **Home** page.',
        
        features_ai_title: isVietnamese ? 'Công cụ AI' : 'AI Tools',
        features_ai_speaking: isVietnamese
            ? '**Luyện nói (Speaking Partner):** Trò chuyện với gia sư AI thân thiện của chúng tôi, Sparky, để thực hành kỹ năng giao tiếp tiếng Anh của bạn.'
            : '**Speaking Partner:** Chat with our friendly AI tutor, Sparky, to practice your English conversation skills.',
        features_ai_writing: isVietnamese
            ? '**Chấm bài viết (Writing Grader):** Nhận phản hồi tức thì về bài viết của bạn. Chỉ cần nhập chủ đề và văn bản của bạn, AI sẽ chấm điểm và đưa ra các đề xuất cải thiện.'
            : '**Writing Grader:** Get instant feedback on your writing. Just enter a topic and your text, and the AI will grade it and provide improvement suggestions.',

        features_settings_title: isVietnamese ? 'Cài đặt' : 'Settings',
        features_settings_profile: isVietnamese
            ? '**Chỉnh sửa Hồ sơ (Edit Profile):** Tùy chỉnh tên, avatar, cấp lớp và các thông tin cá nhân khác.'
            : '**Edit Profile:** Customize your name, avatar, grade level, and other personal information.',
        features_settings_data: isVietnamese
            ? '**Quản lý Dữ liệu (Data Management):** Sử dụng nút **Sao lưu (Backup)** để tải xuống tất cả dữ liệu ứng dụng của bạn (hồ sơ, lớp học, cài đặt) vào một tệp JSON. Sử dụng **Khôi phục (Restore)** để tải lên tệp này và khôi phục trạng thái của bạn. Điều này rất hữu ích khi chuyển đổi thiết bị hoặc trình duyệt.'
            : '**Data Management:** Use the **Backup** button to download all your app data (profile, classes, settings) to a JSON file. Use **Restore** to upload this file and restore your state. This is very useful when switching devices or browsers.',
        
        features_ai_config_title: isVietnamese ? 'Về các tính năng AI' : 'About AI Features',
        features_ai_config_p1: isVietnamese
            ? 'Các tính năng AI mạnh mẽ như **Chấm bài viết** và **Luyện nói** được cung cấp bởi Google Gemini. Các tính năng này yêu cầu cấu hình API từ phía quản trị viên.'
            : 'Powerful AI features like the **Writing Grader** and **Speaking Partner** are powered by Google Gemini. These features require an API key to be configured by the administrator.',
        features_ai_config_p2: isVietnamese
            ? 'Bạn có thể kiểm tra trạng thái của các dịch vụ AI trong trang **Cài đặt**. Nếu chúng không hoạt động, vui lòng liên hệ với quản trị viên hoặc bộ phận hỗ trợ của bạn.'
            : 'You can check the status of the AI services in the **Settings** page. If they are inactive, please contact your administrator or support.',

        teacher_title: isVietnamese ? 'Dành cho Giáo viên' : 'For Teachers',
        teacher_p1: isVietnamese
            ? 'Trên **Bảng điều khiển giáo viên**, bạn có thể tạo các lớp học mới và thêm học sinh vào các lớp đó. Điều này cho phép bạn theo dõi tiến độ và quản lý việc học của họ một cách hiệu quả.'
            : 'In the **Teacher Dashboard**, you can create new classes and add students to them. This allows you to track their progress and manage their learning effectively.',
        teacher_import_title: isVietnamese ? 'Nhập Học sinh và Bảng điểm từ Excel' : 'Importing Students & Grades from Excel',
        teacher_import_p1: isVietnamese
            ? 'Để thêm nhanh nhiều học sinh, hãy sử dụng tính năng **Nhập từ Excel**. Trong bảng điều khiển của một lớp học, nhấp vào **"Tải mẫu"** để tải xuống tệp Excel được định dạng sẵn.'
            : 'To quickly add multiple students, use the **Import from Excel** feature. Inside a class dashboard, click **"Download Template"** to get a pre-formatted Excel file.',
        teacher_import_p2: isVietnamese
            ? 'Tệp mẫu bao gồm các cột cho thông tin học sinh (STT, Họ và tên, Ngày sinh, Giới tính) và các cột điểm khác nhau có hệ số được chỉ định (Điểm Miệng x1, 15 phút x1, Giữa kỳ x2, Cuối kỳ x3).'
            : 'The template includes columns for student information (No., Full Name, Date of Birth, Gender) and various grade columns with specified coefficients (Oral x1, 15-min x1, Mid-term x2, Final-term x3).',
        teacher_import_p3: isVietnamese
            ? 'Sau khi điền thông tin vào tệp, hãy lưu và tải nó lên bằng nút **"Tải file"**. Ứng dụng sẽ tự động thêm các học sinh mới vào lớp của bạn và **tính toán điểm trung bình có trọng số** cho mỗi học sinh dựa trên các điểm đã nhập.'
            : 'After filling out the file, save and upload it using the **"Upload File"** button. The application will automatically add the new students to your class and **calculate the weighted average score** for each student based on the entered grades.',

        student_title: isVietnamese ? 'Dành cho Học sinh' : 'For Students',
        student_p1: isVietnamese
            ? '**Trang chủ** của bạn hiển thị các chỉ số gamification để tạo động lực học tập: **Điểm (Points)**, **Chuỗi ngày học (Streak)**, và **Huy hiệu (Badges)**. Hãy hoàn thành các bài học để xem các chỉ số này tăng lên!'
            : 'Your **Home** page displays gamification stats to motivate you: **Points**, **Streak**, and **Badges**. Keep completing lessons to see them grow!',

        duns: 'Mã D-U-N-S: 646434880',
        copyright: isVietnamese ? '© 2025 IVS JSC. Mọi quyền được bảo lưu.' : '© 2025 IVS JSC. All rights reserved.',
        developed_by: isVietnamese ? 'Được thiết kế và phát triển bởi IVS Celestech, IVS JSC.' : 'Designed and developed by IVS Celestech, IVS JSC.',
        contact_phone_label: isVietnamese ? 'Số điện thoại Liên hệ' : 'Contact Phone',
        contact_phone_value: '0795 555 789 (Zalo)',
        website_value: 'ivsacademy.edu.vn',
        email_value: 'info@ivsacademy.edu.vn'
    };
    
    const curriculumContent = {
        title: isVietnamese ? 'Danh sách Toàn bộ Chương trình học IVS English (K-12)' : 'Complete IVS English Curriculum List (K-12)',
        intro: isVietnamese ? 'Dưới đây là danh sách chi tiết các cấp học và chương trình học hiện có trong hệ thống của IVS English, được phân chia theo từng khối lớp từ Mầm non đến Trung học phổ thông.' : 'Below is a detailed list of the school levels and curricula available in the IVS English system, divided by grade from Kindergarten to High School.',
        kindergarten_desc: isVietnamese ? 'Chương trình được thiết kế cho trẻ từ 3-5 tuổi, tập trung vào việc làm quen với tiếng Anh qua các hoạt động vui nhộn và trực quan.' : 'This program is designed for children aged 3-5, focusing on introducing English through fun and visual activities.',
        primary_desc: isVietnamese ? 'Chương trình xây dựng nền tảng tiếng Anh vững chắc cho học sinh từ lớp 1 đến lớp 5.' : 'This program builds a solid English foundation for students from Grade 1 to Grade 5.',
        secondary_desc: isVietnamese ? 'Chương trình bám sát sách giáo khoa của Bộ Giáo dục và Đào tạo, giúp học sinh phát triển toàn diện 4 kỹ năng.' : 'This program follows the Ministry of Education and Training textbooks, helping students develop all 4 skills comprehensively.',
        highschool_desc: isVietnamese ? 'Chương trình nâng cao, bám sát bộ sách Global Success, chuẩn bị kiến thức cho các kỳ thi quan trọng và định hướng tương lai.' : 'An advanced program following the Global Success series, preparing students for important exams and future orientations.',
        view_ebook: isVietnamese ? 'Giáo trình Ebook' : 'Ebook Curriculum'
    };

    const categoryDescriptions = [
        curriculumContent.kindergarten_desc,
        curriculumContent.primary_desc,
        curriculumContent.secondary_desc,
        curriculumContent.highschool_desc,
    ];
    
    const romanNumerals = ['I', 'II', 'III', 'IV'];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-8">
                <i className="fa-solid fa-circle-question text-5xl text-blue-500 mb-4"></i>
                <h1 className="text-4xl font-bold">{content.title}</h1>
            </div>

            <GuideSection title={content.intro_title}>
                <p>{content.intro_p1}</p>
            </GuideSection>
            
            <GuideSection title={content.getting_started_title}>
                <p dangerouslySetInnerHTML={{ __html: content.getting_started_role }}></p>
                <p dangerouslySetInnerHTML={{ __html: content.getting_started_nav }}></p>
            </GuideSection>

            <GuideSection title={content.install_title}>
                <p>{content.install_intro}</p>
                <div className="mt-4">
                    <h4 className="font-semibold">{content.install_windows_title}</h4>
                    <ol className="list-decimal list-inside space-y-1">
                        <li dangerouslySetInnerHTML={{ __html: content.install_windows_step1 }}></li>
                        <li dangerouslySetInnerHTML={{ __html: content.install_windows_step2 }}></li>
                        <li>{content.install_windows_step3}</li>
                    </ol>
                </div>
                 <div className="mt-4">
                    <h4 className="font-semibold">{content.install_ios_title}</h4>
                    <ol className="list-decimal list-inside space-y-1">
                        <li dangerouslySetInnerHTML={{ __html: content.install_ios_step1 }}></li>
                        <li dangerouslySetInnerHTML={{ __html: content.install_ios_step2 }}></li>
                        <li dangerouslySetInnerHTML={{ __html: content.install_ios_step3 }}></li>
                    </ol>
                </div>
                 <div className="mt-4">
                    <h4 className="font-semibold">{content.install_android_title}</h4>
                    <ol className="list-decimal list-inside space-y-1">
                        <li dangerouslySetInnerHTML={{ __html: content.install_android_step1 }}></li>
                        <li dangerouslySetInnerHTML={{ __html: content.install_android_step2 }}></li>
                        <li>{content.install_android_step3}</li>
                    </ol>
                </div>
            </GuideSection>

            <GuideSection title={content.features_title}>
                <h3>{content.features_pinning_title}</h3>
                <p>{content.features_pinning_p1}</p>
                <p dangerouslySetInnerHTML={{ __html: content.features_pinning_p2 }}></p>
                
                <h3 className="!mt-8">{content.features_ai_title}</h3>
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: content.features_ai_speaking }}></li>
                    <li dangerouslySetInnerHTML={{ __html: content.features_ai_writing }}></li>
                </ul>

                <h3 className="!mt-8">{content.features_settings_title}</h3>
                 <ul>
                    <li dangerouslySetInnerHTML={{ __html: content.features_settings_profile }}></li>
                    <li dangerouslySetInnerHTML={{ __html: content.features_settings_data }}></li>
                </ul>
            </GuideSection>

            <GuideSection title={content.features_ai_config_title}>
                <p>{content.features_ai_config_p1}</p>
                <p>{content.features_ai_config_p2}</p>
            </GuideSection>
            
            <GuideSection title={curriculumContent.title}>
                <p>{curriculumContent.intro}</p>
                {curriculumData.map((category, catIndex) => (
                    <div key={catIndex} className="mt-6">
                        <h3 className="!text-xl !font-bold !mb-2">
                            {romanNumerals[catIndex]}. {isVietnamese ? category.category.vi : category.category.en}
                        </h3>
                        <p className="italic mb-2">{categoryDescriptions[catIndex]}</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            {category.levels.map(level => {
                                const levelDesc = isVietnamese 
                                    ? level.subtitle.vi.substring(level.subtitle.vi.indexOf('-') + 1).trim()
                                    : level.subtitle.en.substring(level.subtitle.en.indexOf('-') + 1).trim();

                                return (
                                    <li key={level.level}>
                                        <strong>{isVietnamese ? level.title.vi : level.title.en}:</strong> {levelDesc}
                                        {' '}
                                        <a
                                            href={level.ebookPdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline text-sm font-medium"
                                        >
                                            [{curriculumContent.view_ebook}]
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </GuideSection>

            <GuideSection title={content.teacher_title}>
                <p>{content.teacher_p1}</p>
                <h3 className="!mt-8">{content.teacher_import_title}</h3>
                <p>{content.teacher_import_p1}</p>
                <p>{content.teacher_import_p2}</p>
                <p>{content.teacher_import_p3}</p>
            </GuideSection>

            <GuideSection title={isVietnamese ? 'Dành cho Giáo viên Nước ngoài' : 'For Foreign Teachers'}>
                <p>{isVietnamese 
                    ? 'Giáo viên nước ngoài có thể sử dụng ứng dụng với giao diện ngôn ngữ mặc định là tiếng Anh. Bạn có thể chuyển sang tiếng Việt bất cứ lúc nào trong phần cài đặt.'
                    : 'Foreign teachers can use the application with English as the default language interface. You can switch to Vietnamese anytime in the settings.'}</p>
                <p>{isVietnamese
                    ? 'Tất cả các tính năng dành cho giáo viên đều khả dụng, bao gồm quản lý lớp học, theo dõi tiến độ học sinh và sử dụng công cụ AI.'
                    : 'All teacher features are available, including class management, student progress tracking, and AI tools usage.'}</p>
            </GuideSection>

            <GuideSection title={content.student_title}>
                <p dangerouslySetInnerHTML={{ __html: content.student_p1 }}></p>
            </GuideSection>

            <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <p className="font-semibold">{content.duns}</p>
                <p>{content.copyright}</p>
                <p>{content.developed_by}</p>
                <div className="pt-2 flex items-center justify-center gap-x-6 gap-y-1 flex-wrap">
                    <span><i className="fa-solid fa-phone mr-1"></i> {content.contact_phone_label}: {content.contact_phone_value}</span>
                    <a href="https://ivsacademy.edu.vn" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-500">
                        <i className="fa-solid fa-globe mr-1"></i> Website: {content.website_value}
                    </a>
                    <a href={`mailto:${content.email_value}`} className="hover:underline hover:text-blue-500">
                        <i className="fa-solid fa-envelope mr-1"></i> Email: {content.email_value}
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default UserGuide;