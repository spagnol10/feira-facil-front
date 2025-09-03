import { ISvgProps } from "../../utils/types";

export function ChevronLeftIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" />
    </svg>
  );
}

export function ChevronRightIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
  );
}

export function ArrowRightIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg
      style={{ width: width, height: size }}
      fill={fill}
      viewBox="0 -960 960 960"
    >
      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
    </svg>
  );
}

export function ArrowLeftIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg
      style={{ width: width, height: size }}
      fill={fill}
      viewBox="0 -960 960 960"
    >
      <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </svg>
  );
}

export function CheckboxCircleIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M20 12a8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8c.76 0 1.5.11 2.2.31l1.57-1.57A9.822 9.822 0 0012 2 10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10M7.91 10.08L6.5 11.5 11 16 21 6l-1.41-1.42L11 13.17l-3.09-3.09z" />
    </svg>
  );
}

export function OpenEyeIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
    </svg>
  );
}

export function OpenEyeOutlineIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
    </svg>
  );
}

export function ClosedEyeIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
    </svg>
  );
}

export function BellIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg
      style={{ width: width, height: size }}
      fill={fill}
      viewBox="0 -960 960 960"
    >
      <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
    </svg>
  );
}

export function ChatIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M15,4V11H5.17L4,12.17V4H15M16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12V3A1,1 0 0,0 16,2M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z" />
    </svg>
  );
}

export function MenuDownIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M7,10L12,15L17,10H7Z" />
    </svg>
  );
}

export function SearchIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 0 24 24"
    >
      <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
  );
}

export function FilterIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
    </svg>
  );
}

export function ChevronDownIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
  );
}

export function CheckedCircleIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
    </svg>
  );
}

export function WarnCircleIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
    </svg>
  );
}

export function ErrorCircleIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
    </svg>
  );
}

export function CloseXIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  );
}

export function UserIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg
      style={{ width: width, height: size }}
      fill={fill}
      viewBox="0 -960 960 960"
    >
      <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
    </svg>
  );
}

export function DollarSymbolIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
    </svg>
  );
}

export function SupportIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M18.72,14.76C19.07,13.91 19.26,13 19.26,12C19.26,11.28 19.15,10.59 18.96,9.95C18.31,10.1 17.63,10.18 16.92,10.18C13.86,10.18 11.15,8.67 9.5,6.34C8.61,8.5 6.91,10.26 4.77,11.22C4.73,11.47 4.73,11.74 4.73,12A7.27,7.27 0 0,0 12,19.27C13.05,19.27 14.06,19.04 14.97,18.63C15.54,19.72 15.8,20.26 15.78,20.26C14.14,20.81 12.87,21.08 12,21.08C9.58,21.08 7.27,20.13 5.57,18.42C4.53,17.38 3.76,16.11 3.33,14.73H2V10.18H3.09C3.93,6.04 7.6,2.92 12,2.92C14.4,2.92 16.71,3.87 18.42,5.58C19.69,6.84 20.54,8.45 20.89,10.18H22V14.67H22V14.69L22,14.73H21.94L18.38,18L13.08,17.4V15.73H17.91L18.72,14.76M9.27,11.77C9.57,11.77 9.86,11.89 10.07,12.11C10.28,12.32 10.4,12.61 10.4,12.91C10.4,13.21 10.28,13.5 10.07,13.71C9.86,13.92 9.57,14.04 9.27,14.04C8.64,14.04 8.13,13.54 8.13,12.91C8.13,12.28 8.64,11.77 9.27,11.77M14.72,11.77C15.35,11.77 15.85,12.28 15.85,12.91C15.85,13.54 15.35,14.04 14.72,14.04C14.09,14.04 13.58,13.54 13.58,12.91A1.14,1.14 0 0,1 14.72,11.77Z" />
    </svg>
  );
}

export function ExitAppIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg
      style={{ width: width, height: size }}
      fill={fill}
      viewBox="0 -960 960 960"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
    </svg>
  );
}

