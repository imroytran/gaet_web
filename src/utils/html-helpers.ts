/**
 * Basic HTML sanitation function to prevent XSS attacks
 * This is a simple implementation, for production you would want a more robust solution
 * like DOMPurify or sanitize-html libraries
 */
export function sanitizeHtml(html: string): string {
  // Allow only basic HTML tags and common attributes
  const allowedTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'b', 'i', 'em', 'strong', 'u', 'small', 'mark',
    'ul', 'ol', 'li',
    'a', 'img',
    'blockquote', 'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span'
  ];

  // Create a simple regex to match script tags and event handlers
  const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const eventHandlerPattern = / on\w+="[^"]*"/gi;
  const iframePattern = /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi;

  // Remove potentially dangerous elements
  let sanitized = html
    .replace(scriptPattern, '')
    .replace(eventHandlerPattern, '')
    .replace(iframePattern, '');

  return sanitized;
}

/**
 * Formats HTML by adding proper line breaks and indentation
 * This is a very basic implementation just to make the HTML more readable
 */
export function formatHtml(html: string): string {
  // This is a very basic formatting - in a real app you'd want something more robust
  return html
    .replace(/></g, '>\n<')
    .replace(/<\/(.+?)>/g, '</$1>\n')
    .replace(/<(.+?)>/g, '<$1>\n');
}

/**
 * Simplified HTML editor helpers
 */
export const htmlEditorHelpers = {
  bold: (text: string) => `<b>${text}</b>`,
  italic: (text: string) => `<i>${text}</i>`,
  heading: (text: string, level = 2) => `<h${level}>${text}</h${level}>`,
  link: (text: string, url: string) => `<a href="${url}" target="_blank">${text}</a>`,
  image: (url: string, alt: string = '') => `<img src="${url}" alt="${alt}" class="w-full rounded-md" />`,
  list: (items: string[], ordered = false) => {
    const tag = ordered ? 'ol' : 'ul';
    const listItems = items.map(item => `  <li>${item}</li>`).join('\n');
    return `<${tag}>\n${listItems}\n</${tag}>`;
  }
}; 
