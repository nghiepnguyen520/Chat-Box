db.createUser({
  user: 'admin',
  pwd: '12345678',
  roles: [
    {
      role: 'readWrite',
      db: 'chatbox',
    },
  ],
});
