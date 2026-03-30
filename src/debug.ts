// src/debug.ts
export const debugAuth = () => {
  console.group('🔐 DEBUG AUTHENTICATION');
  console.log('localStorage isLoggedIn:', localStorage.getItem('isLoggedIn'));
  console.log('typeof:', typeof localStorage.getItem('isLoggedIn'));
  console.log('boolean value:', localStorage.getItem('isLoggedIn') === 'true');
  
  // Cek semua event listeners
  console.log('Custom events yang tersedia:');
  console.log('- loginStateChanged');
  
  // Test dispatch event
  console.log('Mencoba dispatch event...');
  window.dispatchEvent(new Event('loginStateChanged'));
  console.log('✅ Event dispatched');
  
  console.groupEnd();
};

// Export ke window untuk akses mudah di console
(window as any).debugAuth = debugAuth;
(window as any).forceLogin = () => {
  localStorage.setItem('isLoggedIn', 'true');
  window.dispatchEvent(new Event('loginStateChanged'));
  console.log('✅ Forced login - isLoggedIn = true');
  location.reload(); // Paksa reload
};
(window as any).forceLogout = () => {
  localStorage.removeItem('isLoggedIn');
  window.dispatchEvent(new Event('loginStateChanged'));
  console.log('✅ Forced logout - isLoggedIn = false');
  location.reload(); // Paksa reload
};