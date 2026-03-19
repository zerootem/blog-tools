import React from 'react';

const ToolCard = ({ tool }) => {
  return (
    <div className="tool-card">
      <span className="tool-icon">{tool.icon}</span>
      <h3>{tool.modweeb}</h3>
      <p>{tool.description}</p>
      <button className="tool-button">استخدم الأداة</button>
    </div>
  );
};

export default ToolCard;
