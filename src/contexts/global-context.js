import React from 'react';

export const GlobalContext = React.createContext({
  signedIn: true,
  changeSignedInStatus: (newStatus='') => {},
  userID: 0,
  changeUserID: (newID) => {}
});

