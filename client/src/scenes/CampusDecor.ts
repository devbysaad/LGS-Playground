import Phaser from 'phaser'

/**
 * Procedural pixel set dressing for CampusQuest.
 *
 * Everything is baked from Graphics at boot so we stay licence-free and the
 * palette always matches client/src/theme.ts. Prefer small integer rects and
 * circles — the game runs with pixelArt: true, so soft gradients look muddy.
 */

const TEX = {
  tree: 'decor_tree',
  treeSm: 'decor_tree_sm',
  palm: 'decor_palm',
  bush: 'decor_bush',
  flower: 'decor_flower',
  hedge: 'decor_hedge',
  lamp: 'decor_lamp',
  planter: 'decor_planter',
  bollard: 'decor_bollard',
  fountain: 'decor_fountain',
  blob: 'decor_shadow',
  vignette: 'decor_vignette',
} as const

function bake(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics) => void) {
  if (scene.textures.exists(key)) return
  const g = scene.make.graphics({ x: 0, y: 0 }, false)
  draw(g)
  g.generateTexture(key, w, h)
  g.destroy()
}

function bakeAll(scene: Phaser.Scene) {
  bake(scene, TEX.blob, 48, 20, (g) => {
    g.fillStyle(0x04202a, 0.35)
    g.fillEllipse(24, 10, 42, 16)
    g.fillStyle(0x04202a, 0.2)
    g.fillEllipse(24, 12, 28, 10)
  })

  // Dense canopy tree — layered circles + trunk bark ticks
  bake(scene, TEX.tree, 64, 88, (g) => {
    g.fillStyle(0x04202a, 0.25)
    g.fillEllipse(32, 80, 40, 12)
    g.fillStyle(0x4a2f1a, 1)
    g.fillRect(29, 52, 6, 30)
    g.fillStyle(0x6b4528, 1)
    g.fillRect(30, 54, 2, 26)
    g.fillStyle(0x163d32, 1)
    g.fillCircle(32, 40, 22)
    g.fillCircle(18, 48, 14)
    g.fillCircle(46, 48, 14)
    g.fillCircle(24, 30, 12)
    g.fillCircle(42, 32, 12)
    g.fillStyle(0x1f5f4a, 1)
    g.fillCircle(28, 36, 16)
    g.fillCircle(38, 42, 12)
    g.fillCircle(20, 44, 10)
    g.fillStyle(0x2f8a68, 1)
    g.fillCircle(26, 30, 10)
    g.fillCircle(36, 36, 8)
    g.fillStyle(0x63c79b, 0.7)
    g.fillCircle(22, 26, 5)
    g.fillCircle(34, 28, 4)
    g.fillStyle(0xfde68a, 0.55)
    g.fillCircle(30, 24, 2)
  })

  bake(scene, TEX.treeSm, 40, 56, (g) => {
    g.fillStyle(0x4a2f1a, 1)
    g.fillRect(18, 34, 4, 18)
    g.fillStyle(0x1f5f4a, 1)
    g.fillCircle(20, 26, 14)
    g.fillCircle(12, 32, 8)
    g.fillCircle(28, 32, 8)
    g.fillStyle(0x2f8a68, 1)
    g.fillCircle(18, 22, 8)
    g.fillStyle(0x63c79b, 0.6)
    g.fillCircle(16, 18, 4)
  })

  bake(scene, TEX.palm, 56, 84, (g) => {
    g.fillStyle(0x6b4a2c, 1)
    g.fillRect(26, 34, 5, 46)
    g.fillStyle(0x8a6a40, 1)
    g.fillRect(27, 36, 2, 42)
    for (let i = 0; i < 7; i++) {
      const a = (Math.PI * 2 * i) / 7 - 0.4
      g.fillStyle(i % 2 === 0 ? 0x2f8a68 : 0x1f5f4a, 1)
      g.fillEllipse(28 + Math.cos(a) * 16, 30 + Math.sin(a) * 9, 28, 10)
    }
    g.fillStyle(0x63c79b, 0.75)
    g.fillCircle(28, 30, 7)
    g.fillStyle(0xfde68a, 0.5)
    g.fillCircle(28, 28, 2)
  })

  bake(scene, TEX.bush, 36, 28, (g) => {
    g.fillStyle(0x163d32, 1)
    g.fillCircle(12, 16, 10)
    g.fillCircle(24, 16, 10)
    g.fillCircle(18, 12, 9)
    g.fillStyle(0x2f8a68, 1)
    g.fillCircle(14, 14, 7)
    g.fillCircle(22, 14, 7)
    g.fillStyle(0x63c79b, 0.55)
    g.fillCircle(16, 10, 3)
    g.fillStyle(0xfb7185, 0.85)
    g.fillCircle(20, 12, 2)
    g.fillCircle(10, 14, 2)
  })

  bake(scene, TEX.flower, 20, 24, (g) => {
    g.fillStyle(0x1f5f4a, 1)
    g.fillRect(9, 12, 2, 10)
    g.fillStyle(0xfb7185, 1)
    g.fillCircle(10, 8, 5)
    g.fillStyle(0xfde68a, 1)
    g.fillCircle(10, 8, 2)
    g.fillStyle(0xfda4af, 0.8)
    g.fillCircle(6, 7, 2)
    g.fillCircle(14, 7, 2)
  })

  bake(scene, TEX.hedge, 48, 28, (g) => {
    g.fillStyle(0x163d32, 1)
    g.fillRoundedRect(2, 8, 44, 18, 6)
    g.fillStyle(0x1f5f4a, 1)
    g.fillRoundedRect(4, 6, 40, 14, 5)
    for (let i = 0; i < 5; i++) {
      g.fillStyle(0x2f8a68, 1)
      g.fillCircle(8 + i * 8, 10, 5)
    }
    g.fillStyle(0x63c79b, 0.4)
    g.fillCircle(16, 8, 3)
    g.fillCircle(32, 9, 3)
  })

  bake(scene, TEX.lamp, 24, 80, (g) => {
    g.fillStyle(0x0d1c20, 1)
    g.fillRect(10, 22, 4, 52)
    g.fillRect(5, 72, 14, 5)
    g.fillStyle(0x1b2b30, 1)
    g.fillRect(11, 24, 2, 48)
    g.fillStyle(0x24383e, 1)
    g.fillRoundedRect(4, 8, 16, 16, 4)
    g.fillStyle(0xfde68a, 1)
    g.fillRoundedRect(6, 12, 12, 8, 3)
    g.fillStyle(0xfff7d6, 0.7)
    g.fillRect(8, 14, 8, 3)
  })

  bake(scene, TEX.planter, 40, 40, (g) => {
    g.fillStyle(0x1b2b30, 1)
    g.fillRoundedRect(4, 22, 32, 14, 4)
    g.fillStyle(0x2a4148, 1)
    g.fillRoundedRect(6, 20, 28, 12, 4)
    g.fillStyle(0xfde68a, 0.35)
    g.fillRect(8, 22, 24, 2)
    g.fillStyle(0x1f5f4a, 1)
    g.fillCircle(14, 16, 8)
    g.fillCircle(26, 16, 8)
    g.fillStyle(0x2f8a68, 1)
    g.fillCircle(20, 12, 7)
    g.fillStyle(0xfb7185, 0.9)
    g.fillCircle(18, 10, 2)
    g.fillCircle(24, 11, 2)
    g.fillStyle(0xfde68a, 0.85)
    g.fillCircle(20, 8, 2)
  })

  bake(scene, TEX.bollard, 16, 28, (g) => {
    g.fillStyle(0x1b2b30, 1)
    g.fillRect(5, 8, 6, 18)
    g.fillStyle(0xfde68a, 1)
    g.fillRect(4, 4, 8, 6)
    g.fillStyle(0xfff7d6, 0.6)
    g.fillRect(5, 5, 6, 2)
  })

  bake(scene, TEX.fountain, 64, 48, (g) => {
    g.fillStyle(0x2a4148, 1)
    g.fillEllipse(32, 36, 56, 18)
    g.fillStyle(0x123338, 1)
    g.fillEllipse(32, 34, 44, 12)
    g.fillStyle(0x3d8b96, 0.85)
    g.fillEllipse(32, 34, 36, 8)
    g.fillStyle(0x63c79b, 0.5)
    g.fillEllipse(32, 33, 20, 4)
    g.fillStyle(0xd7dee1, 1)
    g.fillRect(30, 10, 4, 22)
    g.fillStyle(0xe0f2f1, 0.7)
    g.fillCircle(32, 10, 5)
    g.fillCircle(32, 18, 3)
  })
}

