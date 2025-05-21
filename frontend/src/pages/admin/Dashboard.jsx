import React, { useEffect, useState } from "react";
import "./style.css"; // Custom CSS for styling

const Dashboard = () => {
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs/count");
        const data = await res.json();
        if (data.success) {
          setBlogCount(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch blog count:", err);
      }
    };

    fetchBlogCount();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>📊 Welcome to Admin Dashboard</h2>
      <p>Manage your blog content from here.</p>

      <div className="stat-card">
        <h4>Total Blogs</h4>
        <p className="count">{blogCount}</p>
        <span>Blogs have been posted.</span>
      </div>
    </div>
  );
};

export default Dashboard;
