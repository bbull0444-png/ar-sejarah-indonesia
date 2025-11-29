/**
 * Utility Functions - Helper functions untuk berbagai keperluan
 */

/**
 * Parse URL parameters
 * Contoh: ?tour=borobudur → { tour: 'borobudur' }
 * @returns {Object} - Object berisi semua URL params
 */
function getURLParams() {
  const params = {};
  const searchParams = new URLSearchParams(window.location.search);
  
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  
  return params;
}

/**
 * Get specific URL parameter
 * @param {string} paramName - Nama parameter yang dicari
 * @returns {string|null} - Nilai parameter atau null jika tidak ada
 */
function getURLParam(paramName) {
  const params = getURLParams();
  return params[paramName] || null;
}

/**
 * Redirect ke URL dengan query parameters
 * @param {string} url - Base URL
 * @param {Object} params - Object berisi key-value params
 */
function redirectWithParams(url, params) {
  const searchParams = new URLSearchParams(params);
  const fullUrl = `${url}?${searchParams.toString()}`;
  
  window.location.href = fullUrl;
}

/**
 * Format tanggal ke bahasa Indonesia
 * @param {Date} date - Date object
 * @returns {string} - Tanggal terformat (contoh: "29 November 2025")
 */
function formatDateIndo(date) {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

/**
 * Truncate text ke jumlah kata tertentu
 * @param {string} text - Text yang akan dipotong
 * @param {number} maxWords - Maksimal jumlah kata
 * @returns {string} - Text terpotong dengan "..." di akhir
 */
function truncateText(text, maxWords) {
  if (!text) return '';
  
  const words = text.split(' ');
  
  if (words.length <= maxWords) {
    return text;
  }
  
  return words.slice(0, maxWords).join(' ') + '...';
}

/**
 * Sanitize text untuk mencegah XSS
 * @param {string} text - Text yang akan di-sanitize
 * @returns {string} - Text yang aman
 */
function sanitizeText(text) {
  if (!text) return '';
  
  const temp = document.createElement('div');
  temp.textContent = text;
  return temp.innerHTML;
}

/**
 * Debounce function - Delay eksekusi function
 * Berguna untuk event yang sering terjadi (scroll, resize, input)
 * @param {Function} func - Function yang akan di-debounce
 * @param {number} delay - Delay dalam milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Check apakah device adalah mobile
 * @returns {boolean} - true jika mobile, false jika desktop
 */
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Check apakah browser support WebGL (required untuk AR)
 * @returns {boolean} - true jika support WebGL
 */
function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Check apakah browser support getUserMedia (required untuk camera)
 * @returns {boolean} - true jika support camera access
 */
function isCameraSupported() {
  return !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );
}

/**
 * Show toast notification
 * @param {string} message - Pesan yang ditampilkan
 * @param {string} type - Tipe toast: 'success', 'error', 'info', 'warning'
 * @param {number} duration - Durasi tampil dalam milliseconds (default: 3000)
 */
function showToast(message, type = 'info', duration = 3000) {
  // Cek apakah toast container sudah ada
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    // Buat container jika belum ada
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
    `;
    document.body.appendChild(toastContainer);
  }
  
  // Buat toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    background: ${getToastColor(type)};
    color: white;
    padding: 12px 24px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease-out;
    font-size: 14px;
    max-width: 300px;
  `;
  
  // Tambahkan ke container
  toastContainer.appendChild(toast);
  
  // Auto remove setelah durasi
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

/**
 * Helper untuk mendapatkan warna toast berdasarkan tipe
 * @param {string} type - Tipe toast
 * @returns {string} - CSS color
 */
function getToastColor(type) {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  
  return colors[type] || colors.info;
}

/**
 * Copy text ke clipboard
 * @param {string} text - Text yang akan dicopy
 * @returns {Promise<boolean>} - true jika berhasil
 */
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback untuk browser lama
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Download file dengan JavaScript
 * @param {string} filename - Nama file
 * @param {string} content - Konten file
 * @param {string} mimeType - MIME type (default: 'text/plain')
 */
function downloadFile(filename, content, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Local Storage helpers dengan error handling
 */
const storage = {
  /**
   * Set item ke localStorage
   * @param {string} key - Key
   * @param {any} value - Value (akan di-JSON.stringify)
   * @returns {boolean} - true jika berhasil
   */
  set(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error('localStorage set error:', error);
      return false;
    }
  },
  
  /**
   * Get item dari localStorage
   * @param {string} key - Key
   * @param {any} defaultValue - Default value jika key tidak ada
   * @returns {any} - Parsed value atau defaultValue
   */
  get(key, defaultValue = null) {
    try {
      const stringValue = localStorage.getItem(key);
      return stringValue ? JSON.parse(stringValue) : defaultValue;
    } catch (error) {
      console.error('localStorage get error:', error);
      return defaultValue;
    }
  },
  
  /**
   * Remove item dari localStorage
   * @param {string} key - Key
   * @returns {boolean} - true jika berhasil
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('localStorage remove error:', error);
      return false;
    }
  },
  
  /**
   * Clear semua localStorage
   * @returns {boolean} - true jika berhasil
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('localStorage clear error:', error);
      return false;
    }
  }
};

// Export semua functions
window.utils = {
  getURLParams,
  getURLParam,
  redirectWithParams,
  formatDateIndo,
  truncateText,
  sanitizeText,
  debounce,
  isMobile,
  isWebGLSupported,
  isCameraSupported,
  showToast,
  copyToClipboard,
  downloadFile,
  storage
};