/** Cheap deterministic hash so decor placement is stable between reloads. */
function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n)
}

export interface DecorOptions {
  groundLayer: Phaser.Tilemaps.TilemapLayer
  grassFirstGid: number
  outdoor: { x: number; y: number; width: number; height: number }
}

export function decorateCampus(scene: Phaser.Scene, { groundLayer, grassFirstGid, outdoor }: DecorOptions) {
  bakeAll(scene)

  const TILE = 32
  const grass = new Set([grassFirstGid, grassFirstGid + 1, grassFirstGid + 2])
  const startX = Math.floor(outdoor.x / TILE)
  const startY = Math.floor(outdoor.y / TILE)
  const endX = Math.floor((outdoor.x + outdoor.width) / TILE)
  const endY = Math.floor((outdoor.y + outdoor.height) / TILE)

  const isClearGrass = (tx: number, ty: number) => {
    for (let dy = 0; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const tile = groundLayer.getTileAt(tx + dx, ty + dy)
        if (!tile || !grass.has(tile.index)) return false
      }
    }
    return true
  }

  const place = (key: string, x: number, y: number, scale = 1) => {
    scene.add
      .image(x, y + 4, TEX.blob)
      .setDepth(y - 1)
      .setScale(scale * 0.75)
      .setAlpha(0.45)
    scene.add.image(x, y, key).setOrigin(0.5, 0.92).setDepth(y).setScale(scale)
  }

  // Dense 2-tile grid — previously every 3rd tile at 22% density felt sparse.
  let planted = 0
  for (let ty = startY + 2; ty < endY - 2; ty += 2) {
    for (let tx = startX + 2; tx < endX - 2; tx += 2) {
      const r = hash(tx, ty)
      if (r > 0.38) continue
      if (!isClearGrass(tx, ty)) continue
      const x = tx * TILE + TILE / 2 + Math.floor((r - 0.2) * 10)
      const y = ty * TILE + TILE
      if (r < 0.06) place(TEX.palm, x, y, 0.95)
      else if (r < 0.16) place(TEX.tree, x, y, 0.88 + (r % 0.03) * 5)
      else if (r < 0.22) place(TEX.treeSm, x, y, 0.95)
      else if (r < 0.3) place(TEX.bush, x, y, 0.95)
      else if (r < 0.34) place(TEX.flower, x, y, 1)
      else place(TEX.planter, x, y, 0.9)
      planted++
    }
  }

  return planted
}

