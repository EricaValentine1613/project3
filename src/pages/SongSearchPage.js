import React, { useState } from "react";

const YOUTUBE_API_KEY = "AIzaSyD4hyFXrPw3i4jgNmNy46RgRZxwea8xI-c";
const SongSearchPage = async (query) => {
    // Example static data
    const songs = [
        { id: 1, title: "Shape of You", artist: "Ed Sheeran" },
        { id: 2, title: "Blinding Lights", artist: "The Weeknd" },
        { id: 3, title: "Levitating", artist: "Dua Lipa" },
    ];
    return songs.filter(
        (song) =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
    );
};

const SongSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [saved, setSaved] = useState(
        JSON.parse(localStorage.getItem("savedSongs") || "[]")
    );

    const handleSearch = async (e) => {
        e.preventDefault();
        const found = await searchSongs(query);
        setResults(found);
    };

    const saveSong = (song) => {
        if (!saved.find((s) => s.id === song.id)) {
            const updated = [...saved, song];
            setSaved(updated);
            localStorage.setItem("savedSongs", JSON.stringify(updated));
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
            <h1>Song Search</h1>
            <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    value={query}
                    placeholder="Search for songs or artists..."
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: "70%", padding: "0.5rem" }}
                />
                <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>
                    Search
                </button>
            </form>
            <ul>
                {results.map((song) => (
                    <li key={song.id} style={{ marginBottom: "0.5rem" }}>
                        <strong>{song.title}</strong> by {song.artist}
                        <button
                            onClick={() => saveSong(song)}
                            style={{ marginLeft: "1rem", padding: "0.25rem 0.5rem" }}
                            disabled={saved.some((s) => s.id === song.id)}
                        >
                            {saved.some((s) => s.id === song.id) ? "Saved" : "Save"}
                        </button>
                    </li>
                ))}
            </ul>
            <a href="./saved songs page" style={{ display: "block", marginTop: "2rem" }}>
                Go to Saved Songs
            </a>
        </div>
    );
};

export default SongSearch;