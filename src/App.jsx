import { useState } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

import {
  fetchUser,
  fetchRepos,
} from "./components/Services";

export default function App() {
  const [username, setUsername] =
    useState("");

  const [user, setUser] = useState(null);

  const [repos, setRepos] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username.trim()) return;

    try {
      setLoading(true);

      setError("");

      // Fetch user profile
      const userData = await fetchUser(
        username
      );

      // Fetch repositories
      const repoData = await fetchRepos(
        username
      );

      // Top 5 repos by stars
      const topRepos = repoData
        .sort(
          (a, b) =>
            b.stargazers_count -
            a.stargazers_count
        )
        .slice(0, 5);

      setUser(userData);

      setRepos(topRepos);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not found");
      } else if (
        err.response?.status === 403
      ) {
        setError(
          "GitHub API rate limit exceeded"
        );
      } else {
        setError(
          "Network error. Please try again."
        );
      }

      setUser(null);

      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
  
  <div className="app">
    <h1 className="title">
      GitHub User Search Dashboard
    </h1>

    <SearchBar
      username={username}
      setUsername={setUsername}
      handleSearch={handleSearch}
    />

    {loading && <Loader />}

    {error && (
      <ErrorMessage message={error} />
    )}

    {(user || repos.length > 0) && (
      <div className="dashboard-layout">
        {/* User Section */}
        <div className="left-section">
          {user && <UserCard user={user} />}
        </div>

        {/* Repo Section */}
        <div className="right-section">
          {repos.length > 0 && (
            <>
              <h2 className="repo-title">
                Top Repositories
              </h2>

              <RepoList repos={repos} />
            </>
          )}
        </div>
      </div>
    )}
  </div>
);
  
}