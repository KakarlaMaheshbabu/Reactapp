import React, { useState, useEffect } from 'react';
import { DefaultButton } from '@fluentui/react';

function Dashboard({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { label: 'Dashboard' },
    { label: 'Reports' },
    { label: 'Settings' },
  ];

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to load data', err));
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#fefefe',
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: '#72A0C1', // soft blue
          color: '#ffffff',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={toggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: 18,
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
          <span style={{ fontSize: 18, fontWeight: '500' }}>My Dashboard</span>
        </div>

        <DefaultButton text="Logout" onClick={onLogout} />
      </header>

      {/* Body layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: collapsed ? 60 : 220,
            backgroundColor: '#e6f0fa', // very light blue
            padding: '24px 8px',
            borderRight: '1px solid #dce3ec',
            transition: 'width 0.3s',
          }}
        >
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {menuItems.map((item) => (
                <li key={item.label} style={{ marginBottom: 16 }}>
                  <a
                    href="#"
                    style={{
                      display: 'block',
                      padding: '10px',
                      borderRadius: 6,
                      color: '#2f4f4f',
                      backgroundColor: '#ffffff',
                      textDecoration: 'none',
                      fontSize: 16,
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                      transition: 'background 0.2s, transform 0.1s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#dbeeff';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {!collapsed && item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '24px' }}>
          <h2 style={{ color: '#2b4c6f' }}>Welcome, Admin!</h2>
          <p style={{ color: '#444' }}>
            This is your dashboard's main content area. Here’s some dummy data:
          </p>

          <div style={{ marginTop: 20 }}>
            {posts.length === 0 ? (
              <p>Loading data...</p>
            ) : (
              <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    style={{
                      marginBottom: 16,
                      padding: 16,
                      borderRadius: 10,
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 6px rgba(245, 175, 175, 0.06)',
                      transition: 'transform 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <h3 style={{ marginBottom: 8, color: '#3b3b3b' }}>
                      {post.title}
                    </h3>
                    <p style={{ color: '#666' }}>{post.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
