/**
 * @file Mesh Buffer
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */

import '../shader/Mesh.vert'
import '../shader/Mesh.frag'

import '../shader/MeshToon.frag'
import '../shader/MeshToon.vert'

import '../shader/CustomizedMeshToon.frag'
import '../shader/CustomizedMeshToon.vert'

import Buffer, { BufferParameters, BufferData } from './buffer'
// import { DataTexture, Color } from 'three'
// import { defaults } from '../utils'
/**
 * Mesh buffer. Draws a triangle mesh.
 *
 * @example
 * var meshBuffer = new MeshBuffer({
 *   position: new Float32Array(
 *     [ 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1 ]
 *   ),
 *   color: new Float32Array(
 *     [ 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0 ]
 *   )
 * });
 */


// interface MeshTextureParams {
//   width?: number
//   height?: number
// }

// function makeMeshTexture (params: MeshTextureParams) {
//   const p = params || {}

//   const width = defaults(p.width, 256)
//   const height = defaults(p.height, 256)
  

//   // let x = 0
//   // let y = 0
//   const data = new Uint8Array(width * height * 4)
//   const color = new Color( 0x00ff00 );
//   const r = Math.floor( color.r * 255 );
//   const g = Math.floor( color.g * 255 );
//   const b = Math.floor( color.b * 255 );

//   for (let i = 0, il = data.length; i < il; i += 4) {


//     data[ i ] = r * 255
//     data[ i + 1 ] = g * 255
//     data[ i + 2 ] = b * 255
//     data[ i + 3 ] = 255

//     // if (++x === width) {
//     //   x = 0
//     //   y++
//     // }
//   }

//   const tex = new DataTexture(data, width, height)
//   tex.needsUpdate = true

//   return tex
// }

class MeshBuffer extends Buffer {
  vertexShader = 'CustomizedMeshToon.vert'
  fragmentShader = 'CustomizedMeshToon.frag'

  /**
   * @param  {Object} data - attribute object
   * @param  {Float32Array} data.position - positions
   * @param  {Float32Array} data.color - colors
   * @param  {Float32Array} [data.index] - triangle indices
   * @param  {Float32Array} [data.normal] - radii
   * @param  {BufferParameters} params - parameter object
   */
  constructor (data: BufferData, params: Partial<BufferParameters> = {}) {
    super(data, params)

    this.addAttributes({
      'normal': { type: 'v3', value: data.normal }
    })

    // this.addUniforms({
    //   'map': { value: null },
    // })

    if (data.normal === undefined) {
      this.geometry.computeVertexNormals()
    }
  }
}

export default MeshBuffer
