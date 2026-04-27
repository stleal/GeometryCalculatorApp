import { useState, type JSX } from 'react'
import './App.css'

type TabKey = 'overview' | 'calculator'
type ShapeKey = 'circle' | 'triangle' | 'polygon'

type CircleState = {
  radius: string
}

type TriangleState = {
  base: string
  height: string
  sideA: string
  sideB: string
  sideC: string
  depth: string
}

type PolygonState = {
  sides: string
  sideLength: string
  apothem: string
  prismHeight: string
}

type Metric = {
  label: string
  value: string
  detail: string
}

const shapeCopy: Record<
  ShapeKey,
  {
    title: string
    description: string
    accent: string
  }
> = {
  circle: {
    title: 'Circle Studio',
    description: 'Calculate area, circumference, and sphere volume from one radius input.',
    accent: 'Radius-driven measurements',
  },
  triangle: {
    title: 'Triangle Bench',
    description: 'Compare face area, perimeter, and triangular prism volume in one place.',
    accent: 'Planar and prism metrics',
  },
  polygon: {
    title: 'Polygon Lab',
    description: 'Explore regular polygon area, perimeter, and prism volume with adjustable sides.',
    accent: 'Regular polygon analysis',
  },
}

const parsePositiveNumber = (value: string) => {
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null
  }

  return parsed
}