export function LinkedinIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
  );
}

export function FacebookIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
    </svg>
  );
}

export function YoutubeIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
    </svg>
  );
}

export function InstagramIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
    </svg>
  );
}

export function DownloadIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
    </svg>
  );
}

export function StarIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </svg>
  );
}

export function StarHalfIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
    </svg>
  );
}

export function StarOutlineIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
    </svg>
  );
}

export function CheckAllIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" />
    </svg>
  );
}

export function PaperclipIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
    </svg>
  );
}

export function PlaneIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
    </svg>
  );
}

export function PlusIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
}

export function MinusIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M200-440v-80h560v80H200Z" />
    </svg>
  );
}

export function TrashIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
    </svg>
  );
}

export function PencilIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
    </svg>
  );
}

export function CircleEditIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
    </svg>
  );
}

export function RadioBoxMarkedIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />
    </svg>
  );
}

export function TimerIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
    </svg>
  );
}

export function CopyIcon({
  size = 24,
  width = 24,
  fill = "#245F40",
}: ISvgProps) {
  return (
    <svg style={{ width: width, height: size }} fill={fill} viewBox="0 0 24 24">
      <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
    </svg>
  );
}

export function LoadingIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      className="animate-spin"
      viewBox="0 0 24 24"
    >
      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
    </svg>
  );
}

export function InfoIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 0 24 24"
    >
      <path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" />
    </svg>
  );
}

export function LinkOffIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 0 24 24"
    >
      <path d="M10.6 13.4A1 1 0 0 1 9.2 14.8A4.8 4.8 0 0 1 9.2 7.8L12.7 4.2A5.1 5.1 0 0 1 19.8 4.2A5.1 5.1 0 0 1 19.8 11.3L18.3 12.8A6.4 6.4 0 0 0 17.9 10.4L18.4 9.9A3.2 3.2 0 0 0 18.4 5.6A3.2 3.2 0 0 0 14.1 5.6L10.6 9.2A2.9 2.9 0 0 0 10.6 13.4M16.2 13.7A4.8 4.8 0 0 0 14.8 9.2A1 1 0 0 0 13.4 10.6A2.9 2.9 0 0 1 13.4 14.8L9.9 18.4A3.2 3.2 0 0 1 5.6 18.4A3.2 3.2 0 0 1 5.6 14.1L6.1 13.7A7.3 7.3 0 0 1 5.7 11.2L4.2 12.7A5.1 5.1 0 0 0 4.2 19.8A5.1 5.1 0 0 0 11.3 19.8L13.1 18A6 6 0 0 1 16.2 13.7M21.1 15.5L19 17.6L16.9 15.5L15.5 16.9L17.6 19L15.5 21.1L16.9 22.5L19 20.4L21.1 22.5L22.5 21.1L20.4 19L22.5 16.9Z" />
    </svg>
  );
}

export function CalendarIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 0 24 24"
    >
      <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V9H19V19M19 7H5V5H19V7Z" />
    </svg>
  );
}

export function ReloadIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" />
    </svg>
  );
}

export function DashboardIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" />
    </svg>
  );
}

export function SaleIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
}

export function CompanyIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
    </svg>
  );
}

export function ProductIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M620-163 450-333l56-56 114 114 226-226 56 56-282 282Zm220-397h-80v-200h-80v120H280v-120h-80v560h240v80H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v200ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" />
    </svg>
  );
}

export function StockIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z" />
    </svg>
  );
}

export function OrderIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
    </svg>
  );
}

export function TrendingUpIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
    </svg>
  );
}

export function TrendingDownIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z" />
    </svg>
  );
}

export function ExportDataIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z" />
    </svg>
  );
}

export function FirstPageIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M240-240v-480h80v480h-80Zm440 0L440-480l240-240 56 56-184 184 184 184-56 56Z" />
    </svg>
  );
}

