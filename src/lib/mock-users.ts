
// In a real application, this would be a database.
// For demonstration purposes, we're using an in-memory array.

type User = {
  email: string;
  password?: string; // Make password optional as we might not always have it
  status: 'approved' | 'pending' | 'rejected';
  firstLogin: boolean;
  name: string;
};

export let mockUsers: User[] = [
  { email: "admin@susu.bank", password: "mkisdeadmin", status: "approved", firstLogin: false, name: "Admin" },
  { email: "new@susu.bank", password: "password123", status: "pending", firstLogin: true, name: "New User" },
  { email: "first.timer@susu.bank", password: "password123", status: "approved", firstLogin: true, name: "First Timer" },
  { email: "approved@susu.bank", password: "password123", status: "approved", firstLogin: false, name: "Approved User" },
];


export const addUser = (user: User) => {
  const existingUser = mockUsers.find(u => u.email === user.email);
  if (!existingUser) {
    mockUsers.push(user);
    console.log("User added:", user);
    console.log("Current users:", mockUsers);
  } else {
    console.log("User already exists:", user.email);
  }
};
