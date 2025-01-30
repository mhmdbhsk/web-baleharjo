import localFont from 'next/font/local';

const generalSans = localFont({
  src: [
    {
      path: '../assets/fonts/GeneralSans-Extralight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GeneralSans-ExtralightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GeneralSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GeneralSans-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GeneralSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GeneralSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GeneralSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GeneralSans-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GeneralSans-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GeneralSans-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GeneralSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GeneralSans-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-general-sans', // CSS Variable untuk digunakan di Tailwind atau CSS
  display: 'swap',
});

export default generalSans;
