
// In a real application, this would be a database.
// For demonstration purposes, we're using an in-memory array.

export type User = {
  email: string;
  password?: string; // Make password optional as we might not always have it
  status: 'approved' | 'pending' | 'rejected';
  firstLogin: boolean;
  name: string;
  statusChangeDate?: string; // ISO date string
};

export let mockUsers: User[] = [
  { email: "admin@susu.bank", password: "mkisdeadmin", status: "approved", firstLogin: false, name: "Admin" },
  { email: "approved@susu.bank", password: "password123", status: "approved", firstLogin: false, name: "Approved User" },
  { email: "new.user@susu.bank", password: "password123", status: "pending", firstLogin: true, name: "New User" },
];


export const addUser = (user: User) => {
  const storedUsers = localStorage.getItem('mockUsers');
  let currentUsers: User[] = storedUsers ? JSON.parse(storedUsers) : mockUsers;
  
  const existingUser = currentUsers.find(u => u.email === user.email);
  if (!existingUser) {
    currentUsers.push(user);
    localStorage.setItem('mockUsers', JSON.stringify(currentUsers));
    console.log("User added:", user);
    console.log("Current users:", currentUsers);
  } else {
    console.log("User already exists:", user.email);
  }
};
