import './style.css'
import { createIcons, QrCode, Settings2, Link, Download, PenTool, Zap, Maximize, Palette, ChevronDown, ImagePlus, Trash2, Square, Wifi, Contact, MessageCircle, Mail, RotateCcw } from 'lucide'
import QRCodeStyling from 'qr-code-styling'
import html2canvas from 'html2canvas'

// Initialize Icons
createIcons({
  icons: {
    QrCode, Settings2, Link, Download, PenTool, Zap, Maximize, Palette, ChevronDown, ImagePlus, Trash2, Square, Wifi, Contact, MessageCircle, Mail, RotateCcw
  }
})

// --- Default State & LocalStorage ---
const DEFAULT_STATE = {
  qrType: 'url',
  dataUrl: '',
  wifiSsid: '',
  wifiPass: '',
  wifiEnc: 'WPA',
  wifiHidden: false,
  vcardName: '',
  vcardOrg: '',
  vcardPhone: '',
  vcardEmail: '',
  waPhone: '',
  waMsg: '',
  emailTo: '',
  emailSub: '',
  emailBody: '',
  dotStyle: 'rounded',
  qrDensity: 'H',
  isGradient: true,
  colorPrimary: '#8b5cf6',
  colorSecondary: '#d946ef',
  logoData: null,
  logoName: '',
  logoSize: 0.4,
  logoBgDots: true,
  includeFrame: false,
  frameText: 'SCAN ME',
  frameBgColor: '#8b5cf6',
  frameTextColor: '#ffffff'
};

let state = { ...DEFAULT_STATE };

const loadConfig = () => {
  const saved = localStorage.getItem('qrConfigV3');
  if (saved) {
    try {
      state = { ...state, ...JSON.parse(saved) };
    } catch (e) {}
  }
};

const saveConfig = () => {
  localStorage.setItem('qrConfigV3', JSON.stringify(state));
};

loadConfig();

// --- QR Code Instance Setup ---
const qrCode = new QRCodeStyling({
  width: 320,
  height: 320,
  margin: 10,
  qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: state.qrDensity },
  imageOptions: { crossOrigin: "anonymous", margin: 10 },
  backgroundOptions: { color: "transparent" }
});

