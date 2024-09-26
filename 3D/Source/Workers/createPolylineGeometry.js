/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-8166c7dd', './Matrix2-48c16a80', './ArcType-0cf52f8c', './arrayRemoveDuplicates-8aa05a3d', './Transforms-a91b6c40', './Color-cc8b6b48', './ComponentDatatype-9c5a06cd', './RuntimeError-ec3b0f53', './GeometryAttribute-6ac0bf83', './GeometryAttributes-50becc99', './IndexDatatype-ed482b61', './PolylinePipeline-dc8ba823', './VertexFormat-36162c59', './combine-ed18558d', './WebGLConstants-7dccdc96', './EllipsoidGeodesic-9be6c4a4', './EllipsoidRhumbLine-18e41c26', './IntersectionTests-ef21c31d', './Plane-d604146d'], (function (when, Matrix2, ArcType, arrayRemoveDuplicates, Transforms, Color, ComponentDatatype, RuntimeError, GeometryAttribute, GeometryAttributes, IndexDatatype, PolylinePipeline, VertexFormat, combine, WebGLConstants, EllipsoidGeodesic, EllipsoidRhumbLine, IntersectionTests, Plane) { 'use strict';

  const scratchInterpolateColorsArray = [];

  function interpolateColors(p0, p1, color0, color1, numPoints) {
    const colors = scratchInterpolateColorsArray;
    colors.length = numPoints;
    let i;

    const r0 = color0.red;
    const g0 = color0.green;
    const b0 = color0.blue;
    const a0 = color0.alpha;

    const r1 = color1.red;
    const g1 = color1.green;
    const b1 = color1.blue;
    const a1 = color1.alpha;

    if (Color.Color.equals(color0, color1)) {
      for (i = 0; i < numPoints; i++) {
        colors[i] = Color.Color.clone(color0);
      }
      return colors;
    }

    const redPerVertex = (r1 - r0) / numPoints;
    const greenPerVertex = (g1 - g0) / numPoints;
    const bluePerVertex = (b1 - b0) / numPoints;
    const alphaPerVertex = (a1 - a0) / numPoints;

    for (i = 0; i < numPoints; i++) {
      colors[i] = new Color.Color(
        r0 + i * redPerVertex,
        g0 + i * greenPerVertex,
        b0 + i * bluePerVertex,
        a0 + i * alphaPerVertex
      );
    }

    return colors;
  }

  /**
   * A description of a polyline modeled as a line strip; the first two positions define a line segment,
   * and each additional position defines a line segment from the previous position. The polyline is capable of
   * displaying with a material.
   *
   * @alias PolylineGeometry
   * @constructor
   *
   * @param {Object} options Object with the following properties:
   * @param {Cartesian3[]} options.positions An array of {@link Cartesian3} defining the positions in the polyline as a line strip.
   * @param {Number} [options.width=1.0] The width in pixels.
   * @param {Color[]} [options.colors] An Array of {@link Color} defining the per vertex or per segment colors.
   * @param {Boolean} [options.colorsPerVertex=false] A boolean that determines whether the colors will be flat across each segment of the line or interpolated across the vertices.
   * @param {ArcType} [options.arcType=ArcType.GEODESIC] The type of line the polyline segments must follow.
   * @param {Number} [options.granularity=CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude if options.arcType is not ArcType.NONE. Determines the number of positions in the buffer.
   * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be computed.
   * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid to be used as a reference.
   *
   * @exception {DeveloperError} At least two positions are required.
   * @exception {DeveloperError} width must be greater than or equal to one.
   * @exception {DeveloperError} colors has an invalid length.
   *
   * @see PolylineGeometry#createGeometry
   *
   * @demo {@link https://sandcastle.cesium.com/index.html?src=Polyline.html|Cesium Sandcastle Polyline Demo}
   *
   * @example
   * // A polyline with two connected line segments
   * const polyline = new Cesium.PolylineGeometry({
   *   positions : Cesium.Cartesian3.fromDegreesArray([
   *     0.0, 0.0,
   *     5.0, 0.0,
   *     5.0, 5.0
   *   ]),
   *   width : 10.0
   * });
   * const geometry = Cesium.PolylineGeometry.createGeometry(polyline);
   */
  function PolylineGeometry(options) {
    options = when.defaultValue(options, when.defaultValue.EMPTY_OBJECT);
    const positions = options.positions;
    const colors = options.colors;
    const width = when.defaultValue(options.width, 1.0);
    const colorsPerVertex = when.defaultValue(options.colorsPerVertex, false);

    //>>includeStart('debug', pragmas.debug);
    if (!when.defined(positions) || positions.length < 2) {
      throw new RuntimeError.DeveloperError("At least two positions are required.");
    }
    if (typeof width !== "number") {
      throw new RuntimeError.DeveloperError("width must be a number");
    }
    if (
      when.defined(colors) &&
      ((colorsPerVertex && colors.length < positions.length) ||
        (!colorsPerVertex && colors.length < positions.length - 1))
    ) {
      throw new RuntimeError.DeveloperError("colors has an invalid length.");
    }
    //>>includeEnd('debug');

    this._positions = positions;
    this._colors = colors;
    this._width = width;
    this._colorsPerVertex = colorsPerVertex;
    this._vertexFormat = VertexFormat.VertexFormat.clone(
      when.defaultValue(options.vertexFormat, VertexFormat.VertexFormat.DEFAULT)
    );

    this._arcType = when.defaultValue(options.arcType, ArcType.ArcType.GEODESIC);
    this._granularity = when.defaultValue(
      options.granularity,
      ComponentDatatype.CesiumMath.RADIANS_PER_DEGREE
    );
    this._ellipsoid = Matrix2.Ellipsoid.clone(
      when.defaultValue(options.ellipsoid, Matrix2.Ellipsoid.WGS84)
    );
    this._workerName = "createPolylineGeometry";

    let numComponents = 1 + positions.length * Matrix2.Cartesian3.packedLength;
    numComponents += when.defined(colors) ? 1 + colors.length * Color.Color.packedLength : 1;

    /**
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    this.packedLength =
      numComponents + Matrix2.Ellipsoid.packedLength + VertexFormat.VertexFormat.packedLength + 4;
  }

  /**
   * Stores the provided instance into the provided array.
   *
   * @param {PolylineGeometry} value The value to pack.
   * @param {Number[]} array The array to pack into.
   * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {Number[]} The array that was packed into
   */
  PolylineGeometry.pack = function (value, array, startingIndex) {
    //>>includeStart('debug', pragmas.debug);
    if (!when.defined(value)) {
      throw new RuntimeError.DeveloperError("value is required");
    }
    if (!when.defined(array)) {
      throw new RuntimeError.DeveloperError("array is required");
    }
    //>>includeEnd('debug');

    startingIndex = when.defaultValue(startingIndex, 0);

    let i;

    const positions = value._positions;
    let length = positions.length;
    array[startingIndex++] = length;

    for (i = 0; i < length; ++i, startingIndex += Matrix2.Cartesian3.packedLength) {
      Matrix2.Cartesian3.pack(positions[i], array, startingIndex);
    }

    const colors = value._colors;
    length = when.defined(colors) ? colors.length : 0.0;
    array[startingIndex++] = length;

    for (i = 0; i < length; ++i, startingIndex += Color.Color.packedLength) {
      Color.Color.pack(colors[i], array, startingIndex);
    }

    Matrix2.Ellipsoid.pack(value._ellipsoid, array, startingIndex);
    startingIndex += Matrix2.Ellipsoid.packedLength;

    VertexFormat.VertexFormat.pack(value._vertexFormat, array, startingIndex);
    startingIndex += VertexFormat.VertexFormat.packedLength;

    array[startingIndex++] = value._width;
    array[startingIndex++] = value._colorsPerVertex ? 1.0 : 0.0;
    array[startingIndex++] = value._arcType;
    array[startingIndex] = value._granularity;

    return array;
  };

  const scratchEllipsoid = Matrix2.Ellipsoid.clone(Matrix2.Ellipsoid.UNIT_SPHERE);
  const scratchVertexFormat = new VertexFormat.VertexFormat();
  const scratchOptions = {
    positions: undefined,
    colors: undefined,
    ellipsoid: scratchEllipsoid,
    vertexFormat: scratchVertexFormat,
    width: undefined,
    colorsPerVertex: undefined,
    arcType: undefined,
    granularity: undefined,
  };

  /**
   * Retrieves an instance from a packed array.
   *
   * @param {Number[]} array The packed array.
   * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {PolylineGeometry} [result] The object into which to store the result.
   * @returns {PolylineGeometry} The modified result parameter or a new PolylineGeometry instance if one was not provided.
   */
  PolylineGeometry.unpack = function (array, startingIndex, result) {
    //>>includeStart('debug', pragmas.debug);
    if (!when.defined(array)) {
      throw new RuntimeError.DeveloperError("array is required");
    }
    //>>includeEnd('debug');

    startingIndex = when.defaultValue(startingIndex, 0);

    let i;

    let length = array[startingIndex++];
    const positions = new Array(length);

    for (i = 0; i < length; ++i, startingIndex += Matrix2.Cartesian3.packedLength) {
      positions[i] = Matrix2.Cartesian3.unpack(array, startingIndex);
    }

    length = array[startingIndex++];
    const colors = length > 0 ? new Array(length) : undefined;

    for (i = 0; i < length; ++i, startingIndex += Color.Color.packedLength) {
      colors[i] = Color.Color.unpack(array, startingIndex);
    }

    const ellipsoid = Matrix2.Ellipsoid.unpack(array, startingIndex, scratchEllipsoid);
    startingIndex += Matrix2.Ellipsoid.packedLength;

    const vertexFormat = VertexFormat.VertexFormat.unpack(
      array,
      startingIndex,
      scratchVertexFormat
    );
    startingIndex += VertexFormat.VertexFormat.packedLength;

    const width = array[startingIndex++];
    const colorsPerVertex = array[startingIndex++] === 1.0;
    const arcType = array[startingIndex++];
    const granularity = array[startingIndex];

    if (!when.defined(result)) {
      scratchOptions.positions = positions;
      scratchOptions.colors = colors;
      scratchOptions.width = width;
      scratchOptions.colorsPerVertex = colorsPerVertex;
      scratchOptions.arcType = arcType;
      scratchOptions.granularity = granularity;
      return new PolylineGeometry(scratchOptions);
    }

    result._positions = positions;
    result._colors = colors;
    result._ellipsoid = Matrix2.Ellipsoid.clone(ellipsoid, result._ellipsoid);
    result._vertexFormat = VertexFormat.VertexFormat.clone(vertexFormat, result._vertexFormat);
    result._width = width;
    result._colorsPerVertex = colorsPerVertex;
    result._arcType = arcType;
    result._granularity = granularity;

    return result;
  };

  const scratchCartesian3 = new Matrix2.Cartesian3();
  const scratchPosition = new Matrix2.Cartesian3();
  const scratchPrevPosition = new Matrix2.Cartesian3();
  const scratchNextPosition = new Matrix2.Cartesian3();

  /**
   * Computes the geometric representation of a polyline, including its vertices, indices, and a bounding sphere.
   *
   * @param {PolylineGeometry} polylineGeometry A description of the polyline.
   * @returns {Geometry|undefined} The computed vertices and indices.
   */
  PolylineGeometry.createGeometry = function (polylineGeometry) {
    const width = polylineGeometry._width;
    const vertexFormat = polylineGeometry._vertexFormat;
    let colors = polylineGeometry._colors;
    const colorsPerVertex = polylineGeometry._colorsPerVertex;
    const arcType = polylineGeometry._arcType;
    const granularity = polylineGeometry._granularity;
    const ellipsoid = polylineGeometry._ellipsoid;

    let i;
    let j;
    let k;

    const removedIndices = [];
    let positions = arrayRemoveDuplicates.arrayRemoveDuplicates(
      polylineGeometry._positions,
      Matrix2.Cartesian3.equalsEpsilon,
      false,
      removedIndices
    );

    if (when.defined(colors) && removedIndices.length > 0) {
      let removedArrayIndex = 0;
      let nextRemovedIndex = removedIndices[0];
      colors = colors.filter(function (color, index) {
        let remove = false;
        if (colorsPerVertex) {
          remove =
            index === nextRemovedIndex || (index === 0 && nextRemovedIndex === 1);
        } else {
          remove = index + 1 === nextRemovedIndex;
        }

        if (remove) {
          removedArrayIndex++;
          nextRemovedIndex = removedIndices[removedArrayIndex];
          return false;
        }
        return true;
      });
    }

    let positionsLength = positions.length;

    // A width of a pixel or less is not a valid geometry, but in order to support external data
    // that may have errors we treat this as an empty geometry.
    if (positionsLength < 2 || width <= 0.0) {
      return undefined;
    }

    if (arcType === ArcType.ArcType.GEODESIC || arcType === ArcType.ArcType.RHUMB) {
      let subdivisionSize;
      let numberOfPointsFunction;
      if (arcType === ArcType.ArcType.GEODESIC) {
        subdivisionSize = ComponentDatatype.CesiumMath.chordLength(
          granularity,
          ellipsoid.maximumRadius
        );
        numberOfPointsFunction = PolylinePipeline.PolylinePipeline.numberOfPoints;
      } else {
        subdivisionSize = granularity;
        numberOfPointsFunction = PolylinePipeline.PolylinePipeline.numberOfPointsRhumbLine;
      }

      const heights = PolylinePipeline.PolylinePipeline.extractHeights(positions, ellipsoid);

      if (when.defined(colors)) {
        let colorLength = 1;
        for (i = 0; i < positionsLength - 1; ++i) {
          colorLength += numberOfPointsFunction(
            positions[i],
            positions[i + 1],
            subdivisionSize
          );
        }

        const newColors = new Array(colorLength);
        let newColorIndex = 0;

        for (i = 0; i < positionsLength - 1; ++i) {
          const p0 = positions[i];
          const p1 = positions[i + 1];
          const c0 = colors[i];

          const numColors = numberOfPointsFunction(p0, p1, subdivisionSize);
          if (colorsPerVertex && i < colorLength) {
            const c1 = colors[i + 1];
            const interpolatedColors = interpolateColors(
              p0,
              p1,
              c0,
              c1,
              numColors
            );
            const interpolatedColorsLength = interpolatedColors.length;
            for (j = 0; j < interpolatedColorsLength; ++j) {
              newColors[newColorIndex++] = interpolatedColors[j];
            }
          } else {
            for (j = 0; j < numColors; ++j) {
              newColors[newColorIndex++] = Color.Color.clone(c0);
            }
          }
        }

        newColors[newColorIndex] = Color.Color.clone(colors[colors.length - 1]);
        colors = newColors;

        scratchInterpolateColorsArray.length = 0;
      }

      if (arcType === ArcType.ArcType.GEODESIC) {
        positions = PolylinePipeline.PolylinePipeline.generateCartesianArc({
          positions: positions,
          minDistance: subdivisionSize,
          ellipsoid: ellipsoid,
          height: heights,
        });
      } else {
        positions = PolylinePipeline.PolylinePipeline.generateCartesianRhumbArc({
          positions: positions,
          granularity: subdivisionSize,
          ellipsoid: ellipsoid,
          height: heights,
        });
      }
    }

    positionsLength = positions.length;
    const size = positionsLength * 4.0 - 4.0;

    const finalPositions = new Float64Array(size * 3);
    const prevPositions = new Float64Array(size * 3);
    const nextPositions = new Float64Array(size * 3);
    const expandAndWidth = new Float32Array(size * 2);
    const st = vertexFormat.st ? new Float32Array(size * 2) : undefined;
    const finalColors = when.defined(colors) ? new Uint8Array(size * 4) : undefined;

    let positionIndex = 0;
    let expandAndWidthIndex = 0;
    let stIndex = 0;
    let colorIndex = 0;
    let position;

    for (j = 0; j < positionsLength; ++j) {
      if (j === 0) {
        position = scratchCartesian3;
        Matrix2.Cartesian3.subtract(positions[0], positions[1], position);
        Matrix2.Cartesian3.add(positions[0], position, position);
      } else {
        position = positions[j - 1];
      }

      Matrix2.Cartesian3.clone(position, scratchPrevPosition);
      Matrix2.Cartesian3.clone(positions[j], scratchPosition);

      if (j === positionsLength - 1) {
        position = scratchCartesian3;
        Matrix2.Cartesian3.subtract(
          positions[positionsLength - 1],
          positions[positionsLength - 2],
          position
        );
        Matrix2.Cartesian3.add(positions[positionsLength - 1], position, position);
      } else {
        position = positions[j + 1];
      }

      Matrix2.Cartesian3.clone(position, scratchNextPosition);

      let color0, color1;
      if (when.defined(finalColors)) {
        if (j !== 0 && !colorsPerVertex) {
          color0 = colors[j - 1];
        } else {
          color0 = colors[j];
        }

        if (j !== positionsLength - 1) {
          color1 = colors[j];
        }
      }

      const startK = j === 0 ? 2 : 0;
      const endK = j === positionsLength - 1 ? 2 : 4;

      for (k = startK; k < endK; ++k) {
        Matrix2.Cartesian3.pack(scratchPosition, finalPositions, positionIndex);
        Matrix2.Cartesian3.pack(scratchPrevPosition, prevPositions, positionIndex);
        Matrix2.Cartesian3.pack(scratchNextPosition, nextPositions, positionIndex);
        positionIndex += 3;

        const direction = k - 2 < 0 ? -1.0 : 1.0;
        expandAndWidth[expandAndWidthIndex++] = 2 * (k % 2) - 1; // expand direction
        expandAndWidth[expandAndWidthIndex++] = direction * width;

        if (vertexFormat.st) {
          st[stIndex++] = j / (positionsLength - 1);
          st[stIndex++] = Math.max(expandAndWidth[expandAndWidthIndex - 2], 0.0);
        }

        if (when.defined(finalColors)) {
          const color = k < 2 ? color0 : color1;

          finalColors[colorIndex++] = Color.Color.floatToByte(color.red);
          finalColors[colorIndex++] = Color.Color.floatToByte(color.green);
          finalColors[colorIndex++] = Color.Color.floatToByte(color.blue);
          finalColors[colorIndex++] = Color.Color.floatToByte(color.alpha);
        }
      }
    }

    const attributes = new GeometryAttributes.GeometryAttributes();

    attributes.position = new GeometryAttribute.GeometryAttribute({
      componentDatatype: ComponentDatatype.ComponentDatatype.DOUBLE,
      componentsPerAttribute: 3,
      values: finalPositions,
    });

    attributes.prevPosition = new GeometryAttribute.GeometryAttribute({
      componentDatatype: ComponentDatatype.ComponentDatatype.DOUBLE,
      componentsPerAttribute: 3,
      values: prevPositions,
    });

    attributes.nextPosition = new GeometryAttribute.GeometryAttribute({
      componentDatatype: ComponentDatatype.ComponentDatatype.DOUBLE,
      componentsPerAttribute: 3,
      values: nextPositions,
    });

    attributes.expandAndWidth = new GeometryAttribute.GeometryAttribute({
      componentDatatype: ComponentDatatype.ComponentDatatype.FLOAT,
      componentsPerAttribute: 2,
      values: expandAndWidth,
    });

    if (vertexFormat.st) {
      attributes.st = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: st,
      });
    }

    if (when.defined(finalColors)) {
      attributes.color = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 4,
        values: finalColors,
        normalize: true,
      });
    }

    const indices = IndexDatatype.IndexDatatype.createTypedArray(size, positionsLength * 6 - 6);
    let index = 0;
    let indicesIndex = 0;
    const length = positionsLength - 1.0;
    for (j = 0; j < length; ++j) {
      indices[indicesIndex++] = index;
      indices[indicesIndex++] = index + 2;
      indices[indicesIndex++] = index + 1;

      indices[indicesIndex++] = index + 1;
      indices[indicesIndex++] = index + 2;
      indices[indicesIndex++] = index + 3;

      index += 4;
    }

    return new GeometryAttribute.Geometry({
      attributes: attributes,
      indices: indices,
      primitiveType: GeometryAttribute.PrimitiveType.TRIANGLES,
      boundingSphere: Transforms.BoundingSphere.fromPoints(positions),
      geometryType: GeometryAttribute.GeometryType.POLYLINES,
    });
  };

  function createPolylineGeometry(polylineGeometry, offset) {
    if (when.defined(offset)) {
      polylineGeometry = PolylineGeometry.unpack(polylineGeometry, offset);
    }
    polylineGeometry._ellipsoid = Matrix2.Ellipsoid.clone(polylineGeometry._ellipsoid);
    return PolylineGeometry.createGeometry(polylineGeometry);
  }

  return createPolylineGeometry;

}));
