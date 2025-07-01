// Utility functions for formatting and data manipulation

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const sortByDate = (array, dateField = 'date', order = 'desc') => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const filterByDateRange = (array, dateField, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return array.filter(item => {
    const itemDate = new Date(item[dateField]);
    return itemDate >= start && itemDate <= end;
  });
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

export const calculateTotalVolume = (trades) => {
  return trades.reduce((total, trade) => total + trade.amount, 0);
};

export const getTradeTypeColor = (type) => {
  return type === 'Buy' ? 'text-green-600' : 'text-red-600';
};

export const getTradeTypeBgColor = (type) => {
  return type === 'Buy' ? 'bg-green-500' : 'bg-red-500';
};

export const getPartyColor = (party) => {
  return party === 'Democratic' 
    ? 'bg-blue-100 text-blue-800' 
    : 'bg-red-100 text-red-800';
};

export const searchOfficials = (officials, searchTerm) => {
  if (!searchTerm || searchTerm.length < 2) return [];
  
  const term = searchTerm.toLowerCase();
  return officials.filter(official => 
    official.name.toLowerCase().includes(term) ||
    official.state.toLowerCase().includes(term) ||
    official.title.toLowerCase().includes(term)
  );
};

export const filterByPosition = (officials, position) => {
  if (!position) return officials;
  return officials.filter(official => official.position === position);
};

export const generateOfficialInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 3);
};