import "./index.css";

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={user.login}
      />

      <h2>{user.name}</h2>

      <p className="username">
        @{user.login}
      </p>

      <p>{user.bio}</p>

      <p>📍 {user.location}</p>

      <div className="stats">
        <span>
          Followers: {user.followers}
        </span>

        <span>
          Following: {user.following}
        </span>

        <span>
          Repos: {user.public_repos}
        </span>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        Visit Profile
      </a>
    </div>
  );
}