export function LastPageIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="m280-240-56-56 184-184-184-184 56-56 240 240-240 240Zm360 0v-480h80v480h-80Z" />
    </svg>
  );
}

export function POSIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M280-640q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640H280Zm0-80h400v-80H280v80ZM160-80q-33 0-56.5-23.5T80-160v-40h800v40q0 33-23.5 56.5T800-80H160ZM80-240l139-313q10-22 30-34.5t43-12.5h376q23 0 43 12.5t30 34.5l139 313H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z" />
    </svg>
  );
}

export function NewReleaseIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
    </svg>
  );
}

export function DeliveryTruckIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z" />
    </svg>
  );
}

export function GearIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm280-40h80l12-60q12-5 22.5-10.5T576-364l58 18 40-68-46-40q2-13 2-26t-2-26l46-40-40-68-58 18q-11-8-21.5-13.5T532-620l-12-60h-80l-12 60q-12 5-22.5 10.5T384-596l-58-18-40 68 46 40q-2 13-2 26t2 26l-46 40 40 68 58-18q11 8 21.5 13.5T428-340l12 60Zm40-120q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400ZM160-240v-480 480Z" />
    </svg>
  );
}

export function ConnectPeopleIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M640-80v-90q-56-18-94-64t-44-106h80q8 43 40.5 71.5T700-240h120q25 0 42.5 17.5T880-180v100H640Zm120-200q-33 0-56.5-23.5T680-360q0-33 23.5-56.5T760-440q33 0 56.5 23.5T840-360q0 33-23.5 56.5T760-280ZM360-400q0-150 105-255t255-105v80q-117 0-198.5 81.5T440-400h-80Zm160 0q0-83 58.5-141.5T720-600v80q-50 0-85 35t-35 85h-80ZM80-520v-100q0-25 17.5-42.5T140-680h120q45 0 77.5-28.5T378-780h80q-6 60-44 106t-94 64v90H80Zm120-200q-33 0-56.5-23.5T120-800q0-33 23.5-56.5T200-880q33 0 56.5 23.5T280-800q0 33-23.5 56.5T200-720Z" />
    </svg>
  );
}

export function ConciergeIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M400-80v-80h520v80H400Zm40-120q0-81 51-141.5T620-416v-25q0-17 11.5-28.5T660-481q17 0 28.5 11.5T700-441v25q77 14 128.5 74.5T880-200H440Zm105-81h228q-19-27-48.5-43.5T660-341q-36 0-66 16.5T545-281Zm114 0ZM40-440v-440h240v58l280-78 320 100v40q0 50-35 85t-85 35h-80v24q0 25-14.5 45.5T628-541L358-440H40Zm80-80h80v-280h-80v280Zm160 0h64l232-85q11-4 17.5-13.5T600-640h-71l-117 38-24-76 125-42h247q9 0 22.5-6.5T796-742l-238-74-278 76v220Z" />
    </svg>
  );
}

export function FindUserIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T520-640q0-33-23.5-56.5T440-720q-33 0-56.5 23.5T360-640q0 33 23.5 56.5T440-560ZM884-20 756-148q-21 12-45 20t-51 8q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 27-8 51t-20 45L940-76l-56 56ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-540 40v-111q0-34 17-63t47-44q51-26 115-44t142-18q-12 18-20.5 38.5T407-359q-60 5-107 20.5T221-306q-10 5-15.5 14.5T200-271v31h207q5 22 13.5 42t20.5 38H120Zm320-480Zm-33 400Z" />
    </svg>
  );
}

export function NewUserIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
    </svg>
  );
}

