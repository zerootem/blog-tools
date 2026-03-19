import React from 'react';
import { useParams } from 'react-router-dom';
import { tools } from '../data/tools';
import CodeEditor from '../components/Tools/CodeEditor/CodeEditor';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const ToolDetail = () => {
  const { id } = useParams();
  const tool = tools.find(t => t.id === parseInt(id));

  if (!tool) return <div>الأداة غير موجودة</div>;

  // يمكنك إضافة switch لعرض الأداة المناسبة حسب الـ id
  const renderTool = () => {
    switch (tool.id) {
      case 1:
        return <CodeEditor />;
      // أضف حالات لأدوات أخرى مستقبلاً
      default:
        return <div>الأداة قيد التطوير</div>;
    }
  };

  return (
    <div>
      <Button variant="outline" asChild className="mb-4">
        <Link to="/">← العودة للقائمة</Link>
      </Button>
      <h2 className="text-2xl font-bold mb-4">{tool.name}</h2>
      <div className="mb-4">{renderTool()}</div>
    </div>
  );
};

export default ToolDetail;