const formatValue = (value: number | null, suffix: string) => {
  if (value === null) {
    return '--'
  }

  return `${value.toFixed(2)} ${suffix}`
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [selectedShape, setSelectedShape] = useState<ShapeKey>('circle')
  const [circle, setCircle] = useState<CircleState>({ radius: '12' })
  const [triangle, setTriangle] = useState<TriangleState>({
    base: '10',
    height: '8',
    sideA: '8',
    sideB: '10',
    sideC: '12',
    depth: '14',
  })
  const [polygon, setPolygon] = useState<PolygonState>({
    sides: '6',
    sideLength: '7',
    apothem: '6.1',
    prismHeight: '10',
  })

  const circleRadius = parsePositiveNumber(circle.radius)
  const circleArea = circleRadius === null ? null : Math.PI * circleRadius * circleRadius
  const circleCircumference = circleRadius === null ? null : 2 * Math.PI * circleRadius
  const sphereVolume =
    circleRadius === null ? null : (4 / 3) * Math.PI * Math.pow(circleRadius, 3)

  const triangleBase = parsePositiveNumber(triangle.base)
  const triangleHeight = parsePositiveNumber(triangle.height)
  const triangleSideA = parsePositiveNumber(triangle.sideA)
  const triangleSideB = parsePositiveNumber(triangle.sideB)
  const triangleSideC = parsePositiveNumber(triangle.sideC)
  const triangleDepth = parsePositiveNumber(triangle.depth)
  const triangleArea =
    triangleBase === null || triangleHeight === null
      ? null
      : (triangleBase * triangleHeight) / 2
  const trianglePerimeter =
    triangleSideA === null || triangleSideB === null || triangleSideC === null
      ? null
      : triangleSideA + triangleSideB + triangleSideC
  const triangleVolume =
    triangleArea === null || triangleDepth === null ? null : triangleArea * triangleDepth

  const polygonSides = parsePositiveNumber(polygon.sides)
  const polygonSideLength = parsePositiveNumber(polygon.sideLength)
  const polygonApothem = parsePositiveNumber(polygon.apothem)
  const polygonPrismHeight = parsePositiveNumber(polygon.prismHeight)
  const validPolygonSides = polygonSides !== null && polygonSides >= 3 ? polygonSides : null
  const polygonPerimeter =
    validPolygonSides === null || polygonSideLength === null
      ? null
      : validPolygonSides * polygonSideLength
  const polygonArea =
    polygonPerimeter === null || polygonApothem === null
      ? null
      : (polygonPerimeter * polygonApothem) / 2
  const polygonVolume =
    polygonArea === null || polygonPrismHeight === null
      ? null
      : polygonArea * polygonPrismHeight

  const metricsByShape: Record<ShapeKey, Metric[]> = {
    circle: [
      {
        label: 'Area',
        value: formatValue(circleArea, 'sq units'),
        detail: 'pi * r^2',
      },
      {
        label: 'Circumference',
        value: formatValue(circleCircumference, 'units'),
        detail: '2 * pi * r',
      },
      {
        label: 'Sphere volume',
        value: formatValue(sphereVolume, 'cu units'),
        detail: '4/3 * pi * r^3',
      },
    ],
    triangle: [
      {
        label: 'Area',
        value: formatValue(triangleArea, 'sq units'),
        detail: 'base * height / 2',
      },
      {
        label: 'Perimeter',
        value: formatValue(trianglePerimeter, 'units'),
        detail: 'a + b + c',
      },
      {
        label: 'Prism volume',
        value: formatValue(triangleVolume, 'cu units'),
        detail: 'triangle area * depth',
      },
    ],
    polygon: [
      {
        label: 'Area',
        value: formatValue(polygonArea, 'sq units'),
        detail: 'perimeter * apothem / 2',
      },
      {
        label: 'Perimeter',
        value: formatValue(polygonPerimeter, 'units'),
        detail: 'sides * side length',
      },
      {
        label: 'Prism volume',
        value: formatValue(polygonVolume, 'cu units'),
        detail: 'polygon area * height',
      },
    ],
  }

  const shapeInputs: Record<ShapeKey, JSX.Element> = {
    circle: (
      <div className="input-grid">
        <label className="field-card" htmlFor="circle-radius">
          <span>Radius</span>
          <input
            id="circle-radius"
            type="number"
            min="0"
            step="0.1"
            value={circle.radius}
            onChange={(event) => setCircle({ radius: event.target.value })}
          />
        </label>
      </div>
    ),
    triangle: (
      <div className="input-grid">
        <label className="field-card" htmlFor="triangle-base">
          <span>Base</span>
          <input
            id="triangle-base"
            type="number"
            min="0"
            step="0.1"
            value={triangle.base}
            onChange={(event) =>
              setTriangle((current) => ({ ...current, base: event.target.value }))
            }
          />
        </label>
        <label className="field-card" htmlFor="triangle-height">
          <span>Height</span>
          <input
            id="triangle-height"
            type="number"
            min="0"
            step="0.1"
            value={triangle.height}
            onChange={(event) =>
              setTriangle((current) => ({ ...current, height: event.target.value }))
            }
          />
        </label>
        <label className="field-card" htmlFor="triangle-side-a">
          <span>Side A</span>
          <input
            id="triangle-side-a"
            type="number"
            min="0"
            step="0.1"
            value={triangle.sideA}
            onChange={(event) =>
              setTriangle((current) => ({ ...current, sideA: event.target.value }))
            }
          />
        </label>
        <label className="field-card" htmlFor="triangle-side-b">
          <span>Side B</span>
          <input
            id="triangle-side-b"
            type="number"
            min="0"
            step="0.1"
            value={triangle.sideB}
            onChange={(event) =>
              setTriangle((current) => ({ ...current, sideB: event.target.value }))
            }
          />
        </label>
        <label className="field-card" htmlFor="triangle-side-c">
          <span>Side C</span>
          <input
            id="triangle-side-c"
            type="number"
            min="0"
            step="0.1"
            value={triangle.sideC}
            onChange={(event) =>
              setTriangle((current) => ({ ...current, sideC: event.target.value }))
            }
          />
        </label>
        <label className="field-card" htmlFor="triangle-depth">
          <span>Prism depth</span>
          <input
            id="triangle-depth"
            type="number"
            min="0"
            step="0.1"
            value={triangle.depth}
            onChange={(event) =>
              setTriangle((current) => ({ ...current, depth: event.target.value }))
            }
          />
        </label>
      </div>
    ),
    polygon: (
      <div className="input-grid">
        <label className="field-card" htmlFor="polygon-sides">
          <span>Number of sides</span>
          <input
            id="polygon-sides"
            type="number"
            min="3"
            step="1"
            value={polygon.sides}
            onChange={(event) =>
              setPolygon((current) => ({ ...current, sides: event.target.value }))
            }
          />
        </label>
        <label className="field-card" htmlFor="polygon-side-length">
          <span>Side length</span>
          <input
            id="polygon-side-length"
            type="number"
            min="0"
            step="0.1"
            value={polygon.sideLength}
            onChange={(event) =>
              setPolygon((current) => ({ ...current, sideLength: event.target.value }))
            }
          />
        </label>
        <label className="field-card" htmlFor="polygon-apothem">
          <span>Apothem</span>
          <input
            id="polygon-apothem"
            type="number"
            min="0"
            step="0.1"
            value={polygon.apothem}
            onChange={(event) =>
              setPolygon((current) => ({ ...current, apothem: event.target.value }))
            }
          />
        </label>
        <label className="field-card" htmlFor="polygon-prism-height">
          <span>Prism height</span>
          <input
            id="polygon-prism-height"
            type="number"
            min="0"
            step="0.1"
            value={polygon.prismHeight}
            onChange={(event) =>
              setPolygon((current) => ({ ...current, prismHeight: event.target.value }))
            }
          />
        </label>
      </div>
    ),
  }

  return (
    <div className="app-shell">
      <header className="app-hero">
        <div className="hero-copy">
          <p className="eyebrow">Geometry Calculator</p>
          <h1>Plan, compare, and calculate shapes from one clean workspace.</h1>
          <p className="hero-text">
            Start on the overview page, then switch into the calculator tab to work with
            circles, triangles, and polygons using tailored inputs for area, perimeter,
            circumference, and volume.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="primary-action"
              onClick={() => setActiveTab('calculator')}
            >
              Open Shapes Calculator
            </button>
            <div className="hero-note">
              <span className="hero-note-label">Live set</span>
              <strong>{shapeCopy[selectedShape].title}</strong>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <p className="panel-label">Shape focus</p>
          <div className="shape-stack">
            {(['circle', 'triangle', 'polygon'] as ShapeKey[]).map((shape) => (
              <button
                key={shape}
                type="button"
                className={`shape-pill ${selectedShape === shape ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedShape(shape)
                  setActiveTab('calculator')
                }}
              >
                <span>{shapeCopy[shape].title}</span>
                <small>{shapeCopy[shape].accent}</small>
              </button>
            ))}
          </div>
        </div>
      </header>

      <nav className="tab-switcher" aria-label="Page sections">
        <button
          type="button"
          className={`tab-button ${activeTab === 'overview' ? 'is-current' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'calculator' ? 'is-current' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          Shapes Calculator
        </button>
      </nav>

      <main className="main-panel">
        {activeTab === 'overview' ? (
          <section className="overview-grid">
            <article className="feature-card feature-card-large">
              <p className="panel-label">Overview</p>
              <h2>Use the overview to choose the right geometry workflow.</h2>
              <p>
                Each shape mode is tuned to a different kind of calculation, from quick
                circumference checks to prism and sphere volume planning.
              </p>
              <div className="stat-grid">
                <div className="stat-card">
                  <strong>3</strong>
                  <span>shape families ready to use</span>
                </div>
                <div className="stat-card">
                  <strong>9</strong>
                  <span>live measurements displayed</span>
                </div>
                <div className="stat-card">
                  <strong>1</strong>
                  <span>calculator tab for focused work</span>
                </div>
              </div>
            </article>

            <article className="feature-card">
              <p className="panel-label">What is included</p>
              <ul className="overview-list">
                <li>Circle mode for area, circumference, and sphere volume.</li>
                <li>Triangle mode for face area, perimeter, and prism volume.</li>
                <li>Polygon mode for regular polygon area, perimeter, and prism volume.</li>
              </ul>
            </article>

            {(['circle', 'triangle', 'polygon'] as ShapeKey[]).map((shape) => (
              <article key={shape} className="feature-card shape-card">
                <p className="panel-label">{shapeCopy[shape].accent}</p>
                <h3>{shapeCopy[shape].title}</h3>
                <p>{shapeCopy[shape].description}</p>
                <button
                  type="button"
                  className="ghost-action"
                  onClick={() => {
                    setSelectedShape(shape)
                    setActiveTab('calculator')
                  }}
                >
                  Use {shapeCopy[shape].title}
                </button>
              </article>
            ))}
          </section>
        ) : (
          <section className="calculator-grid">
            <article className="feature-card calculator-card">
              <div className="calculator-header">
                <div>
                  <p className="panel-label">Shapes Calculator</p>
                  <h2>{shapeCopy[selectedShape].title}</h2>
                  <p>{shapeCopy[selectedShape].description}</p>
                </div>

                <label className="shape-select" htmlFor="shape-select">
                  <span>Choose a shape</span>
                  <select
                    id="shape-select"
                    value={selectedShape}
                    onChange={(event) => setSelectedShape(event.target.value as ShapeKey)}
                  >
                    <option value="circle">Circle</option>
                    <option value="triangle">Triangle</option>
                    <option value="polygon">Polygon</option>
                  </select>
                </label>
              </div>

              {shapeInputs[selectedShape]}
            </article>

            <aside className="feature-card results-card">
              <p className="panel-label">Results</p>
              <div className="results-stack">
                {metricsByShape[selectedShape].map((metric) => (
                  <div key={metric.label} className="result-card">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <small>{metric.detail}</small>
                  </div>
                ))}
              </div>

              <div className="formula-note">
                <p>Tip</p>
                <span>
                  Use positive values in every field. Polygon calculations assume a regular
                  polygon, and triangle volume is modeled as a triangular prism.
                </span>
              </div>
            </aside>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
