export const formatDate = (dateString:any)=> {
    const date = new Date(dateString);
    
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = date.toLocaleString('en-US', { month: 'short' }); 
    const year = date.getFullYear(); 
    
    return `${day} ${month} ${year}`; 
  }