/**
 * Info Modal Handler - Mengelola modal popup untuk detail objek
 */

let currentModalData = null;
let isExpanded = false;

/**
 * Buka modal info untuk objek biasa (marker 0-7)
 * @param {Object} markerData - Data marker dari JSON
 */
function openInfoModal(markerData) {
  currentModalData = markerData;
  isExpanded = false;
  
  const modal = document.getElementById('info-modal');
  if (!modal) {
    console.error('Info modal not found');
    return;
  }
  
  // Populate modal dengan data
  populateModalContent(markerData, false);
  
  // Tampilkan modal
  modal.classList.add('active');
  document.body.classList.add('modal-open');
  
  console.log(`Opened info modal for: ${markerData.name}`);
}

/**
 * Buka modal untuk virtual tour (marker 8-9)
 * @param {Object} markerData - Data marker virtual tour
 */
function openVirtualTourModal(markerData) {
  currentModalData = markerData;
  
  const modal = document.getElementById('virtual-tour-modal');
  if (!modal) {
    console.error('Virtual tour modal not found');
    return;
  }
  
  // Populate modal dengan data virtual tour
  populateVirtualTourModal(markerData);
  
  // Tampilkan modal
  modal.classList.add('active');
  document.body.classList.add('modal-open');
  
  console.log(`Opened virtual tour modal for: ${markerData.name}`);
}

/**
 * Populate konten modal info
 * @param {Object} data - Data marker
 * @param {boolean} expanded - Apakah menampilkan full text atau ringkasan
 */
function populateModalContent(data, expanded) {
  const modal = document.getElementById('info-modal');
  
  // Update title
  const titleElement = modal.querySelector('.modal-title');
  if (titleElement) {
    titleElement.textContent = data.name;
  }
  
  // Update era badge
  const eraElement = modal.querySelector('.modal-era');
  if (eraElement) {
    eraElement.textContent = data.era;
  }
  
  // Update image
  const imageElement = modal.querySelector('.modal-image');
  if (imageElement) {
    imageElement.src = data.image;
    imageElement.alt = data.name;
  }
  
  // Update description
  const descElement = modal.querySelector('.modal-description');
  if (descElement) {
    // Tampilkan shortDesc atau fullDesc tergantung state expanded
    const textToShow = expanded ? data.fullDesc : data.shortDesc;
    
    // Format text: replace \n dengan <br> untuk line break
    const formattedText = formatText(textToShow);
    descElement.innerHTML = formattedText;
  }
  
  // Update button "Selengkapnya"
  const expandButton = modal.querySelector('.btn-expand');
  if (expandButton) {
    expandButton.textContent = expanded ? '▲ Tampilkan Lebih Sedikit' : '▼ Selengkapnya';
    
    // Remove old event listener
    const newButton = expandButton.cloneNode(true);
    expandButton.parentNode.replaceChild(newButton, expandButton);
    
    // Add new event listener
    newButton.addEventListener('click', () => {
      toggleExpanded();
    });
  }
}

/**
 * Populate konten modal virtual tour
 * @param {Object} data - Data marker virtual tour
 */
function populateVirtualTourModal(data) {
  const modal = document.getElementById('virtual-tour-modal');
  
  // Update title
  const titleElement = modal.querySelector('.modal-title');
  if (titleElement) {
    titleElement.textContent = data.name;
  }
  
  // Update location
  const locationElement = modal.querySelector('.modal-location');
  if (locationElement) {
    locationElement.textContent = `📍 ${data.location}`;
  }
  
  // Update era
  const eraElement = modal.querySelector('.modal-era');
  if (eraElement) {
    eraElement.textContent = `🏛️ ${data.era}`;
  }
  
  // Update description
  const descElement = modal.querySelector('.modal-description');
  if (descElement) {
    descElement.textContent = data.shortDesc;
  }
  
  // Setup button "Mulai Virtual Tour"
  const startButton = modal.querySelector('.btn-start-tour');
  if (startButton) {
    startButton.onclick = () => {
      startVirtualTour(data.tourUrl);
    };
  }
}

/**
 * Toggle antara ringkasan dan full text
 */
function toggleExpanded() {
  if (!currentModalData) return;
  
  isExpanded = !isExpanded;
  populateModalContent(currentModalData, isExpanded);
  
  // Scroll ke atas modal setelah expand
  const modalBody = document.querySelector('.modal-body');
  if (modalBody && isExpanded) {
    modalBody.scrollTop = 0;
  }
}

/**
 * Mulai virtual tour (redirect ke halaman virtual tour)
 * @param {string} tourUrl - URL virtual tour
 */
function startVirtualTour(tourUrl) {
  console.log(`Starting virtual tour: ${tourUrl}`);
  
  // Redirect ke halaman virtual tour
  window.location.href = tourUrl;
}

/**
 * Tutup semua modal
 */
function closeModal() {
  // Close info modal
  const infoModal = document.getElementById('info-modal');
  if (infoModal) {
    infoModal.classList.remove('active');
  }
  
  // Close virtual tour modal
  const tourModal = document.getElementById('virtual-tour-modal');
  if (tourModal) {
    tourModal.classList.remove('active');
  }
  
  // Remove body lock
  document.body.classList.remove('modal-open');
  
  // Reset state
  currentModalData = null;
  isExpanded = false;
  
  console.log('Modal closed');
}

/**
 * Format text dengan proper line breaks dan bullet points
 * @param {string} text - Text mentah dari JSON
 * @returns {string} - Formatted HTML string
 */
function formatText(text) {
  if (!text) return '';
  
  // Replace \n dengan <br>
  let formatted = text.replace(/\n/g, '<br>');
  
  // Replace bullet point • dengan HTML list
  formatted = formatted.replace(/• /g, '<span class="bullet">•</span> ');
  
  return formatted;
}

/**
 * Setup event listeners untuk modal
 */
function setupModalListeners() {
  // Close button di info modal
  const infoCloseBtn = document.querySelector('#info-modal .btn-close');
  if (infoCloseBtn) {
    infoCloseBtn.addEventListener('click', closeModal);
  }
  
  // Close button di virtual tour modal
  const tourCloseBtn = document.querySelector('#virtual-tour-modal .btn-close');
  if (tourCloseBtn) {
    tourCloseBtn.addEventListener('click', closeModal);
  }
  
  // Close ketika klik di luar modal (overlay)
  const infoModal = document.getElementById('info-modal');
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) {
        closeModal();
      }
    });
  }
  
  const tourModal = document.getElementById('virtual-tour-modal');
  if (tourModal) {
    tourModal.addEventListener('click', (e) => {
      if (e.target === tourModal) {
        closeModal();
      }
    });
  }
  
  // Close dengan tombol ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Initialize modal listeners ketika DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupModalListeners);
} else {
  setupModalListeners();
}

// Export functions
window.openInfoModal = openInfoModal;
window.openVirtualTourModal = openVirtualTourModal;
window.closeModal = closeModal;
window.toggleExpanded = toggleExpanded;
