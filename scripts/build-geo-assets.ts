/*
 * Builds the flag and outline pictures for "What flag is this?" and "What
 * country is this?" into public/geo/. Run it after editing
 * src/content/countries.ts:
 *
 *   node scripts/build-geo-assets.ts
 *
 * Flags come from flag-icons (MIT). Outlines are drawn from Natural Earth
 * (public domain) via world-atlas.
 */
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import countries from 'i18n-iso-countries'
import { feature } from 'topojson-client'
import { COUNTRIES, geoAsset } from '../src/content/countries.ts'

type Ring = [number, number][]
type Polygon = Ring[]

const require = createRequire(import.meta.url)
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const out = (p: string) => path.join(root, 'public', p)

const world = JSON.parse(readFileSync(require.resolve('world-atlas/countries-50m.json'), 'utf8'))
/** Natural Earth areas drawn as part of a country, by name: the whole island of Cyprus, all of Somalia. */
const JOIN: Record<string, string> = { 'N. Cyprus': '196', Somaliland: '706' }
/** Natural Earth areas that reuse a country's id but aren't part of its outline. */
const SKIP = new Set(['Ashmore and Cartier Is.'])
/** Remote islands close enough to chain onto the mainland, left off by latitude: Svalbard. */
const NORTH_LIMIT: Record<string, number> = { '578': 74 }

const shapes = new Map<string, Polygon[]>()
type Feature = { id?: string; properties: { name: string }; geometry: { type: string; coordinates: unknown } | null }
for (const f of (feature(world, world.objects.countries) as unknown as { features: Feature[] }).features) {
  const id = JOIN[f.properties.name] ?? f.id
  if (!f.geometry || !id || SKIP.has(f.properties.name)) continue
  let polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates as Polygon] : (f.geometry.coordinates as Polygon[])
  if (NORTH_LIMIT[id]) polys = polys.filter((p) => p[0].some(([, lat]) => lat < NORTH_LIMIT[id]))
  shapes.set(id, [...(shapes.get(id) ?? []), ...polys])
}

const KM_PER_DEG = 111.32
/** Islands further than this from the rest of the country are left off, e.g. French Guiana or Alaska. */
const GAP_KM = 400
const SIZE = 1000

function outlineSvg(polys: Polygon[]): string {
  // Bring polygons that sit across the antimeridian (eastern Russia, Fiji) next to the rest.
  const lons = polys.flatMap((p) => p[0].map(([x]) => x))
  if (Math.max(...lons) - Math.min(...lons) > 180) {
    const east = lons.filter((x) => x > 0).length >= lons.length / 2
    polys = polys.map((p) => p.map((r) => r.map(([x, y]): [number, number] => [east && x < 0 ? x + 360 : !east && x > 0 ? x - 360 : x, y])))
  }

  // Rough km coordinates, good enough to compare distances and areas.
  const lat0 = (polys.flatMap((p) => p[0].map(([, y]) => y)).reduce((a, b) => a + b, 0) / lons.length) * (Math.PI / 180)
  const km = (r: Ring): Ring => r.map(([x, y]) => [x * KM_PER_DEG * Math.cos(lat0), -y * KM_PER_DEG])
  const items = polys.map((p) => {
    const rings = p.map(km)
    const xs = rings[0].map(([x]) => x)
    const ys = rings[0].map(([, y]) => y)
    let area = 0
    for (let i = 0, r = rings[0]; i < r.length - 1; i++) area += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1]
    return { rings, area: Math.abs(area / 2), box: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] }
  })

  // Keep the largest landmass and everything chained to it by gaps under GAP_KM.
  const gap = (a: number[], b: number[]) => Math.hypot(Math.max(0, a[0] - b[2], b[0] - a[2]), Math.max(0, a[1] - b[3], b[1] - a[3]))
  const kept = new Set([items.reduce((best, it, i) => (it.area > items[best].area ? i : best), 0)])
  for (let grew = true; grew; ) {
    grew = false
    items.forEach((it, i) => {
      if (kept.has(i) || ![...kept].some((k) => gap(items[k].box, it.box) < GAP_KM)) return
      kept.add(i)
      grew = true
    })
  }
  const keep = items.filter((_, i) => kept.has(i))

  const [x0, y0, x1, y1] = keep.reduce((b, it) => [Math.min(b[0], it.box[0]), Math.min(b[1], it.box[1]), Math.max(b[2], it.box[2]), Math.max(b[3], it.box[3])], [Infinity, Infinity, -Infinity, -Infinity])
  const scale = SIZE / Math.max(x1 - x0, y1 - y0)
  const w = Math.round((x1 - x0) * scale)
  const h = Math.round((y1 - y0) * scale)

  let d = ''
  for (const it of keep) {
    for (const ring of it.rings) {
      const pts: Ring = []
      for (const [x, y] of ring) {
        const p: [number, number] = [Math.round((x - x0) * scale), Math.round((y - y0) * scale)]
        const last = pts[pts.length - 1]
        if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) >= 2) pts.push(p)
      }
      if (pts.length < 3) continue
      d += 'M' + pts.map(([x, y]) => `${x} ${y}`).join('L') + 'Z'
    }
  }
  const pad = 20
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}"><path fill="#101a2b" fill-rule="evenodd" stroke="#101a2b" stroke-width="2" stroke-linejoin="round" d="${d}"/></svg>\n`
}

rmSync(out('geo'), { recursive: true, force: true })
mkdirSync(out('geo/flags'), { recursive: true })
mkdirSync(out('geo/outlines'), { recursive: true })

const flagDir = path.dirname(require.resolve('flag-icons/flags/4x3/fr.svg'))
let missing = 0
for (const [code, name, , , outline] of COUNTRIES) {
  copyFileSync(path.join(flagDir, `${code}.svg`), out(geoAsset('flag', code)))
  if (!outline) continue
  const polys = shapes.get(countries.alpha2ToNumeric(code.toUpperCase()) ?? '')
  if (!polys) {
    console.error(`No outline for ${name} (${code})`)
    missing++
    continue
  }
  writeFileSync(out(geoAsset('outline', code)), outlineSvg(polys))
}
writeFileSync(out('geo/CREDITS.txt'), `Flags: flag-icons (https://github.com/lipis/flag-icons), MIT License.\nCountry outlines: Natural Earth (public domain) via world-atlas.\n\n${readFileSync(require.resolve('flag-icons/LICENSE'), 'utf8')}`)
if (missing) process.exit(1)
console.log(`Wrote ${COUNTRIES.length} flags and ${COUNTRIES.filter((c) => c[4]).length} outlines to public/geo/`)
