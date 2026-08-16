# Map specification — CampusQuest

Contract for the LGS Gudwal Tiled map. Violating this breaks Phaser load or content binding.

## Files

| File | Role |
| --- | --- |
| `client/public/assets/maps/campus.tmx` | Authoring source (commit) |
| `client/public/assets/maps/campus.json` | Phaser runtime (commit) |
| Tileset images | Under `client/public/assets/tilesets/` |

## Grid

- Tile size: **32×32** (never mix sizes)
- Orientation: orthogonal, right-down
- One campus map for v1 (outdoor + interior islands on one grid; camera bounds per `areas`)


## Export settings (Tiled)

- Format: JSON
- Embed tilesets: **off** (external tileset refs resolving under `assets/tilesets/`)
- Layer data: CSV
- Export after every meaningful map change; commit `.tmx` and `.json` together

## Tile layers (draw order bottom → top)

| Name | Purpose |
| --- | --- |
| `Ground` | Floor, grass, paths base |
| `Decor` | Paths accents, rugs, non-colliding props |
| `Collision` | Walls / blockers; tiles with `collides: true` |
| `AbovePlayer` | Roofs, tree tops, overhangs drawn above the player |

Phaser enables collision **only** on `Collision` via `setCollisionByProperty({ collides: true })`.

## Object layers

| Layer name | Object type / use | Required custom properties |
| --- | --- | --- |
| `spawns` | Spawn points | `name` = `spawn_gate` (required). Optional later: `spawn_admin`, etc. |
| `areas` | Camera/physics bounds rectangles | `areaId` (`outdoor`, `a-level-ground`, `a-level-first`, `o-level-ground`, `o-level-first`), optional `displayName` |
| `portals` | Door enter/exit triggers | `portalId`, `targetArea`, `spawnTileX`, `spawnTileY`, `label` |
| `buildings` | Building doorway info rectangles | `buildingId` (string, must match `content/buildings.ts`) |
| `rooms` | Interior room rectangles | `roomId` (string, must match `content/rooms.ts`) |
| `boards` | Writable classroom/notice boards | `boardId` |
| `npcs` | NPC anchor points | `npcId` (string, must match `content/npcs.ts`) |
| `ambient` | Local-only student/staff walkers | `ambientId`, `areaId` |
| `vehicles` | Drivable car spawn points | `vehicleId`, `areaId` (outdoor only) |
| `eggs` | Orientation clue markers | `eggId` (answers live server-side) |
| `facades` | Outdoor building shell visuals | `buildingId`, `style`, `doorSide`, `storeys`, `label` |
| `props` | Procedural set dressing anchors | `kind` (`tree`, `lamp`, `hedge`, `stairs`, `rug`, …), optional `rotation` |
| `benches` | Sit targets | optional `benchId` |
| `kiosks` | Notice boards | `buildingId` or `kioskId` matching content |

Object sizes should be large enough for comfortable overlap (~1–2 tiles padding around doors).

## ID naming rules

- Lowercase kebab: `a-level-block`, `o-level-block`, `walking-area`
- Classroom ids are `<wing><floor>-c<n>` — e.g. `ag-c3` is A-Level ground, third room; `of-c1` is O-Level first floor, first room
- Same id string in: Tiled property, `buildings.ts` / `npcs.ts` / `rooms.ts` key, quest `targetId`
- Never rename an id without updating map + content + quests in one change

## Validation (Phase 2+)

On map load (dev) or CI script:

1. Every `buildings` object has non-empty `buildingId`
2. Every `buildingId` exists in content
3. Every content building used as a quest target exists on the map
4. `spawn_gate` exists exactly once
5. Fail loudly on mismatch (throw / console error in boot)

**Implemented:** `client/src/utils/validateMapContent.ts` runs from `CampusScene.create()` right
after the tilemap loads — throws in dev, warns in production. `scripts/validate-map.mjs` is a
Node-only mirror (no Phaser boot required) for CI/local checks; run with `yarn validate-map`.

## Current map status

`tools/gen_lgs_campus.py` is the source of truth. It writes both
`client/public/assets/map/map.json` and `client/public/assets/maps/campus.json`. There is no
hand-authored `.tmx` — regenerate after layout changes:

```bash
yarn gen-map    # tools/gen_lgs_campus.py
yarn validate-map
```

Layout follows the hand-drawn Excalidraw site plan (ADR-024):

- Outdoor campus **120×92** tiles inside a **248×130** map (interior islands to the east)
- South **main gate** → east main drive → two long two-storey wings stacked north/south
  (**A-Level Block**, **O-Level Block**)
- East **walking area**, south **parking** + **sports ground**, notice board by the gate
- Each wing ground floor: north classrooms + staff room, corridor with east stairwell, south
  2×2 labs + small-ground courtyard + 6-classroom block, east column (library / offices /
  reception / principal or canteen)
- Upper floors reuse the wing without the east column; stairs are ordinary portals
- **30 classrooms** total (8 / 7 / 8 / 7 across the four floors)

Enterable wings are **solid outdoor shells**; Press E at the door fades into a **separate
interior island**. Camera bounds (`areas`) hide everything outside that floor until you exit.
Facades and props are drawn procedurally in `client/src/scenes/CampusDecor.ts`.

## Greybox guidance (real Gudwal later)

No official public layout PDF. Process:

1. Trace satellite footprint (Main Gudwal Rd / Sir Syed Rd) for outer walls and courtyards
2. Update footprints in `tools/gen_lgs_campus.py` (keep the same `buildingId`s / `areaId`s / `portalId`s)
3. Playtest scale before decorating
4. Decorate last

If crossing the map feels long, **shrink before decorating further**.

## Camera

- Follow player with `roundPixels: true` and light lerp (0.12)
- Zoom **1.65** (see DESIGN.md)
- Bounds = active `areas` rectangle so outdoor/other buildings cannot scroll into view while indoors