/** Lamp posts with a warm pool of light. */
export function addLampRow(scene: Phaser.Scene, points: Array<{ x: number; y: number }>) {
  bakeAll(scene)
  points.forEach(({ x, y }) => {
    const glow = scene.add.circle(x, y + 4, 52, 0xfde68a, 0.11).setDepth(y - 2)
    const halo = scene.add.circle(x, y - 56, 14, 0xfde68a, 0.18).setDepth(y + 1)
    scene.add.image(x, y, TEX.lamp).setOrigin(0.5, 0.95).setDepth(y)
    scene.tweens.add({
      targets: [glow, halo],
      alpha: { from: 0.08, to: 0.18 },
      duration: 2400 + Math.floor(hash(x, y) * 800),
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  })
}

interface FacadeStyle {
  roof: number
  roofLit: number
  wall: number
  parapet: number
  trim: number
  brick: number
}

/** One palette per building so the campus reads at a glance from the minimap. */
const FACADE_STYLES: Record<string, FacadeStyle> = {
  teal: {
    roof: 0x2b6f7a,
    roofLit: 0x3d8b96,
    wall: 0x245a64,
    parapet: 0x1b4a52,
    trim: 0xfde68a,
    brick: 0x1f535c,
  },
  plum: {
    roof: 0x6d4360,
    roofLit: 0x8a5a7b,
    wall: 0x5a354f,
    parapet: 0x4a2c42,
    trim: 0xfbcfe8,
    brick: 0x4e2e45,
  },
  terracotta: {
    roof: 0x9c5a3c,
    roofLit: 0xba7350,
    wall: 0x8a4e34,
    parapet: 0x6d3c26,
    trim: 0xfde68a,
    brick: 0x7a422c,
  },
  moss: {
    roof: 0x3f6b4a,
    roofLit: 0x568a61,
    wall: 0x355a3e,
    parapet: 0x2a4a32,
    trim: 0xd9f99d,
    brick: 0x2f4f36,
  },
  amber: {
    roof: 0xa8763a,
    roofLit: 0xc7924f,
    wall: 0x8f6430,
    parapet: 0x75521f,
    trim: 0xfde68a,
    brick: 0x7a5528,
  },
  indigo: {
    roof: 0x445a8c,
    roofLit: 0x5c74a8,
    wall: 0x384c78,
    parapet: 0x2e3c60,
    trim: 0xbfdbfe,
    brick: 0x32446c,
  },
  slate: {
    roof: 0x4d5b61,
    roofLit: 0x66777e,
    wall: 0x405048,
    parapet: 0x333e43,
    trim: 0xfde68a,
    brick: 0x3a464c,
  },
}

const GLASS = 0x0a2228
const GLASS_LIT = 0xfde68a
const GLASS_WARM = 0xfff1b8
const MUNTIN = 0xd7dee1

/**
 * Draws a raised, lit building over each flat outdoor shell with dense pixel
 * detail: brick dither, window muntins, AC boxes, roof tiles and a canopy.
 * Collision stays on the tilemap — this is purely how it looks.
 */
export function drawFacades(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
  const layer = map.getObjectLayer('facades')
  if (!layer) return 0

  const BAY_W = 256

  layer.objects.forEach((object) => {
    const props = (object.properties ?? []) as Array<{ name: string; value: unknown }>
    const read = (name: string) => props.find((p) => p.name === name)?.value
    const style = FACADE_STYLES[String(read('style') ?? 'slate')] ?? FACADE_STYLES.slate
    const storeys = Number(read('storeys') ?? 1)
    const label = String(read('label') ?? '')
    const doorSide = String(read('doorSide') ?? 's')

    const x = Math.round(object.x ?? 0)
    const y = Math.round(object.y ?? 0)
    const w = Math.round(object.width ?? 32)
    const h = Math.round(object.height ?? 32)
    const bottom = y + h

    const g = scene.add.graphics().setDepth(bottom)

    // Drop shadow
    g.fillStyle(0x02141a, 0.4)
    g.fillRoundedRect(x + 8, y + 16, w, h, 8)

    // Main body
    g.fillStyle(style.wall, 1)
    g.fillRoundedRect(x, y, w, h, 8)

    // Roof highlight slab
    g.fillStyle(style.roof, 1)
    g.fillRoundedRect(x, y, w, Math.min(36, Math.floor(h * 0.22)), { tl: 8, tr: 8, bl: 0, br: 0 })
    g.fillStyle(style.roofLit, 0.55)
    g.fillRoundedRect(x + 4, y + 4, w - 8, 12, 4)

    // Roof tile ridges (pixel rows)
    const ridgeH = Math.min(28, Math.floor(h * 0.18))
    for (let ry = 6; ry < ridgeH; ry += 4) {
      g.fillStyle(style.parapet, 0.35)
      g.fillRect(x + 6, y + ry, w - 12, 1)
      for (let rx = x + 8; rx < x + w - 8; rx += 10) {
        g.fillStyle(style.roofLit, 0.25)
        g.fillRect(rx, y + ry + 1, 6, 1)
      }
    }

    // Brick dither on the wall body
    for (let by = y + ridgeH + 4; by < bottom - 24; by += 6) {
      const offset = Math.floor((by / 6) % 2) * 4
      for (let bx = x + 6 + offset; bx < x + w - 8; bx += 8) {
        if (hash(bx, by) > 0.55) {
          g.fillStyle(style.brick, 0.55)
          g.fillRect(bx, by, 5, 3)
        }
      }
    }

    // Front parapet
    g.fillStyle(style.parapet, 1)
    g.fillRoundedRect(x, bottom - 20, w, 20, { tl: 0, tr: 0, bl: 8, br: 8 })
    g.fillStyle(style.trim, 0.25)
    g.fillRect(x + 4, bottom - 18, w - 8, 2)

    g.lineStyle(2, style.trim, 0.4)
    g.strokeRoundedRect(x + 1, y + 1, w - 2, h - 2, 8)

    // Window grid with muntins + lit panes
    const bands = Math.max(1, storeys)
    const usable = h - 52
    const bandH = usable / bands
    const cols = Math.max(3, Math.floor((w - 48) / 36))
    const winW = 22
    const winH = Math.min(16, Math.floor(bandH * 0.4))

    for (let b = 0; b < bands; b++) {
      const wy = Math.round(y + 34 + b * bandH + (bandH - winH) / 2)
      for (let c = 0; c < cols; c++) {
        const wx = Math.round(x + 24 + c * ((w - 48) / cols) + ((w - 48) / cols - winW) / 2)
        const lit = hash(wx + b * 3, wy + c) > 0.55
        const warm = lit && hash(wx, wy) > 0.7

        // Frame
        g.fillStyle(style.parapet, 1)
        g.fillRect(wx - 2, wy - 2, winW + 4, winH + 4)

        g.fillStyle(warm ? GLASS_WARM : lit ? GLASS_LIT : GLASS, lit ? 0.85 : 0.9)
        g.fillRect(wx, wy, winW, winH)

        // Cross muntins
        g.fillStyle(MUNTIN, lit ? 0.35 : 0.55)
        g.fillRect(wx + Math.floor(winW / 2) - 1, wy, 2, winH)
        g.fillRect(wx, wy + Math.floor(winH / 2) - 1, winW, 2)

        // Tiny sill
        g.fillStyle(style.trim, 0.4)
        g.fillRect(wx - 1, wy + winH + 2, winW + 2, 2)
      }

      // Floor band between storeys
      if (b < bands - 1) {
        g.fillStyle(style.parapet, 0.65)
        g.fillRect(x + 8, Math.round(y + 34 + (b + 1) * bandH - 2), w - 16, 3)
        g.fillStyle(style.trim, 0.2)
        g.fillRect(x + 10, Math.round(y + 34 + (b + 1) * bandH - 1), w - 20, 1)
      }
    }

    // Pilasters + AC boxes on long wings
    const bays = Math.max(1, Math.floor(w / BAY_W))
    for (let i = 1; i < bays; i++) {
      const px = Math.round(x + (i * w) / bays)
      g.fillStyle(style.parapet, 0.85)
      g.fillRect(px - 5, y + 20, 10, h - 40)
      g.fillStyle(style.trim, 0.25)
      g.fillRect(px - 1, y + 20, 2, h - 40)

      // Roof AC unit every other bay
      if (i % 2 === 0) {
        g.fillStyle(0x2a4148, 1)
        g.fillRect(px - 14, y + 8, 28, 14)
        g.fillStyle(0x4d5b61, 1)
        g.fillRect(px - 12, y + 10, 24, 4)
        g.fillStyle(0x1b2b30, 1)
        g.fillRect(px - 10, y + 16, 8, 4)
        g.fillRect(px + 2, y + 16, 8, 4)
      }
    }

    // Entrance canopy + double doors
    const canopyW = Math.min(160, Math.max(88, Math.floor(w * 0.08)))
    if (doorSide === 's') {
      const cx = x + Math.floor(w / 2)
      g.fillStyle(0x02141a, 0.3)
      g.fillRect(cx - canopyW / 2 + 4, bottom - 6, canopyW, 8)

      g.fillStyle(style.trim, 0.95)
      g.fillRoundedRect(cx - canopyW / 2, bottom - 16, canopyW, 14, 4)
      g.fillStyle(style.roofLit, 0.5)
      g.fillRect(cx - canopyW / 2 + 4, bottom - 14, canopyW - 8, 3)

      // Door recess
      g.fillStyle(style.parapet, 1)
      g.fillRoundedRect(cx - 28, bottom - 44, 56, 30, 3)
      g.fillStyle(GLASS, 0.95)
      g.fillRoundedRect(cx - 24, bottom - 40, 22, 24, 2)
      g.fillRoundedRect(cx + 2, bottom - 40, 22, 24, 2)
      g.fillStyle(style.trim, 0.7)
      g.fillRect(cx - 1, bottom - 40, 2, 24)
      g.fillCircle(cx - 6, bottom - 28, 2)
      g.fillCircle(cx + 6, bottom - 28, 2)

      // Steps
      g.fillStyle(0xd7dee1, 0.85)
      g.fillRect(cx - 32, bottom - 4, 64, 4)
      g.fillStyle(0xb8c4c8, 0.85)
      g.fillRect(cx - 28, bottom, 56, 3)
    }

    if (label) {
      scene.add
        .text(x + w / 2, y + 10, label, {
          fontFamily: 'Manrope, Avenir Next, sans-serif',
          fontSize: '12px',
          color: '#e0f2f1',
          stroke: '#0b1f24',
          strokeThickness: 3,
        })
        .setOrigin(0.5, 0)
        .setDepth(bottom + 1)
        .setAlpha(0.95)
    }
  })

  return layer.objects.length
}

/**
 * Props from the map `props` layer — outdoor kit plus courtyard / terrace /
 * corridor dressing.
 */
export function drawProps(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
  const layer = map.getObjectLayer('props')
  if (!layer) return 0

  bakeAll(scene)

  const placeBaked = (key: string, x: number, y: number, scale = 1) => {
    scene.add
      .image(x, y + 4, TEX.blob)
      .setDepth(y - 1)
      .setScale(scale * 0.7)
      .setAlpha(0.4)
    scene.add.image(x, y, key).setOrigin(0.5, 0.92).setDepth(y).setScale(scale)
  }

  layer.objects.forEach((object) => {
    const props = (object.properties ?? []) as Array<{ name: string; value: unknown }>
    const kind = String(props.find((p) => p.name === 'kind')?.value ?? '')
    const rot = Number(props.find((p) => p.name === 'rotation')?.value ?? 0)
    const x = Math.round(object.x ?? 0)
    const y = Math.round(object.y ?? 0)

    if (kind === 'dash') {
      const g = scene.add.graphics().setDepth(1)
      g.fillStyle(0xf5f0e6, 0.55)
      if (rot === 90) g.fillRoundedRect(x - 2, y - 18, 4, 36, 2)
      else g.fillRoundedRect(x - 18, y - 2, 36, 4, 2)
      return
    }

    const baked: Record<string, string> = {
      tree: TEX.tree,
      'tree-sm': TEX.treeSm,
      palm: TEX.palm,
      bush: TEX.bush,
      flower: TEX.flower,
      hedge: TEX.hedge,
      planter: TEX.planter,
      bollard: TEX.bollard,
      fountain: TEX.fountain,
    }
    if (kind in baked) {
      placeBaked(baked[kind], x, y, kind === 'fountain' ? 1 : 0.95)
      return
    }

    if (kind === 'lamp') {
      addLampRow(scene, [{ x, y }])
      return
    }

    const g = scene.add.graphics().setDepth(y)
    const shadow = () => {
      g.fillStyle(0x02141a, 0.28)
      g.fillEllipse(x, y + 10, 40, 14)
    }

    switch (kind) {
      case 'bench':
        shadow()
        g.fillStyle(0x3a2414, 1)
        g.fillRoundedRect(x - 28, y - 12, 56, 8, 2)
        g.fillStyle(0x5b3a24, 1)
        g.fillRoundedRect(x - 28, y - 24, 56, 8, 2)
        g.fillStyle(0x6b4528, 1)
        g.fillRect(x - 26, y - 22, 52, 2)
        g.fillStyle(0x2a4148, 1)
        g.fillRect(x - 24, y - 6, 5, 12)
        g.fillRect(x + 19, y - 6, 5, 12)
        break
      case 'rug': {
        // Corridor runner — low depth so characters walk over it
        const rg = scene.add.graphics().setDepth(2)
        rg.fillStyle(0x6d4360, 0.55)
        rg.fillRoundedRect(x - 48, y - 10, 96, 20, 4)
        rg.fillStyle(0xfbcfe8, 0.25)
        rg.fillRect(x - 44, y - 6, 88, 2)
        rg.fillRect(x - 44, y + 4, 88, 2)
        break
      }
      case 'locker':
        shadow()
        g.fillStyle(0x2a4148, 1)
        g.fillRoundedRect(x - 20, y - 36, 40, 40, 3)
        g.fillStyle(0x1b2b30, 1)
        g.fillRect(x - 18, y - 34, 17, 34)
        g.fillRect(x + 1, y - 34, 17, 34)
        g.fillStyle(0xfde68a, 0.7)
        g.fillCircle(x - 5, y - 16, 2)
        g.fillCircle(x + 14, y - 16, 2)
        g.fillStyle(0x3d8b96, 0.5)
        g.fillRect(x - 16, y - 30, 13, 8)
        g.fillRect(x + 3, y - 30, 13, 8)
        break
      case 'bookshelf':
        shadow()
        g.fillStyle(0x4a2f1a, 1)
        g.fillRoundedRect(x - 22, y - 40, 44, 44, 2)
        for (let shelf = 0; shelf < 4; shelf++) {
          const sy = y - 36 + shelf * 10
          g.fillStyle(0x2a1a0e, 1)
          g.fillRect(x - 20, sy, 40, 2)
          for (let b = 0; b < 5; b++) {
            const colors = [0xfb7185, 0x2f8a68, 0xfde68a, 0x445a8c, 0x8a5a7b]
            g.fillStyle(colors[(b + shelf) % colors.length], 1)
            g.fillRect(x - 18 + b * 8, sy + 2, 6, 7)
          }
        }
        break
      case 'stairs': {
        g.fillStyle(0x02141a, 0.25)
        g.fillRoundedRect(x - 48, y - 56, 96, 108, 6)
        for (let step = 0; step < 9; step++) {
          const inset = step * 2
          g.fillStyle(step % 2 === 0 ? 0x3d555e : 0x2c454c, 1)
          g.fillRect(x - 42 + inset, y - 50 + step * 11, 84 - inset * 2, 9)
          g.fillStyle(0xfde68a, 0.15)
          g.fillRect(x - 42 + inset, y - 50 + step * 11, 84 - inset * 2, 1)
        }
        g.lineStyle(3, 0xfde68a, 0.55)
        g.lineBetween(x - 44, y - 52, x - 44, y + 48)
        g.lineBetween(x + 44, y - 52, x + 44, y + 48)
        g.fillStyle(0x2a4148, 1)
        g.fillRect(x - 48, y - 54, 8, 8)
        g.fillRect(x + 40, y - 54, 8, 8)
        break
      }
      case 'goal':
        shadow()
        g.lineStyle(4, 0xf5f0e6, 0.95)
        g.strokeRoundedRect(x - 34, y - 40, 68, 44, 3)
        g.lineStyle(1, 0xf5f0e6, 0.4)
        for (let i = -30; i < 32; i += 6) g.lineBetween(x + i, y - 38, x + i, y + 2)
        g.fillStyle(0x2a4148, 1)
        g.fillRect(x - 36, y - 42, 6, 48)
        g.fillRect(x + 30, y - 42, 6, 48)
        break
      case 'swing':
        shadow()
        g.lineStyle(5, 0x4d5b61, 1)
        g.lineBetween(x - 26, y + 4, x - 10, y - 38)
        g.lineBetween(x + 26, y + 4, x + 10, y - 38)
        g.lineBetween(x - 10, y - 38, x + 10, y - 38)
        g.lineStyle(3, 0x8a949a, 1)
        g.lineBetween(x - 4, y - 38, x - 4, y - 12)
        g.lineBetween(x + 4, y - 38, x + 4, y - 12)
        g.fillStyle(0xfb7185, 1)
        g.fillRoundedRect(x - 10, y - 12, 20, 6, 2)
        break
      case 'slide':
        shadow()
        g.fillStyle(0x4d5b61, 1)
        g.fillRoundedRect(x - 22, y - 44, 14, 48, 3)
        g.fillStyle(0xfde68a, 1)
        g.fillTriangle(x - 10, y - 42, x + 26, y + 2, x - 4, y + 2)
        g.fillStyle(0x2f8a68, 1)
        g.fillRoundedRect(x - 26, y - 52, 22, 12, 3)
        break
      case 'sandpit':
        g.fillStyle(0xd9c08a, 1)
        g.fillRoundedRect(x - 46, y - 24, 92, 48, 12)
        g.lineStyle(3, 0x8a6f42, 0.9)
        g.strokeRoundedRect(x - 46, y - 24, 92, 48, 12)
        g.fillStyle(0xc4ab72, 0.6)
        g.fillCircle(x - 16, y - 4, 6)
        g.fillCircle(x + 12, y + 6, 5)
        break
      case 'flagpole':
        shadow()
        g.fillStyle(0xd7dee1, 1)
        g.fillRect(x - 2, y - 80, 4, 84)
        g.fillStyle(0x2f8a68, 1)
        g.fillTriangle(x + 2, y - 78, x + 36, y - 66, x + 2, y - 54)
        g.fillStyle(0xfb7185, 1)
        g.fillTriangle(x + 2, y - 66, x + 28, y - 58, x + 2, y - 54)
        g.fillStyle(0x1b4a52, 1)
        g.fillCircle(x, y + 2, 9)
        g.fillStyle(0xfde68a, 0.6)
        g.fillCircle(x, y - 80, 3)
        break
      case 'bin':
        shadow()
        g.fillStyle(0x1f5f4a, 1)
        g.fillRoundedRect(x - 9, y - 22, 18, 24, 3)
        g.fillStyle(0x2f8a68, 1)
        g.fillRoundedRect(x - 11, y - 26, 22, 6, 2)
        g.fillStyle(0x163d32, 1)
        g.fillRect(x - 6, y - 18, 12, 2)
        g.fillRect(x - 6, y - 12, 12, 2)
        break
      case 'sign-parking':
        shadow()
        g.fillStyle(0x4d5b61, 1)
        g.fillRect(x - 2, y - 34, 4, 36)
        g.fillStyle(0x123338, 1)
        g.fillRoundedRect(x - 20, y - 54, 40, 24, 4)
        g.lineStyle(2, 0xfde68a, 0.9)
        g.strokeRoundedRect(x - 20, y - 54, 40, 24, 4)
        scene.add
          .text(x, y - 42, 'P', {
            fontFamily: 'Fraunces, serif',
            fontSize: '16px',
            color: '#fde68a',
          })
          .setOrigin(0.5)
          .setDepth(y + 1)
        break
    }
  })

  return layer.objects.length
}

/** Screen-space vignette under the DOM UI but over the world. */
export function addVignette(scene: Phaser.Scene): Phaser.GameObjects.Image | undefined {
  const { width, height } = scene.scale
  const key = TEX.vignette
  if (!scene.textures.exists(key)) {
    const canvas = scene.textures.createCanvas(key, width, height)
    if (!canvas) return undefined
    const ctx = canvas.getContext()
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.4,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.72
    )
    gradient.addColorStop(0, 'rgba(4, 16, 22, 0)')
    gradient.addColorStop(0.7, 'rgba(4, 16, 22, 0.2)')
    gradient.addColorStop(1, 'rgba(4, 16, 22, 0.5)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    canvas.refresh()
  }

  return scene.add.image(0, 0, key).setOrigin(0).setScrollFactor(0).setDepth(19000)
}
