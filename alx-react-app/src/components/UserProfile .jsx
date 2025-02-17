function UserProfile({ name, age, bio }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>age: {age}</p>
      <p>bio: {bio}</p>
    </div>
  );
}

export default UserProfile;
