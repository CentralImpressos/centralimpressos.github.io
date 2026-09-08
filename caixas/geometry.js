function fingerPoints(width, height, thickness, fingerLength, kerf, edges) {
  const horizontalCount = Math.max(2, Math.floor(width / fingerLength));
  const verticalCount = Math.max(2, Math.floor(height / fingerLength));
  const points = [];
  const addEdge = (start, end, count, outward, mode) => {
    const stepX = (end[0] - start[0]) / count;
    const stepY = (end[1] - start[1]) / count;
    for (let index = 0; index < count; index += 1) {
      const ax = start[0] + stepX * index;
      const ay = start[1] + stepY * index;
      const bx = start[0] + stepX * (index + 1);
      const by = start[1] + stepY * (index + 1);
      const isNotch = mode && mode.startsWith('notch') && (mode === 'notch-even' ? index % 2 === 0 : index % 2 === 1);
      const isTab = mode && mode.startsWith('tab') && (mode === 'tab-even' ? index % 2 === 0 : index % 2 === 1);
      const engagement = isNotch ? thickness + kerf / 2 : thickness - kerf / 2;
      const direction = isTab ? 1 : -1;
      const normal = [outward[0] * direction * engagement, outward[1] * direction * engagement];
      points.push([ax, ay]);
      if ((isNotch || isTab) && index > 0 && index < count - 1) {
        points.push([ax + normal[0], ay + normal[1]], [bx + normal[0], by + normal[1]]);
      }
      points.push([bx, by]);
    }
  };
  addEdge([0, 0], [width, 0], horizontalCount, [0, -1], edges.bottom);
  addEdge([width, 0], [width, height], verticalCount, [1, 0], edges.right);
  addEdge([width, height], [0, height], horizontalCount, [0, 1], edges.top);
  addEdge([0, height], [0, 0], verticalCount, [-1, 0], edges.left);
  return points;
}

function rectanglePoints(width, height) {
  return [[0, 0], [width, 0], [width, height], [0, height]];
}

function panelPoints(width, height, thickness, fingerLength, kerf, edges, jointType) {
  return jointType === 'finger'
    ? fingerPoints(width, height, thickness, fingerLength, kerf, edges)
    : rectanglePoints(width, height);
}

function edgeMode(kind, parity) {
  return `${kind}-${parity === 0 ? 'even' : 'odd'}`;
}

function mappedParity(parity, count, reversed) {
  return reversed ? (count - 1 + parity) % 2 : parity;
}

function complementaryParity(parity, count, reversed) {
  return 1 - mappedParity(parity, count, reversed);
}

function dividerPoints(width, height, thickness, fingerLength, kerf, slots, slotsFromTop, jointType) {
  if (jointType !== 'finger') return rectanglePoints(width, height);
  const points = [];
  const notchDepth = Math.max(thickness, thickness * 2 - kerf);
  const notchWidth = Math.min(thickness + kerf, fingerLength * .45);
  const addNotchedEdge = (fromTop) => {
    const orderedSlots = slots.slice().sort((a, b) => a - b);
    if (fromTop) {
      points.push([0, height]);
      orderedSlots.forEach((slot) => {
        points.push([slot - notchWidth / 2, height], [slot - notchWidth / 2, height - notchDepth], [slot + notchWidth / 2, height - notchDepth], [slot + notchWidth / 2, height]);
      });
      points.push([width, height]);
    } else {
      points.push([width, 0]);
      orderedSlots.slice().reverse().forEach((slot) => {
        points.push([slot + notchWidth / 2, 0], [slot + notchWidth / 2, notchDepth], [slot - notchWidth / 2, notchDepth], [slot - notchWidth / 2, 0]);
      });
      points.push([0, 0]);
    }
  };
  if (slotsFromTop) {
    points.push([0, 0], [width, 0], [width, height]);
    addNotchedEdge(true);
    points.push([0, height], [0, 0]);
  } else {
    points.push([0, 0], [0, height], [width, height]);
    addNotchedEdge(false);
    points.push([0, 0]);
  }
  return points;
}

function piece(name, type, points, thickness, position, rotation = [0, 0, 0]) {
  return { name, type, points, thickness, position, rotation };
}

