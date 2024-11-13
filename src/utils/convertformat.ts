
export const formatDate = (dateString:string) =>{
    // Parse the input string and add one day to account for timezone
const date = new Date(dateString);
date.setDate(date.getDate() + 1);

// Format the date
const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  
    return formattedDate;
  }