// Math constants
export const TAU = 6.28318530718;

// Helper functions
export const clamp = (min, max, val) => val < min ? min : val > max ? max : val;
export const min = (val1, val2) => val1 < val2 ? val1 : val2;
export const max = (val1, val2) => val1 > val2 ? val1 : val2;
export const lerp = (curr, dst, time) => curr * (1 - time) + dst * time;