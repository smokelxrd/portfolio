import { contours } from 'd3-contour'

const FIELD_WIDTH = 96
const FIELD_HEIGHT = 64

const values = Array.from({ length: FIELD_WIDTH * FIELD_HEIGHT }, (_, index) => {
  const x = index % FIELD_WIDTH
  const y = Math.floor(index / FIELD_WIDTH)
  const nx = x / FIELD_WIDTH
  const ny = y / FIELD_HEIGHT

  return (
    Math.sin(nx * 13.5 + ny * 3.2) * 0.34 +
    Math.cos(ny * 15.8 - nx * 5.4) * 0.3 +
    Math.sin((nx + ny) * 18.2) * 0.16 +
    Math.cos(Math.hypot(nx - 0.38, ny - 0.44) * 34) * 0.26
  )
})

const contourPaths = contours()
  .size([FIELD_WIDTH, FIELD_HEIGHT])
  .thresholds(Array.from({ length: 18 }, (_, index) => -0.72 + index * 0.085))(
  values,
)
  .map((shape) => polygonToPath(shape.coordinates))

function polygonToPath(polygons: number[][][][]) {
  return polygons
    .flatMap((polygon) =>
      polygon.map((ring) =>
        ring
          .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x},${y}`)
          .join(' ')
          .concat(' Z'),
      ),
    )
    .join(' ')
}

type TopographicBackgroundProps = {
  className?: string
}

export function TopographicBackground({
  className = '',
}: TopographicBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        aria-hidden="true"
        className={`topographic-field absolute -inset-[8%] h-[116%] w-[116%] ${className}`}
        preserveAspectRatio="none"
        viewBox={`0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`}
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.045">
          {contourPaths.map((path, index) => (
            <path d={path} key={`${index}-${path.length}`} />
          ))}
        </g>
      </svg>
    </div>
  )
}
