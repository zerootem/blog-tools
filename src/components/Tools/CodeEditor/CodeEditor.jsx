import React, { useState, useRef, useEffect } from 'react';
import './CodeEditor.css'; // سننشئ ملف التنسيق بعد قليل

const CodeEditor = () => {
  // References to textareas and iframe
  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);
  const iframeRef = useRef(null);

  // State for active tab
  const [activeTab, setActiveTab] = useState('html');

  // Function to update preview
  const updatePreview = () => {
    const html = htmlRef.current.value;
    const css = cssRef.current.value;
    const js = jsRef.current.value;
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `);
    doc.close();
    iframe.classList.remove('fade-in');
    setTimeout(() => iframe.classList.add('fade-in'), 10);
    // يمكن إضافة إشعار نجاح هنا لاحقاً
  };

  // Load saved code from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bloggerCodeEditor');
    if (saved) {
      try {
        const { html, css, js } = JSON.parse(saved);
        if (htmlRef.current) htmlRef.current.value = html || '';
        if (cssRef.current) cssRef.current.value = css || '';
        if (jsRef.current) jsRef.current.value = js || '';
        updatePreview();
      } catch (e) {
        console.error('Failed to load saved code', e);
      }
    }
  }, []);

  // Handlers
  const handleRun = () => {
    updatePreview();
    // showNotification('تم تشغيل الكود بنجاح', 'success');
  };

  const handleSave = () => {
    const html = htmlRef.current.value.trim();
    const css = cssRef.current.value.trim();
    const js = jsRef.current.value.trim();
    if (!html && !css && !js) {
      // showNotification('لا يوجد كود لحفظه!', 'warning');
      return;
    }
    const data = { html, css, js, timestamp: Date.now() };
    localStorage.setItem('bloggerCodeEditor', JSON.stringify(data));
    // showNotification('تم حفظ الكود بنجاح');
  };

  const handleLoadFile = () => {
    const extension = activeTab === 'html' ? '.html,.htm' : `.${activeTab}`;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = extension;
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target.result;
        if (activeTab === 'html') htmlRef.current.value = content;
        else if (activeTab === 'css') cssRef.current.value = content;
        else if (activeTab === 'js') jsRef.current.value = content;
        updatePreview();
        // showNotification(`تم تحميل الملف: ${file.name}`);
      };
      reader.onerror = () => {
        // showNotification('خطأ في قراءة الملف', 'error');
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClear = () => {
    if (htmlRef.current.value || cssRef.current.value || jsRef.current.value) {
      htmlRef.current.value = '';
      cssRef.current.value = '';
      jsRef.current.value = '';
      updatePreview();
      // showNotification('تم مسح جميع الأكواد');
    } else {
      // showNotification('لا يوجد محتوى لمسحه!', 'warning');
    }
  };

  return (
    <div className="code-editor-wrapper">
      <div className="heroBox">
        <div className="BoxTool">
          <h2 className="title dt" id="Features">
            <span className="new">اداة محرر أكواد</span>
          </h2>
          <div className="container">
            {/* Buttons */}
            <div className="buttons-grid">
              <button className="rtl-btn" onClick={handleRun}>
                <svg className="line" height="16" viewBox="0 0 24 24" width="16">
                  <path d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z" strokeMiterlimit="10"></path>
                </svg>
                تشغيل
              </button>
              <button className="rtl-btn" onClick={handleSave}>
                <svg className="line" height="16" viewBox="0 0 24 24" width="16">
                  <path d="M12.89 5.87988H5.10999C3.39999 5.87988 2 7.27987 2 8.98987V20.3499C2 21.7999 3.04 22.4199 4.31 21.7099L8.23999 19.5199C8.65999 19.2899 9.34 19.2899 9.75 19.5199L13.68 21.7099C14.95 22.4199 15.99 21.7999 15.99 20.3499V8.98987C16 7.27987 14.6 5.87988 12.89 5.87988Z"></path>
                  <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z"></path>
                  <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z"></path>
                </svg>
                حفظ
              </button>
              <button className="rtl-btn" onClick={handleLoadFile}>
                <svg className="line" height="16" viewBox="0 0 24 24" width="16">
                  <path d="M9 11V17L11 15"></path>
                  <path d="M9 17L7 15"></path>
                  <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"></path>
                  <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z"></path>
                </svg>
                تحميل
              </button>
              <button className="rtl-btn" onClick={handleClear}>
                <svg className="line" height="16" viewBox="0 0 24 24" width="16">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
                  <path d="M9.16998 14.83L14.83 9.17004"></path>
                  <path d="M14.83 14.83L9.16998 9.17004"></path>
                </svg>
                مسح الكل
              </button>
            </div>

            {/* Tabs */}
            <div className="editor-tabs">
              <div
                className={`editor-tab ${activeTab === 'html' ? 'active' : ''}`}
                onClick={() => setActiveTab('html')}
              >
                HTML
              </div>
              <div
                className={`editor-tab ${activeTab === 'css' ? 'active' : ''}`}
                onClick={() => setActiveTab('css')}
              >
                CSS
              </div>
              <div
                className={`editor-tab ${activeTab === 'js' ? 'active' : ''}`}
                onClick={() => setActiveTab('js')}
              >
                JavaScript
              </div>
            </div>

            {/* Editors */}
            <div className="editor-container">
              <div className={`editor-panel ${activeTab === 'html' ? 'active' : ''}`}>
                <textarea
                  ref={htmlRef}
                  className="editor-textarea"
                  placeholder="أكتب كود HTML هنا..."
                  onChange={updatePreview} // اختياري: تحديث مباشر
                />
              </div>
              <div className={`editor-panel ${activeTab === 'css' ? 'active' : ''}`}>
                <textarea
                  ref={cssRef}
                  className="editor-textarea"
                  placeholder="أكتب كود CSS هنا..."
                  onChange={updatePreview}
                />
              </div>
              <div className={`editor-panel ${activeTab === 'js' ? 'active' : ''}`}>
                <textarea
                  ref={jsRef}
                  className="editor-textarea"
                  placeholder="أكتب كود JavaScript هنا..."
                  onChange={updatePreview}
                />
              </div>
            </div>

            {/* Preview Section */}
            <div className="preview-section">
              <div className="preview-header">
                <b className="preview-title">معاينة النتيجة</b>
                <div className="preview-actions">
                  <button id="refresh-btn" onClick={updatePreview} title="تحديث المعاينة">
                    <svg className="line" height="18" viewBox="0 0 24 24" width="18">
                      <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="preview-container">
                <iframe
                  ref={iframeRef}
                  className="preview-frame"
                  title="preview"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
