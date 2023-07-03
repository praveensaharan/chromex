import React from "react";

function UserTable({ users, handleCopyCode, calculateDaysPassed }) {
  return (
    <table className="myTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Language</th>
          <th>Date</th>
          <th>Copy Code</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.language}</td>

            <td>{calculateDaysPassed(user.date)}</td>
            <td>
              <button onClick={() => handleCopyCode(user.code)}>
                Copy Code
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