export function UnknownUserIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M791-55 686-160H160v-112q0-34 17.5-62.5T224-378q45-23 91.5-37t94.5-21L55-791l57-57 736 736-57 57ZM240-240h366L486-360h-6q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm496-138q29 14 46 42.5t18 61.5L666-408q18 7 35.5 14t34.5 16ZM568-506l-59-59q23-9 37-29.5t14-45.5q0-33-23.5-56.5T480-720q-25 0-45.5 14T405-669l-59-59q23-34 58-53t76-19q66 0 113 47t47 113q0 41-19 76t-53 58Zm38 266H240h366ZM457-617Z" />
    </svg>
  );
}

export function ShoppingCartOffIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="m634-440-81-80h69l110-200H353l-80-80h525q23 0 35.5 19.5t.5 42.5L692-482q-11 20-28 31t-30 11ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm540 52L566-280H304q-44 0-67-37.5t-3-78.5l42-86-72-162L28-820l56-56L876-84l-56 56ZM486-360l-80-80h-62l-40 80h182Zm136-160h-69 69Zm58 440q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80Z" />
    </svg>
  );
}

export function ShoppingCartIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
    </svg>
  );
}

export function PriceChangeIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M80-160v-640h800v640H80Zm80-80h640v-480H160v480Zm0 0v-480 480Zm160-40h80v-40h40q17 0 28.5-11.5T480-360v-120q0-17-11.5-28.5T440-520H320v-40h160v-80h-80v-40h-80v40h-40q-17 0-28.5 11.5T240-600v120q0 17 11.5 28.5T280-440h120v40H240v80h80v40Zm320-30 80-80H560l80 80Zm-80-250h160l-80-80-80 80Z" />
    </svg>
  );
}

export function PersonOwnerIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M200-200v-560 179-19 400Zm80-240h221q2-22 10-42t20-38H280v80Zm0 160h157q17-20 39-32.5t46-20.5q-4-6-7-13t-5-14H280v80Zm0-320h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v258q-14-26-34-46t-46-33v-179H200v560h202q-1 6-1.5 12t-.5 12v56H200Zm480-200q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM480-120v-56q0-24 12.5-44.5T528-250q36-15 74.5-22.5T680-280q39 0 77.5 7.5T832-250q23 9 35.5 29.5T880-176v56H480Z" />
    </svg>
  );
}

export function FairIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 -960 960 960"
    >
      <path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z" />
    </svg>
  );
}

export function CheckIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 0 24 24"
    >
      <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z" />
    </svg>
  );
}

export function XIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#FF4D4F"}
      viewBox="0 0 24 24"
    >
      <path d="M18.3 5.7l-1.4-1.4L12 9.6 7.1 4.7 5.7 6.1 10.6 11l-4.9 4.9 1.4 1.4L12 12.4l4.9 4.9 1.4-1.4-4.9-4.9z" />
    </svg>
  );
}

export function PhotoIcon({ size, width, fill }: ISvgProps) {
  return (
    <svg
      style={{ width: width ?? 24, height: size ?? 24 }}
      fill={fill ?? "#245F40"}
      viewBox="0 0 24 24"
    >
      <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zm-2 0H5V5h14v14zm-9-7l2.5 3 3.5-4.5L19 17H5l5-6z" />
    </svg>
  );
}

export function CameraIcon({
  size, width, fill,
  ...props
}: ISvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Ícone de câmera"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="7" width="20" height="13" rx="3" fill={fill} />
      <rect x="7" y="4" width="6" height="4" rx="1.5" fill={fill} />
      <circle cx="12" cy="13.5" r="4" fill="white" opacity="0.25" />
      <circle cx="18" cy="10" r="1.2" fill="white" opacity="0.4" />
    </svg>
  );
}

