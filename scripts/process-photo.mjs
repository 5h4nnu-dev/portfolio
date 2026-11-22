/**
 * Generates optimized profile image variants from dev-dp.png.
 *
 * Usage:
 *   node scripts/process-photo.mjs [path/to/dev-dp.png]
 *
 * The source image is never modified. Exact crop rectangles come from the
 * project brief and must not be changed without updating that brief.
 */
import sharp from "sharp"
import { existsSync, mkdirSync } from "node:fs"
import { homedir } from "node:os"
import { join, resolve } from "node:path"

const OUT_DIR = resolve("public/assets/profile")

const candidates = [
  process.argv[2],
  resolve("dev-dp.png"),
  resolve("../dev-dp.png"),
  join(homedir(), "Pictures", "dev-dp.png"),
  join(homedir(), "Downloads", "dev-dp.png"),
].filter(Boolean)

const source = candidates.find((p) => existsSync(p))
if (!source) {
  console.error("Could not find dev-dp.png. Pass the path explicitly: node scripts/process-photo.mjs /path/to/dev-dp.png")
  process.exit(1)
}

mkdirSync(OUT_DIR, { recursive: true })

// Exact crops from the brief — do not eyeball these.
const HERO_CROP = { left: 40, top: 0, width: 1003, height: 1254 }
const AVATAR_CROP = { left: 375, top: 105, width: 600, height: 600 }

const heroBase = () => sharp(source).extract(HERO_CROP)
const avatarBase = () => sharp(source).extract(AVATAR_CROP)

async function writeHero(width) {
  const height = Math.round(width * (HERO_CROP.height / HERO_CROP.width))
  const name = `profile-hero-${width}.webp`
  await heroBase().resize(width, height, { fit: "cover" }).webp({ quality: 86, effort: 5 }).toFile(join(OUT_DIR, name))
  console.log(`  ${name}  ${width}x${height}`)
  return { width, height }
}

async function writeAvatar(size) {
  const name = `profile-avatar-${size}.webp`
  await avatarBase().resize(size, size, { fit: "cover" }).webp({ quality: 88, effort: 5 }).toFile(join(OUT_DIR, name))
  console.log(`  ${name}  ${size}x${size}`)
}

async function writeOgImage() {
  const W = 1200
  const H = 630
  const photoHeight = H
  const photoWidth = Math.round(HERO_CROP.width * (photoHeight / HERO_CROP.height))
  const photoLeft = W - photoWidth

  const photo = await heroBase()
    .resize(photoWidth, photoHeight, { fit: "cover" })
    .png()
    .toBuffer()

  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#05080F" stop-opacity="1"/>
          <stop offset="55%" stop-color="#05080F" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#05080F" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="${photoLeft}" y="0" width="${photoWidth}" height="${H}" fill="url(#fade)"/>
      <text x="64" y="248" font-family="JetBrains Mono, monospace" font-size="78" font-weight="700" fill="#00FFAA">SHANNU</text>
      <text x="64" y="312" font-family="JetBrains Mono, monospace" font-size="25" font-weight="500" fill="#E2E8F0">Cybersecurity Engineer · AI Builder</text>
      <text x="64" y="362" font-family="JetBrains Mono, monospace" font-size="20" font-weight="400" fill="#38BDF8">Hack to understand. Build to protect.</text>
    </svg>
  `)

  await sharp({ create: { width: W, height: H, channels: 3, background: "#05080F" } })
    .composite([
      { input: photo, left: photoLeft, top: 0 },
      { input: overlay, left: 0, top: 0 },
    ])
    .png()
    .toFile(join(OUT_DIR, "og-image.png"))

  console.log(`  og-image.png  ${W}x${H}`)
}

console.log(`Source: ${source}`)
console.log("Hero portrait:")
await writeHero(480)
const primary = await writeHero(800)
await writeHero(1000)
await heroBase()
  .resize(primary.width, primary.height, { fit: "cover" })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(OUT_DIR, "profile-hero-800.jpg"))
console.log("  profile-hero-800.jpg")
console.log("Avatar:")
await writeAvatar(96)
await writeAvatar(256)
console.log("Social preview:")
await writeOgImage()
console.log("Done. Original source untouched.")
