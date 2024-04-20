
import React from "react";

const TaskSkeleton = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
      <div className="skeleton-card">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-priority"></div>
        <div className="skeleton-status"></div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-priority"></div>
        <div className="skeleton-status"></div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-priority"></div>
        <div className="skeleton-status"></div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-priority"></div>
        <div className="skeleton-status"></div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-priority"></div>
        <div className="skeleton-status"></div>
      </div>
    </div>
  );
};

export default TaskSkeleton;