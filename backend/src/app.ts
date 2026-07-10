import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log(req.url, req.method, req.headers);
});

const PORT=4500;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
