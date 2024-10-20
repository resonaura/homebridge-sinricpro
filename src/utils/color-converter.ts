/*
 *  Copyright (c) 2019-2023 Sinric. All rights reserved.
 *  Licensed under Creative Commons Attribution-Share Alike (CC BY-SA)
 *
 *  This file is part of the Sinric Pro - Homebridge Plugin (https://github.com/sinricpro/homebridge-sinricpro)
 */

export class ColorConverter {
  /**
   * Converts RGB color values to HSV.
   * @param r Red component (0-255)
   * @param g Green component (0-255)
   * @param b Blue component (0-255)
   * @returns An object containing hue (0-360), saturation (0-100), and value (0-100)
   */
  static rgbToHsv(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0;
    const v = max;

    const d = max - min;
    const s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) % 6;
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return {
      hue: h,
      saturation: s * 100,
      value: v * 100,
    };
  }

  /**
   * Converts HSV color values to RGB.
   * @param h Hue (0-360)
   * @param s Saturation (0-100)
   * @param v Value (0-100)
   * @returns An object containing red, green, and blue components (0-255)
   */
  static hsvToRgb(h: number, s: number, v: number) {
    h = ((h % 360) + 360) % 360; // Ensure h is between 0 and 360
    s /= 100;
    v /= 100;

    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0,
      g = 0,
      b = 0;

    if (h < 60) {
      r = c;
      g = x;
    } else if (h < 120) {
      r = x;
      g = c;
    } else if (h < 180) {
      g = c;
      b = x;
    } else if (h < 240) {
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  static miredsToKelvin(mireds: number) {
    if (mireds <= 0) {
      throw new Error('Mireds must be a positive value.');
    }
    return 1000000 / mireds;
  }

  static kelvinToMireds(kelvin) {
    if (kelvin <= 0) {
      throw new Error('Kelvin must be a positive value.');
    }
    return 1000000 / kelvin;
  }
}
