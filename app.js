const http = require('http');
const fs = require('fs');
const path = require('path');

// 递归函数，用于构建静态资源的绝对路径
function getFilePath(publicPath, url) {
  // 解码URL编码的路径
  const decodedUrl = decodeURIComponent(url);

  const filePath = path.join(publicPath, decodedUrl);

  // 如果文件不存在，尝试构建更深层次的路径
  if (!fs.existsSync(filePath)) {
    const nestedPath = path.join(publicPath, 'html', decodedUrl);
    if (fs.existsSync(nestedPath)) {
      return nestedPath;
    }
  }

  return filePath;
}

const server = http.createServer((req, res) => {
  let url = req.url;

  // 如果URL为空（根路径），将其重定向到index.html
  if (url === '/') {
    url = '/index.html';
  }

  // 构建静态资源的绝对路径，基于你的PPT目录
  const publicPath = path.join(__dirname, 'sxgc');
  const filePath = getFilePath(publicPath, url);

  // 读取文件并发送响应
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('data is not true');
    } else {
      // 获取文件扩展名，设置对应的Content-Type
      const extname = path.extname(filePath);
      let contentType = 'text/html';
      switch (extname) {
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 1213;
server.listen(PORT, () => {
  console.log(`http://172.19.207.99:${PORT}`);
});
