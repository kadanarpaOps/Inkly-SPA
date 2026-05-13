
const defaultCovers = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBi_kMQ_BggKRrkmCfPH-cR6BxPLGopvWXhVpw7CCe5RAD7NFmAaHPxnQkDxcDhPHNCM2Jbv7AFF6SGmmkWzyLHff0Wzg_nYG836y6LqCkYwFiixPluy41c12pMe9eeRJ5L8QeKYepNBAqyUOujFUb6TX0JiF02Rx01nC0YyHLUIqrNrCyw-b2PoUVKqSTzBkAcKBv6dUHH-7LriifzG2yvflGsAxzqpdZBhBwtHoFRZ8HofszZbJTQ1tWUTYBiLVa8gMxX1kW4D78",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCNHnoGe4LoiQkJqvnbBND14-SvwMgpaRRjbE5jeHh88I0cFtcxmYLQJHSuSHq3U5pt58KXFy-cMSMC8uUyj4G0GT1eae8V47Yiji3rA3i9GMh92DM6lAE1kRIX1Z76cs6yx10Z_jQPZTTTIFsi3jtWA0qOHE0y5rUugmNj3rp1DQ6h_ZJ2nAanU9r3_J0dxWGpNVNqcHtUEz6ZkIw3iCkD3qMSZBTsRL8-2_lLoeTS2AAT6qtFcZ2ByvtePQ6rePwz0Do_7iGHvk0"
];

export const getRandomCover = (): string => {
    const randomPosition = Math.floor(Math.random() * defaultCovers.length);
    return defaultCovers[randomPosition];
}
