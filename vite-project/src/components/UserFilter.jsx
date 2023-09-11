import React, { useState, useEffect } from "react";
import Cart from './homepage/cart/Cart'

function UserFilter(props) {
  const { username } = props;
  const [curUser, setCurUser] = useState(null); // Initialize as null

  useEffect(() => {
    async function renderUser() {
      try {
        const response = await fetch(`https://fakestoreapi.com/users`);
        const result = await response.json();
        const filteredUsers = result.filter(user => user.username === username);
        if (filteredUsers.length > 0) {
          const item = filteredUsers[0];
          setCurUser(item.id);
          console.log(item.id);
        } else {
          console.log("User not found");
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    renderUser();
  }, [username]);

  return (
    <div>
        <Cart />
    </div>
  );
}

export default UserFilter;