document.addEventListener('DOMContentLoaded', () => {
  const qrContainer = document.getElementById('qr-container');
  qrCode.append(qrContainer);

  // --- UI Elements ---
  const tabs = document.querySelectorAll('.qr-tab-btn');
  const tabContents = document.querySelectorAll('.qr-tab-content');
  
  // URL
  const inputUrl = document.getElementById('qr-data-url');
  
  // WiFi
  const inputWifiSsid = document.getElementById('qr-wifi-ssid');
  const inputWifiPass = document.getElementById('qr-wifi-pass');
  const inputWifiEnc = document.getElementById('qr-wifi-enc');
  const inputWifiHidden = document.getElementById('qr-wifi-hidden');
  
  // vCard
  const inputVcardName = document.getElementById('qr-vcard-name');
  const inputVcardOrg = document.getElementById('qr-vcard-org');
  const inputVcardPhone = document.getElementById('qr-vcard-phone');
  const inputVcardEmail = document.getElementById('qr-vcard-email');

  // WhatsApp
  const inputWaPhone = document.getElementById('qr-wa-phone');
  const inputWaMsg = document.getElementById('qr-wa-msg');

  // Email
  const inputEmailTo = document.getElementById('qr-email-to');
  const inputEmailSub = document.getElementById('qr-email-sub');
  const inputEmailBody = document.getElementById('qr-email-body');

  // Styling
  const selectDensity = document.getElementById('qr-density');
  const selectDotStyle = document.getElementById('dot-style');
  const btnColorSolid = document.getElementById('btn-color-solid');
  const btnColorGradient = document.getElementById('btn-color-gradient');
  const colorPrimary = document.getElementById('color-primary');
  const colorPrimaryText = document.getElementById('color-primary-text');
  const colorSecondaryContainer = document.getElementById('color-secondary-container');
  const colorSecondary = document.getElementById('color-secondary');
  const colorSecondaryText = document.getElementById('color-secondary-text');
  
  // Logo
  const logoUpload = document.getElementById('logo-upload');
  const logoPreviewContainer = document.getElementById('logo-preview-container');
  const logoPreviewImg = document.getElementById('logo-preview-img');
  const logoFilename = document.getElementById('logo-filename');
  const btnRemoveLogo = document.getElementById('btn-remove-logo');
  const logoSize = document.getElementById('logo-size');
  const logoSizeVal = document.getElementById('logo-size-val');
  const logoBgDots = document.getElementById('logo-bg-dots');

  // Presets & Reset
  const btnReset = document.getElementById('btn-reset');
  const btnPresetMinimal = document.getElementById('btn-preset-minimal');
  const btnPresetCyberpunk = document.getElementById('btn-preset-cyberpunk');
  const btnPresetBrand = document.getElementById('btn-preset-brand');

  // Downloads & Frame
  const frameToggle = document.getElementById('qr-frame-toggle');
  const frameSettings = document.getElementById('frame-settings');
  const frameTextInput = document.getElementById('frame-text-input');
  const frameBgColorInput = document.getElementById('frame-bg-color');
  const frameTextColorInput = document.getElementById('frame-text-color');
  const frameWrapper = document.getElementById('qr-frame-wrapper');
  const frameText = document.getElementById('qr-frame-text');
  const dlResolution = document.getElementById('dl-resolution');
  const dlFormat = document.getElementById('dl-format');
  const dlSvgOpt = document.getElementById('dl-svg-opt');
  const btnDownloadAdv = document.getElementById('btn-download-advanced');

  // --- Initialize UI from State ---
  const initUI = () => {
    inputUrl.value = state.dataUrl;
    inputWifiSsid.value = state.wifiSsid;
    inputWifiPass.value = state.wifiPass;
    inputWifiEnc.value = state.wifiEnc;
    inputWifiHidden.checked = state.wifiHidden;
    inputVcardName.value = state.vcardName;
    inputVcardOrg.value = state.vcardOrg;
    inputVcardPhone.value = state.vcardPhone;
    inputVcardEmail.value = state.vcardEmail;
    inputWaPhone.value = state.waPhone;
    inputWaMsg.value = state.waMsg;
    inputEmailTo.value = state.emailTo;
    inputEmailSub.value = state.emailSub;
    inputEmailBody.value = state.emailBody;
    
    selectDensity.value = state.qrDensity;
    selectDotStyle.value = state.dotStyle;
    colorPrimary.value = state.colorPrimary;
    colorPrimaryText.textContent = state.colorPrimary.toUpperCase();
    colorSecondary.value = state.colorSecondary;
    colorSecondaryText.textContent = state.colorSecondary.toUpperCase();
    
    logoSize.value = state.logoSize;
    logoSizeVal.textContent = Math.round(state.logoSize * 100) + '%';
    logoBgDots.checked = state.logoBgDots;
    frameToggle.checked = state.includeFrame;
    frameTextInput.value = state.frameText;
    frameBgColorInput.value = state.frameBgColor;
    frameTextColorInput.value = state.frameTextColor;

    if (state.logoData) {
      logoPreviewImg.src = state.logoData;
      logoFilename.textContent = state.logoName;
      logoPreviewContainer.classList.remove('hidden');
    } else {
      logoPreviewContainer.classList.add('hidden');
    }

    updateTabsUI();
    updateColorModeUI();
    updateFrameUI();
  };

  const updateTabsUI = () => {
    tabs.forEach(tab => {
      const type = tab.getAttribute('data-tab');
      if (type === state.qrType) {
        tab.classList.add('bg-brand-500', 'text-white', 'shadow-md');
        tab.classList.remove('text-slate-400', 'hover:text-white');
      } else {
        tab.classList.remove('bg-brand-500', 'text-white', 'shadow-md');
        tab.classList.add('text-slate-400', 'hover:text-white');
      }
    });

    tabContents.forEach(content => {
      if (content.id === `tab-content-${state.qrType}`) {
        content.classList.remove('hidden');
        content.classList.add('flex');
      } else {
        content.classList.add('hidden');
        content.classList.remove('flex');
      }
    });
  };

  const updateColorModeUI = () => {
    if (state.isGradient) {
      btnColorGradient.classList.add('bg-brand-500', 'text-white', 'shadow-md');
      btnColorGradient.classList.remove('text-slate-400', 'hover:text-white');
      btnColorSolid.classList.remove('bg-brand-500', 'text-white', 'shadow-md');
      btnColorSolid.classList.add('text-slate-400', 'hover:text-white');
      colorSecondaryContainer.classList.remove('opacity-50', 'pointer-events-none');
    } else {
      btnColorSolid.classList.add('bg-brand-500', 'text-white', 'shadow-md');
      btnColorSolid.classList.remove('text-slate-400', 'hover:text-white');
      btnColorGradient.classList.remove('bg-brand-500', 'text-white', 'shadow-md');
      btnColorGradient.classList.add('text-slate-400', 'hover:text-white');
      colorSecondaryContainer.classList.add('opacity-50', 'pointer-events-none');
    }
  };

  const updateFrameUI = () => {
    if (state.includeFrame) {
      frameSettings.classList.remove('hidden');
      frameSettings.classList.add('flex');
      
      frameWrapper.classList.add('pb-4');
      frameWrapper.classList.remove('border-transparent');
      frameWrapper.style.backgroundColor = state.frameBgColor;
      frameWrapper.style.borderColor = state.frameBgColor;
      
      frameText.classList.remove('hidden');
      frameText.textContent = state.frameText;
      frameText.style.backgroundColor = state.frameBgColor;
      frameText.style.color = state.frameTextColor;
      
      dlSvgOpt.disabled = true; // Disable SVG if frame is active
      if (dlFormat.value === 'svg') dlFormat.value = 'png';
    } else {
      frameSettings.classList.add('hidden');
      frameSettings.classList.remove('flex');
      
      frameWrapper.classList.remove('pb-4');
      frameWrapper.classList.add('border-transparent');
      frameWrapper.style.backgroundColor = '';
      frameWrapper.style.borderColor = '';
      
      frameText.classList.add('hidden');
      dlSvgOpt.disabled = false;
    }
  };

  // --- Logic Generators ---
  const generateQRData = () => {
    if (state.qrType === 'url') return state.dataUrl || "https://tu-sitio-web.com";
    if (state.qrType === 'wifi') {
      const hidden = state.wifiHidden ? "true" : "false";
      return `WIFI:T:${state.wifiEnc};S:${state.wifiSsid};P:${state.wifiPass};H:${hidden};;`;
    }
    if (state.qrType === 'vcard') {
      return `BEGIN:VCARD\nVERSION:3.0\nN:${state.vcardName}\nORG:${state.vcardOrg}\nTEL:${state.vcardPhone}\nEMAIL:${state.vcardEmail}\nEND:VCARD`;
    }
    if (state.qrType === 'whatsapp') {
      let waUrl = `https://wa.me/${state.waPhone.replace(/[^0-9]/g, '')}`;
      if (state.waMsg) waUrl += `?text=${encodeURIComponent(state.waMsg)}`;
      return waUrl;
    }
    if (state.qrType === 'email') {
      let mailUrl = `mailto:${state.emailTo}?subject=${encodeURIComponent(state.emailSub)}&body=${encodeURIComponent(state.emailBody)}`;
      return mailUrl;
    }
    return "https://tu-sitio-web.com";
  };

  const updateQR = () => {
    saveConfig();

    let cornersSquareType = "extra-rounded";
    let cornersDotType = "dot";
    if (state.dotStyle === "square") {
      cornersSquareType = "square";
      cornersDotType = "square";
    } else if (state.dotStyle === "dots") {
      cornersSquareType = "dot";
      cornersDotType = "dot";
    }

    const options = {
      data: generateQRData(),
      image: state.logoData,
      qrOptions: { errorCorrectionLevel: state.qrDensity },
      imageOptions: {
        hideBackgroundDots: state.logoBgDots,
        imageSize: parseFloat(state.logoSize),
        margin: 10
      },
      dotsOptions: { type: state.dotStyle },
      cornersSquareOptions: { type: cornersSquareType },
      cornersDotOptions: { type: cornersDotType }
    };

    if (state.isGradient) {
      const gradient = {
        type: "linear",
        rotation: Math.PI / 4,
        colorStops: [
          { offset: 0, color: state.colorPrimary },
          { offset: 1, color: state.colorSecondary }
        ]
      };
      options.dotsOptions.gradient = gradient;
      options.cornersSquareOptions.gradient = gradient;
      options.cornersDotOptions.gradient = gradient;
      
      delete options.dotsOptions.color;
      delete options.cornersSquareOptions.color;
      delete options.cornersDotOptions.color;
    } else {
      options.dotsOptions.color = state.colorPrimary;
      options.cornersSquareOptions.color = state.colorPrimary;
      options.cornersDotOptions.color = state.colorPrimary;
      
      delete options.dotsOptions.gradient;
      delete options.cornersSquareOptions.gradient;
      delete options.cornersDotOptions.gradient;
    }

    qrCode.update(options);
  };

  // --- Event Listeners ---
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      state.qrType = e.currentTarget.getAttribute('data-tab');
      updateTabsUI();
      updateQR();
    });
  });

  const bindInput = (el, stateKey) => {
    el.addEventListener('input', (e) => {
      state[stateKey] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      updateQR();
    });
  };

  bindInput(inputUrl, 'dataUrl');
  bindInput(inputWifiSsid, 'wifiSsid');
  bindInput(inputWifiPass, 'wifiPass');
  bindInput(inputWifiEnc, 'wifiEnc');
  bindInput(inputWifiHidden, 'wifiHidden');
  bindInput(inputVcardName, 'vcardName');
  bindInput(inputVcardOrg, 'vcardOrg');
  bindInput(inputVcardPhone, 'vcardPhone');
  bindInput(inputVcardEmail, 'vcardEmail');
  bindInput(inputWaPhone, 'waPhone');
  bindInput(inputWaMsg, 'waMsg');
  bindInput(inputEmailTo, 'emailTo');
  bindInput(inputEmailSub, 'emailSub');
  bindInput(inputEmailBody, 'emailBody');

  selectDensity.addEventListener('change', (e) => {
    state.qrDensity = e.target.value;
    updateQR();
  });

  selectDotStyle.addEventListener('change', (e) => {
    state.dotStyle = e.target.value;
    updateQR();
  });

  btnColorSolid.addEventListener('click', () => { state.isGradient = false; updateColorModeUI(); updateQR(); });
  btnColorGradient.addEventListener('click', () => { state.isGradient = true; updateColorModeUI(); updateQR(); });
  colorPrimary.addEventListener('input', (e) => { state.colorPrimary = e.target.value; colorPrimaryText.textContent = state.colorPrimary.toUpperCase(); updateQR(); });
  colorSecondary.addEventListener('input', (e) => { state.colorSecondary = e.target.value; colorSecondaryText.textContent = state.colorSecondary.toUpperCase(); updateQR(); });

  logoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        state.logoData = event.target.result;
        state.logoName = file.name;
        logoPreviewImg.src = state.logoData;
        logoFilename.textContent = state.logoName;
        logoPreviewContainer.classList.remove('hidden');
        updateQR();
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemoveLogo.addEventListener('click', () => {
    state.logoData = null; state.logoName = ''; logoUpload.value = '';
    logoPreviewContainer.classList.add('hidden');
    updateQR();
  });

  logoSize.addEventListener('input', (e) => { state.logoSize = e.target.value; logoSizeVal.textContent = Math.round(state.logoSize * 100) + '%'; updateQR(); });
  logoBgDots.addEventListener('change', (e) => { state.logoBgDots = e.target.checked; updateQR(); });

  frameToggle.addEventListener('change', (e) => {
    state.includeFrame = e.target.checked;
    updateFrameUI();
    saveConfig();
  });

  frameTextInput.addEventListener('input', (e) => {
    state.frameText = e.target.value;
    updateFrameUI();
    saveConfig();
  });

  frameBgColorInput.addEventListener('input', (e) => {
    state.frameBgColor = e.target.value;
    updateFrameUI();
    saveConfig();
  });

  frameTextColorInput.addEventListener('input', (e) => {
    state.frameTextColor = e.target.value;
    updateFrameUI();
    saveConfig();
  });

  const applyPreset = (dotStyle, isGradient, colorPrimaryHex, colorSecondaryHex) => {
    state.dotStyle = dotStyle;
    state.isGradient = isGradient;
    state.colorPrimary = colorPrimaryHex;
    state.colorSecondary = colorSecondaryHex || colorPrimaryHex;
    
    selectDotStyle.value = state.dotStyle;
    colorPrimary.value = state.colorPrimary;
    colorPrimaryText.textContent = state.colorPrimary.toUpperCase();
    colorSecondary.value = state.colorSecondary;
    colorSecondaryText.textContent = state.colorSecondary.toUpperCase();
    updateColorModeUI();
    updateQR();
  };

  btnReset.addEventListener('click', () => {
    state = { ...DEFAULT_STATE };
    logoUpload.value = '';
    initUI();
    updateQR();
  });

  btnPresetMinimal.addEventListener('click', () => applyPreset('square', false, '#000000', '#000000'));
  btnPresetCyberpunk.addEventListener('click', () => applyPreset('dots', true, '#0ea5e9', '#d946ef'));
  btnPresetBrand.addEventListener('click', () => applyPreset('rounded', true, '#8b5cf6', '#d946ef'));

  // Downloads Advanced
  btnDownloadAdv.addEventListener('click', async () => {
    const res = parseInt(dlResolution.value, 10);
    const format = dlFormat.value; // 'png', 'webp', 'svg'

    if (format === 'svg') {
      qrCode.download({ name: "QRAesthetic", extension: "svg" });
      return;
    }

    if (state.includeFrame) {
      // Need html2canvas
      const originalWidth = frameWrapper.offsetWidth;
      const scale = res / originalWidth;
      
      const canvas = await html2canvas(frameWrapper, {
        scale: scale,
        backgroundColor: null,
      });

      const dataUrl = canvas.toDataURL(`image/${format}`, 1.0);
      const link = document.createElement('a');
      link.download = `QRAesthetic-Frame.${format}`;
      link.href = dataUrl;
      link.click();
    } else {
      // Native download but with specific resolution
      qrCode.update({ width: res, height: res });
      await qrCode.download({ name: "QRAesthetic", extension: format === 'webp' ? 'webp' : 'png' });
      // Revert size
      qrCode.update({ width: 320, height: 320 });
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    btn.addEventListener('click', () => {
      const isOpen = !content.classList.contains('h-0');
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-content').classList.add('h-0', 'opacity-0');
          otherItem.querySelector('.faq-icon').classList.remove('rotate-180');
        }
      });

      if (isOpen) {
        content.classList.add('h-0', 'opacity-0');
        icon.classList.remove('rotate-180');
      } else {
        content.classList.remove('h-0', 'opacity-0');
        content.style.height = 'auto';
        const height = content.scrollHeight + 'px';
        content.style.height = '0px';
        void content.offsetHeight;
        content.style.height = height;
        content.classList.remove('opacity-0');
        icon.classList.add('rotate-180');
        
        setTimeout(() => { if (!content.classList.contains('h-0')) content.style.height = 'auto'; }, 300);
      }
    });
  });

  initUI();
  updateQR();
});
