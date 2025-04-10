import React, { useEffect, useState } from "react";
import './App.css'
import './App1.css'

const API_KEY = "761646e069884e0f9e5f7f20cef25227";
const BASE_URL = "https://newsapi.org/v2/everything?q=";

const App = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("India");
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState({});

    useEffect(() => {
        if (isLoggedIn) fetchNews(query);
    }, [isLoggedIn]);

    const fetchNews = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}${query}&apiKey=${API_KEY}`);
            if (!response.ok) throw new Error("Failed to fetch news");
            const data = await response.json();
            setArticles(data.articles);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        if (username && password) {
            setUsers({ ...users, [username]: password });
            alert("Signup successful! Please log in.");
            setIsSignup(false);
        } else {
            alert("Please enter valid details.");
        }
    };

    const handleLogin = () => {
        if (users[username] && users[username] === password) {
            setIsLoggedIn(true);
        } else {
            alert("Invalid credentials");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <h1>Welcome to PND Explore</h1>
                <div className="login-box centered-box">
                    <h2>{isSignup ? "Sign Up" : "Login"}</h2>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {isSignup ? (
                        <button onClick={handleSignup}>Sign Up</button>
                    ) : (
                        <button onClick={handleLogin}>Login</button>
                    )}
                    <p onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <nav>
                <div className="main-nav container flex">
                    <button onClick={() => window.location.reload()} className="company-logo">
                        <img src="https://static.vecteezy.com/system/resources/previews/009/200/840/non_2x/pnd-letter-logo-design-with-polygon-shape-pnd-polygon-and-cube-shape-logo-design-pnd-hexagon-logo-template-white-and-black-colors-pnd-monogram-business-and-real-estate-logo-vector.jpg" alt="company logo" width="70px" />
                    </button>
                    <div className="nav-links">
                        <ul className="flex">
                            {["ipl", "finance", "politics", "education", "india", "uttar pradesh", "lucknow"].map((category) => (
                                <li key={category} className="hover-link nav-item" onClick={() => fetchNews(category)}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="search-bar flex">
                        <input
                            type="text"
                            className="news-input"
                            placeholder="e.g. Science"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && fetchNews(query)}
                        />
                        <button className="search-button" onClick={() => fetchNews(query)}>
                            Search
                        </button>
                    </div>
                </div>
            </nav>

            <main>
                <div className="cards-container container flex">
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    {articles.map((article, index) => (
                        article.urlToImage && (
                            <div key={index} className="card" onClick={() => window.open(article.url, "_blank")}> 
                                <div className="card-header">
                                    <img src={article.urlToImage} alt="news" />
                                </div>
                                <div className="card-content">
                                    <h3>{article.title}</h3>
                                    <h6 className="news-source">
                                        {article.source.name} · {new Date(article.publishedAt).toLocaleString()}
                                    </h6>
                                    <p className="news-desc">{article.description}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </main>

            <footer>
                <p>Made by: Ratneesh Pandey / Ayan Mohd. / Anshuman Patel</p>
                <p>Email: ratneesh09@gmail.com</p>
                <img src="https://static.vecteezy.com/system/resources/previews/009/200/840/non_2x/pnd-letter-logo-design-with-polygon-shape-pnd-polygon-and-cube-shape-logo-design-pnd-hexagon-logo-template-white-and-black-colors-pnd-monogram-business-and-real-estate-logo-vector.jpg" alt="company logo" width="300px" />
                <p>NEWS SEGMENTATION MADE BY SRMU STUDENTS</p>
            </footer>
        </div>
    );
};

export default App;
