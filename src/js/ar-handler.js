/**
 * AR Handler - Mengelola deteksi marker dan tampilan objek AR
 * Menggunakan AR.js dengan barcode marker system
 */

// Global variable untuk menyimpan data konten
let markersData = null;
let currentMarker = null;

/**
 * Inisialisasi AR Handler
 * Dipanggil saat halaman ar-viewer.html selesai load
 */
async function initARHandler() {
  try {
    console.log('Initializing AR Handler...');
    
    // Load data konten dari JSON
    await loadMarkersData();
    
    // Setup AR scene
    setupARScene();
    
    // Setup event listeners untuk marker detection
    setupMarkerListeners();
    
    console.log('AR Handler initialized successfully');
  } catch (error) {
    console.error('Failed to initialize AR Handler:', error);
    showError('Gagal memuat data. Silakan refresh halaman.');
  }
}

/**
 * Load data markers dari contents.json
 */
async function loadMarkersData() {
  try {
    const response = await fetch('src/data/contents.json');
    if (!response.ok) {
      throw new Error('Failed to load markers data');
    }
    
    const data = await response.json();
    markersData = data.markers;
    
    console.log(`Loaded ${markersData.length} markers data`);
  } catch (error) {
    console.error('Error loading markers data:', error);
    throw error;
  }
}

/**
 * Setup AR.js scene
 */
function setupARScene() {
  const scene = document.querySelector('a-scene');
  
  if (!scene) {
    console.error('A-Frame scene not found');
    return;
  }
  
  // Event ketika AR scene sudah siap
  scene.addEventListener('loaded', () => {
    console.log('AR Scene loaded');
    hideLoadingScreen();
  });
  
  // Event ketika kamera tidak bisa diakses
  scene.addEventListener('camera-error', (error) => {
    console.error('Camera error:', error);
    showError('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diaktifkan.');
  });
}

/**
 * Setup event listeners untuk setiap marker
 */
function setupMarkerListeners() {
  // Loop untuk semua marker 0-9
  for (let i = 0; i < 10; i++) {
    const markerElement = document.querySelector(`a-marker[type="barcode"][value="${i}"]`);
    
    if (markerElement) {
      // Event ketika marker terdeteksi
      markerElement.addEventListener('markerFound', () => {
        handleMarkerFound(i);
      });
      
      // Event ketika marker hilang
      markerElement.addEventListener('markerLost', () => {
        handleMarkerLost(i);
      });
    }
  }
}

/**
 * Handler ketika marker ditemukan
 * @param {number} markerId - ID marker yang terdeteksi (0-9)
 */
function handleMarkerFound(markerId) {
  console.log(`Marker ${markerId} detected`);
  
  // Cari data marker dari JSON
  const markerData = markersData.find(m => m.id === markerId);
  
  if (!markerData) {
    console.error(`Marker data not found for ID ${markerId}`);
    return;
  }
  
  currentMarker = markerData;
  
  // Cek apakah ini virtual tour atau objek biasa
  if (markerData.type === 'virtual-tour') {
    // Untuk marker 8 & 9 (Borobudur/Prambanan)
    showVirtualTourPopup(markerData);
  } else {
    // Untuk marker 0-7 (objek biasa)
    showARObject(markerData);
  }
  
  // Tampilkan info singkat di layar
  showMarkerInfo(markerData);
}

/**
 * Handler ketika marker hilang dari pandangan
 * @param {number} markerId - ID marker yang hilang
 */
function handleMarkerLost(markerId) {
  console.log(`Marker ${markerId} lost`);
  
  // Sembunyikan info marker
  hideMarkerInfo();
  
  currentMarker = null;
}

/**
 * Tampilkan objek AR di atas marker
 * @param {Object} markerData - Data marker dari JSON
 */
function showARObject(markerData) {
  const markerElement = document.querySelector(`a-marker[value="${markerData.id}"]`);
  
  if (!markerElement) return;
  
  // Cari atau buat image entity
  let imageEntity = markerElement.querySelector('a-image');
  
  if (!imageEntity) {
    imageEntity = document.createElement('a-image');
    markerElement.appendChild(imageEntity);
  }
  
  // Set image source dan properti
  imageEntity.setAttribute('src', markerData.image);
  imageEntity.setAttribute('rotation', '-90 0 0'); // Rotate agar menghadap ke atas
  imageEntity.setAttribute('scale', '1 1 1');
  imageEntity.setAttribute('position', '0 0.1 0'); // Sedikit di atas marker
  
  // Animasi fade in
  imageEntity.setAttribute('animation', {
    property: 'scale',
    from: '0 0 0',
    to: '1 1 1',
    dur: 500,
    easing: 'easeOutQuad'
  });
}

/**
 * Tampilkan popup untuk virtual tour
 * @param {Object} markerData - Data marker virtual tour
 */
function showVirtualTourPopup(markerData) {
  // Panggil fungsi dari info-modal.js
  openVirtualTourModal(markerData);
}

/**
 * Tampilkan info marker di overlay screen
 * @param {Object} markerData - Data marker
 */
function showMarkerInfo(markerData) {
  const infoOverlay = document.getElementById('marker-info-overlay');
  
  if (!infoOverlay) {
    console.warn('Marker info overlay not found');
    return;
  }
  
  // Update konten overlay
  const titleElement = infoOverlay.querySelector('.marker-title');
  const eraElement = infoOverlay.querySelector('.marker-era');
  
  if (titleElement) titleElement.textContent = markerData.name;
  if (eraElement) eraElement.textContent = markerData.era;
  
  // Tampilkan overlay
  infoOverlay.classList.add('visible');
  
  // Jika bukan virtual tour, tampilkan button "Lihat Detail"
  if (markerData.type !== 'virtual-tour') {
    const detailButton = infoOverlay.querySelector('.btn-detail');
    if (detailButton) {
      detailButton.style.display = 'block';
      detailButton.onclick = () => {
        openInfoModal(markerData);
      };
    }
  }
}

/**
 * Sembunyikan info marker overlay
 */
function hideMarkerInfo() {
  const infoOverlay = document.getElementById('marker-info-overlay');
  
  if (infoOverlay) {
    infoOverlay.classList.remove('visible');
  }
}

/**
 * Tampilkan loading screen
 */
function showLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
  }
}

/**
 * Sembunyikan loading screen
 */
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

/**
 * Tampilkan pesan error
 * @param {string} message - Pesan error
 */
function showError(message) {
  const errorContainer = document.getElementById('error-container');
  
  if (!errorContainer) {
    // Fallback jika container tidak ada
    alert(message);
    return;
  }
  
  errorContainer.querySelector('.error-message').textContent = message;
  errorContainer.style.display = 'flex';
  
  // Auto hide setelah 5 detik
  setTimeout(() => {
    errorContainer.style.display = 'none';
  }, 5000);
}

// Export functions untuk digunakan di file lain
window.initARHandler = initARHandler;
window.handleMarkerFound = handleMarkerFound;
window.handleMarkerLost = handleMarkerLost;