export function LogoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="master-artboard"
      width="687.443"
      height="133.145"
      fillRule="evenodd"
      clipRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      version="1.1"
      viewBox="0 0 687.443 133.145"
    >
      <path
        id="ee-background"
        fill="#fff"
        fillOpacity="0"
        d="M0 0h687.443v133.145H0z"
        pointerEvents="none"
      ></path>
      <g transform="translate(-320.711 -422.873)scale(1.27604)">
        <g id="logo-group">
          <g id="logo-center" transform="translate(253.67)">
            <g
              id="title"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              strokeWidth="0"
              fontFamily="Comfortaa Bold Alt2"
              fontSize="72"
              fontStyle="normal"
              fontWeight="700"
              style={{
                lineHeight: "1",
                fontVariantLigatures: "none",
                textAlign: "center",
              }}
              textAnchor="middle"
            >
              <path
                id="path539299"
                fill="#1b755e"
                stroke="#1b755e"
                d="M359.01-30.816c-.72-.648-1.584-1.008-2.592-1.008h-20.664V-49.32h28.8c1.08 0 1.944-.288 2.664-.936.648-.576 1.008-1.44 1.008-2.448s-.36-1.872-1.008-2.52c-.72-.648-1.584-1.008-2.664-1.008H332.01c-1.08 0-1.944.36-2.664 1.08s-1.08 1.584-1.08 2.664v48.744c0 1.08.36 1.944 1.08 2.664S330.93 0 332.01 0c1.008 0 1.944-.36 2.664-1.08s1.08-1.584 1.08-2.664v-21.168h20.664c1.008 0 1.872-.288 2.592-.936s1.08-1.512 1.08-2.52-.36-1.8-1.08-2.448z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -153.952 411.093)"
              ></path>
              <path
                id="path539301"
                fill="#1f7e65"
                stroke="#1f7e65"
                d="M394.002.288c4.752 0 8.928-1.44 12.6-4.464.792-.576 1.152-1.368 1.296-2.304.072-1.008-.144-1.8-.792-2.592a3.2 3.2 0 0 0-2.304-1.224c-.936-.072-1.8.144-2.52.792-2.448 1.944-5.184 2.88-8.28 2.88-3.6 0-6.696-1.224-9.216-3.816-2.592-2.52-3.816-5.616-3.816-9.216s1.224-6.696 3.816-9.288c2.52-2.52 5.616-3.816 9.216-3.816 2.952 0 5.616.936 7.992 2.736 2.304 1.8 3.816 4.104 4.608 6.912h-12.6c-.936 0-1.8.36-2.448 1.008a3.43 3.43 0 0 0-1.008 2.448c0 .936.36 1.8 1.008 2.448a3.43 3.43 0 0 0 2.448 1.008h16.56c.936 0 1.728-.36 2.376-1.008a3.22 3.22 0 0 0 1.08-2.448c0-5.544-2.016-10.224-5.904-14.112s-8.568-5.904-14.112-5.904-10.224 2.016-14.112 5.904-5.832 8.568-5.832 14.112 1.944 10.224 5.832 14.112S388.458.288 394.002.288z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -148.492 411.093)"
              ></path>
              <path
                id="path539303"
                fill="#24866c"
                stroke="#24866c"
                d="M423.528-38.376c-.72.72-1.008 1.584-1.008 2.664v32.04c0 1.08.288 1.944 1.008 2.664S425.112 0 426.192 0s1.944-.288 2.664-1.008c.648-.72 1.008-1.584 1.008-2.664v-32.04c0-1.08-.36-1.944-1.008-2.664-.72-.648-1.584-1.008-2.664-1.008s-1.944.36-2.664 1.008zm5.976-15.48c-.936-.936-2.016-1.44-3.312-1.44s-2.448.504-3.384 1.44-1.368 2.016-1.368 3.312.432 2.448 1.368 3.384 2.088 1.368 3.384 1.368 2.376-.432 3.312-1.368 1.44-2.088 1.44-3.384-.504-2.376-1.44-3.312z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -143.032 411.093)"
              ></path>
              <path
                id="path539305"
                fill="#288f73"
                stroke="#288f73"
                d="M465.557-40.464c-6.048 0-11.16 2.16-15.48 6.408-4.248 4.248-6.336 9.36-6.336 15.408v15.192c0 1.008.288 1.8 1.008 2.448.648.72 1.44 1.008 2.448 1.008.936 0 1.728-.288 2.376-1.008.72-.648 1.08-1.44 1.08-2.448v-15.192c0-4.104 1.44-7.632 4.32-10.512 2.952-2.952 6.48-4.392 10.584-4.392.936 0 1.728-.36 2.448-1.008.648-.72 1.008-1.512 1.008-2.448s-.36-1.8-1.008-2.448c-.72-.648-1.512-1.008-2.448-1.008z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -137.572 411.093)"
              ></path>
              <path
                id="path539307"
                fill="#2d977a"
                stroke="#2d977a"
                d="M507.624-33.768c-3.888-3.888-8.568-5.904-14.112-5.904-5.472 0-10.224 2.016-14.112 5.904s-5.832 8.568-5.832 14.112 1.944 10.224 5.832 14.112S488.04.288 493.512.288c4.968 0 9.36-1.584 13.104-4.824v1.368c0 1.008.288 1.8 1.008 2.448.648.72 1.44 1.008 2.448 1.008.936 0 1.728-.288 2.448-1.008.648-.648 1.008-1.44 1.008-2.448v-16.488c0-5.544-1.944-10.224-5.904-14.112zM493.512-6.624c-3.6 0-6.696-1.224-9.216-3.816-2.592-2.52-3.816-5.616-3.816-9.216s1.224-6.696 3.816-9.216c2.52-2.592 5.616-3.888 9.216-3.888s6.696 1.296 9.216 3.888c2.592 2.52 3.888 5.616 3.888 9.216s-1.296 6.696-3.888 9.216c-2.52 2.592-5.616 3.816-9.216 3.816z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -132.112 411.093)"
              ></path>
              <path
                id="path539309"
                fill="#31a081"
                stroke="#31a081"
                d="M551.385-30.816c-.72-.648-1.584-1.008-2.592-1.008h-20.664V-49.32h28.8c1.08 0 1.944-.288 2.664-.936.648-.576 1.008-1.44 1.008-2.448s-.36-1.872-1.008-2.52c-.72-.648-1.584-1.008-2.664-1.008h-32.544c-1.08 0-1.944.36-2.664 1.08s-1.08 1.584-1.08 2.664v48.744c0 1.08.36 1.944 1.08 2.664S523.305 0 524.385 0c1.008 0 1.944-.36 2.664-1.08s1.08-1.584 1.08-2.664v-21.168h20.664c1.008 0 1.872-.288 2.592-.936s1.08-1.512 1.08-2.52-.36-1.8-1.08-2.448z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -126.652 411.093)"
              ></path>
              <path
                id="path539311"
                fill="#35a888"
                stroke="#35a888"
                d="M601.28-33.768c-3.887-3.888-8.567-5.904-14.111-5.904-5.472 0-10.224 2.016-14.112 5.904s-5.832 8.568-5.832 14.112 1.944 10.224 5.832 14.112 8.64 5.832 14.112 5.832c4.968 0 9.36-1.584 13.104-4.824v1.368c0 1.008.288 1.8 1.008 2.448.648.72 1.44 1.008 2.448 1.008.936 0 1.728-.288 2.448-1.008.648-.648 1.008-1.44 1.008-2.448v-16.488c0-5.544-1.944-10.224-5.904-14.112zM587.17-6.624c-3.6 0-6.696-1.224-9.216-3.816-2.592-2.52-3.816-5.616-3.816-9.216s1.224-6.696 3.816-9.216c2.52-2.592 5.616-3.888 9.216-3.888s6.696 1.296 9.216 3.888c2.592 2.52 3.888 5.616 3.888 9.216s-1.296 6.696-3.888 9.216c-2.52 2.592-5.616 3.816-9.216 3.816zm7.272-53.208q-1.512 0-2.592 1.08l-7.056 7.056c-.576.648-.864 1.44-.864 2.448 0 1.08.288 1.944 1.008 2.664.648.72 1.512 1.008 2.664 1.008 1.008 0 1.8-.288 2.52-1.008l6.984-6.984c.648-.576 1.008-1.44 1.008-2.52 0-1.008-.36-1.944-1.08-2.664q-1.08-1.08-2.592-1.08z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -121.192 411.093)"
              ></path>
              <path
                id="path539313"
                fill="#3ab18f"
                stroke="#3ab18f"
                d="M649.72-33.192c-3.743-4.32-8.495-6.48-14.111-6.48-3.744 0-7.128.864-10.08 2.592-3.024 1.728-5.328 4.104-6.984 7.128s-2.448 6.48-2.448 10.296c0 3.744.792 7.2 2.52 10.224a18.8 18.8 0 0 0 7.128 7.128c3.024 1.728 6.408 2.592 10.224 2.592 5.184 0 9.504-1.584 12.96-4.824q.864-.864.864-1.944c0-.936-.504-1.8-1.368-2.592-.576-.432-1.224-.648-1.872-.648-.864 0-1.8.36-2.664 1.008-2.016 1.728-4.68 2.52-7.92 2.52q-3.78 0-6.696-1.728t-4.536-4.752c-1.08-2.016-1.584-4.392-1.584-6.984 0-4.032 1.152-7.344 3.456-9.792s5.256-3.744 9-3.744c1.8 0 3.384.36 4.824.936s2.736 1.512 3.96 2.808q1.08 1.296 2.808 1.296c.576 0 1.152-.144 1.656-.504 1.008-.72 1.584-1.584 1.584-2.664 0-.72-.288-1.296-.72-1.872z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -115.732 411.093)"
              ></path>
              <path
                id="path539315"
                fill="#3eb996"
                stroke="#3eb996"
                d="M663.153-38.376c-.72.72-1.008 1.584-1.008 2.664v32.04c0 1.08.288 1.944 1.008 2.664S664.737 0 665.817 0s1.944-.288 2.664-1.008c.648-.72 1.008-1.584 1.008-2.664v-32.04c0-1.08-.36-1.944-1.008-2.664-.72-.648-1.584-1.008-2.664-1.008s-1.944.36-2.664 1.008zm5.976-15.48c-.936-.936-2.016-1.44-3.312-1.44s-2.448.504-3.384 1.44-1.368 2.016-1.368 3.312.432 2.448 1.368 3.384 2.088 1.368 3.384 1.368 2.376-.432 3.312-1.368 1.44-2.088 1.44-3.384-.504-2.376-1.44-3.312z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -110.272 411.093)"
              ></path>
              <path
                id="path539317"
                fill="#43c29d"
                stroke="#43c29d"
                d="M682.79-55.224c-.72.72-1.008 1.584-1.008 2.592v39.312c0 2.592.432 4.896 1.368 6.912.864 2.016 2.16 3.6 3.816 4.752S690.494 0 692.582 0h.144c1.44 0 2.592-.288 3.528-1.008.864-.648 1.368-1.512 1.368-2.592 0-1.008-.36-1.872-.936-2.592-.576-.648-1.368-1.008-2.304-1.008h-1.8q-1.62 0-2.592-1.728c-.72-1.152-1.008-2.592-1.008-4.392v-39.312c0-1.008-.36-1.872-1.008-2.592-.72-.648-1.584-1.008-2.592-1.008-1.08 0-1.944.36-2.592 1.008z"
                style={{
                  lineHeight: "1",
                  fontVariantLigatures: "none",
                  textAlign: "center",
                }}
                transform="matrix(.91 0 0 .91 -104.812 411.093)"
              ></path>
            </g>
            <image
              xlinkHref="data:image/png;base64,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"
              id="icon"
              width="121.5"
              height="121.5"
              x="-13"
              y="323"
            ></image>
          </g>
        </g>
      </g>
    </svg>
  );
}
