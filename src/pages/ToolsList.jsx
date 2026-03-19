import React from 'react';
import { tools } from '../data/tools';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'; // سننشئ الكارد بعد قليل
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const ToolsList = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">جميع الأدوات</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{tool.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to={`/tool/${tool.id}`}>استخدم الأداة</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolsList;
