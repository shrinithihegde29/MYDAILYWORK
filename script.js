window.onload = function() {
  let today = new Date();
  let hour = today.getHours();
  let greet;
  if(hour < 12) greet = "Good Morning!";
  else if(hour < 17) greet = "Good Afternoon!";
  else greet = "Good Evening!";

  // Create greeting banner
  let banner = document.createElement('div');
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('tabindex', '0');
  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '50%';
  banner.style.transform = 'translateX(-50%) translateY(-100%)';
  banner.style.background = 'linear-gradient(90deg, #185a9d 0%, #1e90ff 100%)';
  banner.style.backgroundSize = '200% 200%';
  banner.animate([
    { backgroundPosition: '0% 50%' },
    { backgroundPosition: '100% 50%' },
    { backgroundPosition: '0% 50%' }
  ], {
    duration: 6000,
    iterations: Infinity
  });
  banner.style.color = '#fff';
  banner.style.padding = '16px 32px';
  banner.style.borderRadius = '0 0 12px 12px';
  banner.style.boxShadow = '0 8px 32px #185a9d33, 0 2px 8px #fff8';
  banner.style.fontSize = '1.1em';
  banner.style.zIndex = '9999';
  banner.style.opacity = '0';
  banner.style.maxWidth = '95vw';
  banner.style.minWidth = '220px';
  banner.style.display = 'flex';
  banner.style.alignItems = 'center';
  banner.style.justifyContent = 'center';
  banner.style.gap = '12px';
  banner.style.transition = 'opacity 0.7s, transform 0.7s cubic-bezier(.77,0,.18,1)';

  // Add icon
  let icon = document.createElement('span');
  icon.textContent = '👋';
  icon.style.fontSize = '1.5em';
  banner.appendChild(icon);

  // Add text
  let text = document.createElement('span');
  text.textContent = greet + " Welcome to my website.";
  banner.appendChild(text);

  // Dismiss button
  let closeBtn = document.createElement('span');
  closeBtn.textContent = '×';
  closeBtn.style.marginLeft = '18px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.fontSize = '1.3em';
  closeBtn.style.lineHeight = '1';
  closeBtn.style.boxShadow = '0 2px 8px #1e90ff55';
  closeBtn.style.borderRadius = '50%';
  closeBtn.style.padding = '0 8px';
  closeBtn.setAttribute('aria-label', 'Close greeting');
  closeBtn.setAttribute('tabindex', '0');
  closeBtn.onclick = function() {
    banner.style.opacity = '0';
    banner.style.transform = 'translateX(-50%) translateY(-100%)';
    setTimeout(() => banner.remove(), 700);
  };
  closeBtn.onkeydown = function(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      closeBtn.click();
    }
  };
  banner.appendChild(closeBtn);

  document.body.appendChild(banner);
  setTimeout(() => {
    banner.style.opacity = '1';
    banner.style.transform = 'translateX(-50%) translateY(0)';
    banner.focus();
  }, 100);

  // Auto-dismiss after 6 seconds
  setTimeout(() => {
    if(document.body.contains(banner)) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateX(-50%) translateY(-100%)';
      setTimeout(() => banner.remove(), 700);
    }
  }, 6000);
}