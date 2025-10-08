export const demoClassOptions: any[] = [];

export const fetchClassAnalyticsDemo = async (classId?: string) => {
	// Return a shaped object matching expected ClassData for legacy callers
	return {
		id: classId || 'demo-class',
		name: 'Demo Class',
		teacherId: 'demo-teacher',
		students: [],
		summary: {}
	};
};
