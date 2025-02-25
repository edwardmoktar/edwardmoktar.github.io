// This script fixes the MIME type issues on GitHub Pages
(function() {
  function correctPath(path) {
    if (path.startsWith('/')) {
      return '.' + path;
    }
    return path;
  }

  // Get the scripts from the generated HTML
  fetch('./index.html')
    .then(response => response.text())
    .then(html => {
      const scripts = html.match(/<script[^>]*src="[^"]*"[^>]*>/g) || [];
      
      scripts.forEach(scriptTag => {
        // Extract src attribute
        const src = scriptTag.match(/src="([^"]*)"/)[1];
        const type = scriptTag.includes('type="module"') ? 'module' : 'text/javascript';
        
        // Create and append the script
        const script = document.createElement('script');
        script.type = type;
        script.src = correctPath(src);
        document.body.appendChild(script);
      });
    });
})(); 