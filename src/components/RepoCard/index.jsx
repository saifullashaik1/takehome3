import "./index.css";

export default function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <h3>{repo.name}</h3>

      <p>
        {repo.description ||
          "No description available"}
      </p>

      <div className="repo-info">
        <span>
          ⭐ {repo.stargazers_count}
        </span>

        <span>
          💻{" "}
          {repo.language || "Unknown"}
        </span>
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
      >
        Open Repo
      </a>
    </div>
  );
}