import React, { useState, useEffect } from 'react';

function App() {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(data => setAlbums(data))
            .catch(error => console.log(error));
    }, []);

    const fetchPhotos = (albumId) => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
            .then(response => response.json())
            .then(data => setPhotos(data))
            .catch(error => console.log(error));
    };

    const openPopup = (albumId) => {
        setSelectedAlbum(albumId);
        fetchPhotos(albumId);
    };

    const closePopup = () => {
        setSelectedAlbum(null);
        setPhotos([]);
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Creating 3 columns with equal width
        gridGap: '10px' // Adding a gap between items
    };

    const cardStyle = {
        backgroundColor: '#f2f2f2',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const popupStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '4px',
        zIndex: '1',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        maxHeight: '80vh',
        overflowY: 'auto'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'red',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        zIndex: '2'
    };

    const backdropStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1'
    };

    return (
        <div className="App">
            <h1>Albums</h1>
            <div style={gridContainerStyle}>
                {albums.map(album => (
                    <div
                        className="album-card"
                        key={album.id}
                        onClick={() => openPopup(album.id)}
                        style={cardStyle}
                    >
                        <h3>{album.title}</h3>
                    </div>
                ))}
            </div>

            {selectedAlbum && (
                <div>
                    <div style={backdropStyle} onClick={closePopup} />
                    <div style={popupStyle}>
                        <button style={closeButtonStyle} onClick={closePopup}>Close</button>
                        <h2>Album {selectedAlbum}</h2>
                        <div style={gridContainerStyle}>
                            {photos.map(photo => (
                                <div className="photo-card" key={photo.id}>
                                    <img src={photo.thumbnailUrl} alt={photo.title} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;