export const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return ''; // Return empty if the date is invalid
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formatDateToDDMMYYY = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return ''; // Return empty if the date is invalid
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
};

export const formatWithThousandsSeparator = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number); 
  };