export function createBoxGeometry({ width, height, depth, thickness, preset, jointType, fingerLength, kerf, hasDividers, dividerRows, dividerColumns }) {
  const pieces = [];
  const widthCount = Math.max(2, Math.floor(width / fingerLength));
  const heightCount = Math.max(2, Math.floor(height / fingerLength));
  const frontWallVerticalParity = 0;
  const backWallVerticalParity = 0;
  const sideFrontVerticalParity = complementaryParity(frontWallVerticalParity, heightCount, true);
  const sideBackVerticalParity = complementaryParity(backWallVerticalParity, heightCount, false);
  const frontBaseParity = mappedParity(1, widthCount, true);
  const backBaseParity = mappedParity(1, widthCount, false);
  const backLidParity = mappedParity(1, widthCount, true);
  const fingerEdges = (top = false) => ({
    bottom: 'notch-odd',
    right: edgeMode('notch', frontWallVerticalParity),
    top: top ? 'notch-odd' : false,
    left: edgeMode('notch', frontWallVerticalParity)
  });
  const leftEdges = (top = false) => ({
    bottom: 'notch-odd',
    right: edgeMode('notch', sideBackVerticalParity),
    top: top ? 'notch-odd' : false,
    left: edgeMode('notch', sideFrontVerticalParity)
  });
  const rightEdges = (top = false) => ({
    bottom: 'notch-odd',
    right: edgeMode('notch', sideFrontVerticalParity),
    top: top ? 'notch-odd' : false,
    left: edgeMode('notch', sideBackVerticalParity)
  });
  const baseEdges = {
    bottom: edgeMode('tab', backBaseParity),
    right: 'tab-odd',
    top: edgeMode('tab', frontBaseParity),
    left: 'tab-odd'
  };
  const lidEdges = {
    bottom: edgeMode('tab', backLidParity),
    right: 'tab-odd',
    top: 'tab-odd',
    left: 'tab-odd'
  };
  const panel = (name, type, panelWidth, panelHeight, position, rotation, edges) => pieces.push(piece(
    name,
    type,
    panelPoints(panelWidth, panelHeight, thickness, fingerLength, kerf, edges, jointType),
    thickness,
    position,
    rotation
  ));

  panel('base', 'base', width, depth, [-width / 2, thickness, -depth / 2], [Math.PI / 2, 0, 0], baseEdges);
  panel('front', 'wall', width, height, [-width / 2, 0, depth / 2 - thickness], [0, 0, 0], fingerEdges(preset === 'lid'));
  panel('back', 'wall', width, height, [-width / 2, 0, -depth / 2], [0, 0, 0], fingerEdges(preset === 'lid'));
  panel('left', 'wall', depth, height, [-width / 2, 0, depth / 2], [0, Math.PI / 2, 0], leftEdges(preset === 'lid'));
  panel('right', 'wall', depth, height, [width / 2 - thickness, 0, -depth / 2], [0, -Math.PI / 2, 0], rightEdges(preset === 'lid'));

  if (preset === 'lid') {
    panel('lid', 'lid', width, depth, [-width / 2, height + thickness, -depth / 2], [Math.PI / 2, 0, 0], lidEdges);
  }

  if (hasDividers) {
    const dividerHeight = preset === 'open' ? height : height - 2 * thickness;
    const rowSlots = Array.from({ length: Math.max(0, dividerColumns - 1) }, (_, index) => (width - 2 * thickness) * (index + 1) / dividerColumns);
    const columnSlots = Array.from({ length: Math.max(0, dividerRows - 1) }, (_, index) => (depth - 2 * thickness) * (index + 1) / dividerRows);
    for (let index = 1; index < dividerRows; index += 1) {
      const z = -depth / 2 + thickness + (depth - 2 * thickness) * index / dividerRows;
      pieces.push(piece(
        `divider-row-${index}`,
        'divider',
        dividerPoints(width - 2 * thickness, dividerHeight, thickness, fingerLength, kerf, rowSlots, true, jointType),
        thickness,
        [-width / 2 + thickness, 0, z - thickness / 2]
      ));
    }
    for (let index = 1; index < dividerColumns; index += 1) {
      const x = -width / 2 + thickness + (width - 2 * thickness) * index / dividerColumns;
      pieces.push(piece(
        `divider-column-${index}`,
        'divider',
        dividerPoints(depth - 2 * thickness, dividerHeight, thickness, fingerLength, kerf, columnSlots, false, jointType),
        thickness,
        [x - thickness / 2, 0, depth / 2 - thickness],
        [0, Math.PI / 2, 0]
      ));
    }
  }

  return { width, height, depth, thickness, preset, pieces };
}
