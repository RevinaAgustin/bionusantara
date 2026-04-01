export const debugAuth = () => {
  console.group('🔐 DEBUG AUTHENTICATION');
  console.log('localStorage isLoggedIn:', localStorage.getItem('isLoggedIn'));
  console.log('typeof:', typeof localStorage.getItem('isLoggedIn'));
  console.log('boolean value:', localStorage.getItem('isLoggedIn') === 'true');
  
  console.log('Custom events yang tersedia:');
  console.log('- loginStateChanged');
  
  console.log('Mencoba dispatch event...');
  window.dispatchEvent(new Event('loginStateChanged'));
  console.log('✅ Event dispatched');
  
  console.groupEnd();
};

(window as any).debugAuth = debugAuth;
(window as any).forceLogin = () => {
  localStorage.setItem('isLoggedIn', 'true');
  window.dispatchEvent(new Event('loginStateChanged'));
  console.log('✅ Forced login - isLoggedIn = true');
  location.reload();
};
(window as any).forceLogout = () => {
  localStorage.removeItem('isLoggedIn');
  window.dispatchEvent(new Event('loginStateChanged'));
  console.log('✅ Forced logout - isLoggedIn = false');
  location.reload();
};