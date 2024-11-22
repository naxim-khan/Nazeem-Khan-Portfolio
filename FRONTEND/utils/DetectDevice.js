// utils/detectDevice.js

export function isLowPerformanceDevice() {
    // Checking for low-performance devices using simple heuristics
  
    const isLowCores = navigator.hardwareConcurrency <= 2;  // Low-core count (e.g., 2 or fewer cores)
    const isLowMemory = navigator.deviceMemory <= 4;  // Low memory (e.g., 4GB or less)
    
    return isLowCores || isLowMemory;
  }
  