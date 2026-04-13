export const getActiveobj = (obj: any[], filter: string = 'all') => {
    const now = new Date();
    const filterLower = filter.toLowerCase();

    if (filterLower === 'all') return obj;

    return obj.filter((curr_obj: any) => {
        const expiryDate = new Date(curr_obj.end_date);
        expiryDate.setHours(23, 59, 59, 999);

        const isActive = expiryDate >= now;
        return filterLower === 'active' ? isActive : !isActive;
    });
};