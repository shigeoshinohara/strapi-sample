// plugins/upload/admin/src/utils/upload.js
export const checkFileExists = async (fileName) => {
  try {
    const response = await fetch(`/upload/files?filters[name][$eq]=${fileName}`);
    const data = await response.json();
    return data.results.length > 0;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};
