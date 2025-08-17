// Client Profile JavaScript

class ClientProfileManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAvatarUpload();
    this.setupLocationFeatures();
  }

  setupEventListeners() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    const getLocationBtn = document.getElementById('getCurrentLocation');
    if (getLocationBtn) {
      getLocationBtn.addEventListener('click', this.getCurrentLocation.bind(this));
    }
  }

  setupAvatarUpload() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarOverlay = document.querySelector('.avatar-overlay');
    const profileAvatar = document.getElementById('profileAvatar');
    const avatarFileInput = document.getElementById('avatarFileInput');
    const avatarPreview = document.getElementById('profileAvatarPreview');

    if (avatarInput && avatarOverlay && profileAvatar) {
      // Hover effect for avatar overlay
      const avatarContainer = document.querySelector('.avatar-container');
      if (avatarContainer) {
        avatarContainer.addEventListener('mouseenter', () => {
          avatarOverlay.style.opacity = '1';
        });
        avatarContainer.addEventListener('mouseleave', () => {
          avatarOverlay.style.opacity = '0';
        });
      }

      // Handle file selection
      avatarInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
          this.handleAvatarFileSelect(file, profileAvatar, avatarFileInput, avatarPreview);
        }
      });
    }
  }

  handleAvatarFileSelect(file, profileAvatar, avatarFileInput, avatarPreview) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      this.showNotification('Vui lòng chọn file ảnh hợp lệ!', 'error');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.showNotification('Kích thước file không được vượt quá 5MB!', 'error');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      profileAvatar.src = e.target.result;
      profileAvatar.style.display = 'block';

      // Update preview in header if exists
      if (avatarPreview) {
        avatarPreview.src = e.target.result;
        avatarPreview.style.display = 'block';
      }

      // Hide default icon if it exists
      const defaultIcon = document.querySelector('.fas.fa-user-circle');
      if (defaultIcon) {
        defaultIcon.style.display = 'none';
      }
    };
    reader.readAsDataURL(file);

    // Set the file to hidden input for form submission
    if (avatarFileInput) {
      avatarFileInput.files = avatarInput.files;
    }

    this.showNotification('Ảnh đã được chọn!', 'success');
  }

  setupLocationFeatures() {
    // Initialize location features if needed
    if (typeof initializeDanangLocations === 'function') {
      initializeDanangLocations();
    }
  }

  getCurrentLocation() {
    const btn = document.getElementById('getCurrentLocation');
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');

    if (!navigator.geolocation) {
      this.showNotification('Trình duyệt của bạn không hỗ trợ định vị!', 'error');
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang lấy vị trí...';
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);

        if (latInput) latInput.value = lat;
        if (lngInput) lngInput.value = lng;

        this.showNotification('Đã lấy vị trí hiện tại thành công!', 'success');

        // Sau khi lấy vị trí, tự động cập nhật địa chỉ
        this.updateAddressFromLocation(lat, lng);
      },
      (error) => {
        let errorMessage = 'Không thể lấy vị trí hiện tại';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Bạn đã từ chối quyền truy cập vị trí';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Thông tin vị trí không khả dụng';
            break;
          case error.TIMEOUT:
            errorMessage = 'Hết thời gian lấy vị trí';
            break;
        }
        this.showNotification(errorMessage, 'error');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    ).finally(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-location-arrow me-2"></i>Sử dụng vị trí hiện tại';
      }
    });
  }

  async updateAddressFromLocation(latitude, longitude) {
    const addressInput = document.getElementById('address');
    if (!addressInput) return;

    try {
      // Sử dụng Google Geocoding API để lấy địa chỉ
      const apiKey = 'AIzaSyBr1sql8ydyhFIx562U6WRGeWHH4A_41hA';
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=vi`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          let address = '';

          // Xây dựng địa chỉ từ các thành phần
          for (let i = addressComponents.length - 1; i >= 0; i--) {
            const component = addressComponents[i];
            if (component.types.includes('street_number') ||
              component.types.includes('route') ||
              component.types.includes('sublocality') ||
              component.types.includes('locality') ||
              component.types.includes('administrative_area_level_2') ||
              component.types.includes('administrative_area_level_1')) {
              address = component.long_name + (address ? ', ' : '') + address;
            }
          }

          // Cập nhật input địa chỉ nếu tìm thấy
          if (address) {
            addressInput.value = address;
            this.showNotification('Đã cập nhật địa chỉ từ vị trí hiện tại!', 'success');
          } else {
            // Fallback: tạo địa chỉ đơn giản từ tọa độ
            addressInput.value = `Vĩ độ: ${latitude}, Kinh độ: ${longitude}`;
            this.showNotification('Đã cập nhật tọa độ vào địa chỉ!', 'success');
          }
        } else {
          // Fallback: tạo địa chỉ đơn giản từ tọa độ
          addressInput.value = `Vĩ độ: ${latitude}, Kinh độ: ${longitude}`;
          this.showNotification('Đã cập nhật tọa độ vào địa chỉ!', 'success');
        }
      } else {
        // Fallback: tạo địa chỉ đơn giản từ tọa độ
        addressInput.value = `Vĩ độ: ${latitude}, Kinh độ: ${longitude}`;
        this.showNotification('Đã cập nhật tọa độ vào địa chỉ!', 'success');
      }
    } catch (error) {
      console.error('Lỗi khi lấy địa chỉ:', error);
      // Fallback: tạo địa chỉ đơn giản từ tọa độ
      addressInput.value = `Vĩ độ: ${latitude}, Kinh độ: ${longitude}`;
      this.showNotification('Đã cập nhật tọa độ vào địa chỉ!', 'success');
    }
  }

  handleFormSubmit(event) {
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang cập nhật...';
    }

    // Basic validation - chỉ kiểm tra fullName và address
    const fullName = document.getElementById('fullName')?.value?.trim();
    const address = document.getElementById('address')?.value?.trim();

    if (!fullName) {
      this.showNotification('Vui lòng nhập họ và tên!', 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Cập nhật thông tin';
      }
      event.preventDefault();
      return;
    }

    if (!address) {
      this.showNotification('Vui lòng nhập địa chỉ!', 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Cập nhật thông tin';
      }
      event.preventDefault();
      return;
    }

    // Form is valid, allow submission
    this.showNotification('Đang cập nhật thông tin...', 'success');
  }

  showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.alert');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  initializeMap() {
    // Map will be initialized by the inline script in JSP
    // This method can be used for additional map functionality
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ClientProfileManager();
});
