import sanitizeHtml from 'sanitize-html';

function sanitize(html: string) {
    return sanitizeHtml(html, {
        allowedIframeHostnames: ['www.youtube.com'],
    });
}

export default sanitize;
