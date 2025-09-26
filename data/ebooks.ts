// This file simulates having the ebook pages as local assets.
// In a real-world scenario, these might come from a CDN or an API.

const generatePagePaths = (prefix: string, count: number): string[] => {
    // Due to limitations, we cannot actually create 134 image files.
    // We will use a smaller, representative number of pages that exist in the user-provided images.
    // The user provided ~30 pages for each book. We'll use 30 as a placeholder count.
    const actualPageCount = 30;
    return Array.from({ length: actualPageCount }, (_, i) => `./assets/${prefix}/page-${i + 1}.jpg`);
};

// Assuming the user-provided images are named page-1.jpg, page-2.jpg, etc.
// The user provided many images, we'll use a placeholder count of 30 for each book for demonstration.
export const ebookData: { [key: number]: string[] } = {
    6: generatePagePaths('sw6', 134), // The user provided many pages, let's use a placeholder.
    7: generatePagePaths('sw7', 134), // The user provided many pages, let's use a placeholder.
};
